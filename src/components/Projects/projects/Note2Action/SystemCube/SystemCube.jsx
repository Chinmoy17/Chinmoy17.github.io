import React, { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * SystemCube — a plain three.js cube whose 6 faces are the 6 domains of the
 * Note2Action stack. Controlled by `activeIndex` (narrative order); reports
 * face clicks via `onFaceClick`. Self-contained: owns its renderer, render
 * loop, resize/visibility handling and full disposal on unmount.
 *
 * No React-Three-Fiber — keeps the whole 3D concern in one lazy component and
 * safe on the app's React 17.
 */

// Narrative face order -> physical BoxGeometry material slot.
// three box order: 0:+X 1:-X 2:+Y 3:-Y 4:+Z 5:-Z
// Frontend->front, Backend->right, AI->back, Data->left, Bot->top, Deploy->bottom.
const BOX_FOR_SEQ = [4, 0, 5, 1, 2, 3];
const SEQ_FOR_BOX = (() => {
  const m = [];
  BOX_FOR_SEQ.forEach((box, seq) => {
    m[box] = seq;
  });
  return m;
})();

// Local outward normal for each BoxGeometry material slot (+X,-X,+Y,-Y,+Z,-Z).
const BOX_NORMAL = [
  new THREE.Vector3(1, 0, 0),
  new THREE.Vector3(-1, 0, 0),
  new THREE.Vector3(0, 1, 0),
  new THREE.Vector3(0, -1, 0),
  new THREE.Vector3(0, 0, 1),
  new THREE.Vector3(0, 0, -1),
];

const HALF_PI = Math.PI / 2;
// Rotation that brings each box side into the "front" slot (before the base tilt).
function faceRotForBox(box) {
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  switch (box) {
    case 0: e.set(0, -HALF_PI, 0); break; // +X
    case 1: e.set(0, HALF_PI, 0); break; // -X
    case 2: e.set(HALF_PI, 0, 0); break; // +Y
    case 3: e.set(-HALF_PI, 0, 0); break; // -Y
    case 5: e.set(0, Math.PI, 0); break; // -Z
    default: e.set(0, 0, 0); break; // +Z (4)
  }
  return q.setFromEuler(e);
}

function boxIndexFromNormal(n) {
  const ax = Math.abs(n.x);
  const ay = Math.abs(n.y);
  const az = Math.abs(n.z);
  if (ax >= ay && ax >= az) return n.x > 0 ? 0 : 1;
  if (ay >= ax && ay >= az) return n.y > 0 ? 2 : 3;
  return n.z > 0 ? 4 : 5;
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight, maxLines) {
  const words = String(text).split(" ");
  let line = "";
  let lines = 0;
  for (let i = 0; i < words.length; i += 1) {
    const test = line ? `${line} ${words[i]}` : words[i];
    if (ctx.measureText(test).width > maxWidth && line) {
      ctx.fillText(line, x, y);
      line = words[i];
      y += lineHeight;
      lines += 1;
      if (lines >= maxLines - 1) {
        // last allowed line: dump the rest (trimmed)
        let rest = words.slice(i).join(" ");
        while (ctx.measureText(`${rest}…`).width > maxWidth && rest.length) {
          rest = rest.slice(0, -1);
        }
        ctx.fillText(`${rest}…`, x, y);
        return;
      }
    } else {
      line = test;
    }
  }
  ctx.fillText(line, x, y);
}

function makeFaceCanvas(face, seq, COL) {
  const S = 320;
  const canvas = document.createElement("canvas");
  canvas.width = S;
  canvas.height = S;
  const ctx = canvas.getContext("2d");

  const grad = ctx.createLinearGradient(0, 0, 0, S);
  grad.addColorStop(0, "#f8f4ec");
  grad.addColorStop(1, "#efe7da");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, S, S);

  ctx.strokeStyle = COL.ink;
  ctx.globalAlpha = 0.8;
  ctx.lineWidth = 2;
  ctx.strokeRect(16, 16, S - 32, S - 32);
  ctx.globalAlpha = 1;

  ctx.textBaseline = "top";
  ctx.fillStyle = COL.ink;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "2px";
  ctx.font = "600 15px 'Inter', Helvetica, sans-serif";
  ctx.globalAlpha = 0.5;
  ctx.fillText(String(seq + 1).padStart(2, "0"), 34, 34);
  const tag = String(face.tag || "").toUpperCase();
  const tw = ctx.measureText(tag).width;
  ctx.fillText(tag, S - 34 - tw, 34);
  ctx.globalAlpha = 1;
  if ("letterSpacing" in ctx) ctx.letterSpacing = "0px";

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = COL.ink;
  ctx.font = "600 50px 'Newsreader', Georgia, serif";
  ctx.fillText(face.label, 33, 190);

  ctx.strokeStyle = COL.accent;
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(35, 205);
  ctx.lineTo(79, 205);
  ctx.stroke();

  ctx.fillStyle = COL.ink;
  ctx.globalAlpha = 0.6;
  ctx.textBaseline = "top";
  ctx.font = "400 18px 'Inter', Helvetica, sans-serif";
  wrapText(ctx, face.oneLiner, 34, 226, S - 74, 25, 3);
  ctx.globalAlpha = 1;

  return canvas;
}

function SystemCube({ faces, activeIndex = 0, onFaceClick, onActiveChange, reducedMotion = false }) {
  const mountRef = useRef(null);
  const stateRef = useRef({});
  // Live values the render loop reads without re-initializing the scene.
  const activeRef = useRef(activeIndex);
  const hoverRef = useRef(null);
  const onClickRef = useRef(onFaceClick);
  const onActiveRef = useRef(onActiveChange);
  const reducedRef = useRef(reducedMotion);

  useEffect(() => {
    activeRef.current = activeIndex;
  }, [activeIndex]);
  useEffect(() => {
    onClickRef.current = onFaceClick;
  }, [onFaceClick]);
  useEffect(() => {
    onActiveRef.current = onActiveChange;
  }, [onActiveChange]);
  useEffect(() => {
    reducedRef.current = reducedMotion;
  }, [reducedMotion]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return undefined;

    const cssVar = (name, fb) => {
      const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
      return v || fb;
    };
    const COL = {
      face: "#f6f1e7",
      ink: cssVar("--color-text", "#1c1c19"),
      accent: "#5b5fc7",
    };

    const width = mount.clientWidth || 480;
    const height = mount.clientHeight || 480;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    if ("outputColorSpace" in renderer) renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";
    renderer.domElement.setAttribute("aria-hidden", "true");
    mount.appendChild(renderer.domElement);

    const CUBE = 1.7;
    // Bounding sphere radius (cube corner) + a little slack for the idle float.
    const SPHERE_R = (CUBE * Math.sqrt(3)) / 2 + 0.14;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    // Pull the camera back far enough that the whole cube fits at any aspect / rotation.
    const frameCamera = () => {
      const vfov = (camera.fov * Math.PI) / 180;
      const fitH = SPHERE_R / Math.tan(vfov / 2);
      const fitW = SPHERE_R / (Math.tan(vfov / 2) * camera.aspect);
      camera.position.z = Math.max(fitH, fitW) * 1.05;
      camera.updateProjectionMatrix();
    };
    frameCamera();

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const dir = new THREE.DirectionalLight(0xffffff, 0.55);
    dir.position.set(2.5, 3.5, 4);
    scene.add(dir);

    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const shadowContext = shadowCanvas.getContext("2d");
    const shadowGradient = shadowContext.createRadialGradient(128, 128, 0, 128, 128, 118);
    shadowGradient.addColorStop(0, "rgba(24, 24, 22, 0.28)");
    shadowGradient.addColorStop(0.38, "rgba(24, 24, 22, 0.15)");
    shadowGradient.addColorStop(0.72, "rgba(24, 24, 22, 0.055)");
    shadowGradient.addColorStop(1, "rgba(24, 24, 22, 0)");
    shadowContext.fillStyle = shadowGradient;
    shadowContext.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    const shadowMaterial = new THREE.SpriteMaterial({
      map: shadowTexture,
      transparent: true,
      opacity: 0.72,
      depthWrite: false,
      depthTest: true,
    });
    const shadow = new THREE.Sprite(shadowMaterial);
    shadow.position.set(0, -1.18, -0.55);
    shadow.scale.set(2.75, 0.62, 1);
    scene.add(shadow);

    const floatGroup = new THREE.Group();
    const cubeGroup = new THREE.Group();
    scene.add(floatGroup);
    floatGroup.add(cubeGroup);

    const geometry = new THREE.BoxGeometry(CUBE, CUBE, CUBE);
    const materials = [];
    const textures = [];
    const buildTextures = () => {
      for (let box = 0; box < 6; box += 1) {
        const seq = SEQ_FOR_BOX[box];
        const canvas = makeFaceCanvas(faces[seq], seq, COL);
        const tex = new THREE.CanvasTexture(canvas);
        if ("colorSpace" in tex) tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
        tex.needsUpdate = true;
        if (materials[box]) {
          const old = materials[box].map;
          materials[box].map = tex;
          materials[box].needsUpdate = true;
          if (old) old.dispose();
          textures[box] = tex;
        } else {
          materials[box] = new THREE.MeshStandardMaterial({
            map: tex,
            roughness: 1,
            metalness: 0,
            transparent: true,
            opacity: 0.8,
            emissive: new THREE.Color(COL.accent),
            emissiveIntensity: 0,
          });
          textures[box] = tex;
        }
      }
    };
    buildTextures();

    const mesh = new THREE.Mesh(geometry, materials);
    cubeGroup.add(mesh);

    const edgesGeo = new THREE.EdgesGeometry(geometry);
    const edges = new THREE.LineSegments(
      edgesGeo,
      new THREE.LineBasicMaterial({ color: new THREE.Color(COL.ink), transparent: true, opacity: 0.55 })
    );
    cubeGroup.add(edges);

    // Base 3/4 tilt so three faces are always visible.
    const baseTilt = new THREE.Quaternion().setFromEuler(new THREE.Euler(-0.34, -0.5, 0));
    const targetQuat = new THREE.Quaternion();
    const setTarget = (seq) => {
      targetQuat.copy(baseTilt).multiply(faceRotForBox(BOX_FOR_SEQ[seq]));
    };
    setTarget(activeRef.current);
    cubeGroup.quaternion.copy(targetQuat);

    const raycaster = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    const raycastAt = (clientX, clientY) => {
      const rect = renderer.domElement.getBoundingClientRect();
      ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndc, camera);
      const hits = raycaster.intersectObject(mesh, false);
      if (!hits.length || !hits[0].face) return null;
      const f = hits[0].face;
      const box = f.materialIndex != null ? f.materialIndex : boxIndexFromNormal(f.normal);
      return SEQ_FOR_BOX[box];
    };

    // Which narrative face is currently most front-facing (used while dragging).
    let lastFront = activeRef.current;
    const _fn = new THREE.Vector3();
    const computeFrontSeq = () => {
      let best = 4;
      let bestZ = -Infinity;
      for (let b = 0; b < 6; b += 1) {
        _fn.copy(BOX_NORMAL[b]).applyQuaternion(cubeGroup.quaternion);
        if (_fn.z > bestZ) {
          bestZ = _fn.z;
          best = b;
        }
      }
      return SEQ_FOR_BOX[best];
    };

    // --- pointer interaction (drag-to-orbit + hover + click) ---
    const drag = { active: false, x: 0, y: 0, moved: 0 };
    const onPointerDown = (e) => {
      drag.active = true;
      drag.x = e.clientX;
      drag.y = e.clientY;
      drag.moved = 0;
      renderer.domElement.style.cursor = "grabbing";
      if (renderer.domElement.setPointerCapture) {
        try {
          renderer.domElement.setPointerCapture(e.pointerId);
        } catch (err) {
          /* ignore */
        }
      }
    };
    const onPointerMove = (e) => {
      if (drag.active) {
        const dx = e.clientX - drag.x;
        const dy = e.clientY - drag.y;
        drag.x = e.clientX;
        drag.y = e.clientY;
        drag.moved += Math.abs(dx) + Math.abs(dy);
        const qy = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), dx * 0.006);
        const qx = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 0, 0), dy * 0.006);
        cubeGroup.quaternion.premultiply(qy).premultiply(qx);
        const fs = computeFrontSeq();
        if (fs !== lastFront) {
          lastFront = fs;
          if (onActiveRef.current) onActiveRef.current(fs);
        }
        return;
      }
      const seq = raycastAt(e.clientX, e.clientY);
      hoverRef.current = seq;
      renderer.domElement.style.cursor = seq != null ? "pointer" : "grab";
    };
    const endDrag = (e) => {
      if (!drag.active) return;
      drag.active = false;
      renderer.domElement.style.cursor = "grab";
      if (drag.moved < 6) {
        const seq = raycastAt(e.clientX, e.clientY);
        if (seq != null && onClickRef.current) onClickRef.current(seq);
      }
    };
    renderer.domElement.addEventListener("pointerdown", onPointerDown);
    renderer.domElement.addEventListener("pointermove", onPointerMove);
    renderer.domElement.addEventListener("pointerup", endDrag);
    renderer.domElement.addEventListener("pointercancel", endDrag);
    renderer.domElement.addEventListener("pointerleave", () => {
      if (!drag.active) {
        hoverRef.current = null;
        renderer.domElement.style.cursor = "grab";
      }
    });

    // --- render loop ---
    const clock = new THREE.Clock();
    let raf = 0;
    let lastActive = -1;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      const t = clock.getElapsedTime();

      if (activeRef.current !== lastActive) {
        lastActive = activeRef.current;
        lastFront = activeRef.current;
        setTarget(lastActive);
      }

      if (!reducedRef.current) {
        floatGroup.position.y = Math.sin(t * 0.8) * 0.022;
        floatGroup.rotation.x = Math.sin(t * 0.55) * 0.012;
        floatGroup.rotation.z = Math.sin(t * 0.4) * 0.008;
      }

      if (!drag.active) {
        cubeGroup.quaternion.slerp(targetQuat, reducedRef.current ? 1 : 0.09);
      }

      // Active/hover cue: nudge opacity (and a whisper of emissive) rather than a heavy tint.
      for (let box = 0; box < 6; box += 1) {
        const seq = SEQ_FOR_BOX[box];
        const isActive = seq === activeRef.current;
        const isHover = seq === hoverRef.current && !isActive;
        const eTarget = isActive ? 0.06 : isHover ? 0.04 : 0;
        const oTarget = isActive ? 0.94 : isHover ? 0.86 : 0.78;
        const m = materials[box];
        m.emissiveIntensity += (eTarget - m.emissiveIntensity) * 0.15;
        m.opacity += (oTarget - m.opacity) * 0.15;
      }

      renderer.render(scene, camera);
    };
    const start = () => {
      if (!raf) tick();
    };
    const stop = () => {
      if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    // Pause when offscreen or tab hidden.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !document.hidden) start();
        else stop();
      },
      { threshold: 0.01 }
    );
    io.observe(mount);
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    // Resize to the mount box.
    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      camera.aspect = w / h;
      frameCamera();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    // Repaint labels once web fonts have loaded (Newsreader/Inter).
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => buildTextures()).catch(() => {});
    }

    start();

    stateRef.current = { stop };

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      renderer.domElement.removeEventListener("pointerdown", onPointerDown);
      renderer.domElement.removeEventListener("pointermove", onPointerMove);
      renderer.domElement.removeEventListener("pointerup", endDrag);
      renderer.domElement.removeEventListener("pointercancel", endDrag);
      geometry.dispose();
      edgesGeo.dispose();
      edges.material.dispose();
      shadowTexture.dispose();
      shadowMaterial.dispose();
      materials.forEach((m) => {
        if (m.map) m.map.dispose();
        m.dispose();
      });
      renderer.dispose();
      if (renderer.forceContextLoss) renderer.forceContextLoss();
      if (renderer.domElement.parentNode === mount) mount.removeChild(renderer.domElement);
    };
    // Scene is built once; live props are read through refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [faces]);

  return <div ref={mountRef} className="w-full h-full" />;
}

export default SystemCube;
