import React, { useEffect, useRef, useState } from "react";

function interpolateValue(template, progress) {
  return template.replace(/\d+/g, (number) => String(Math.round(Number(number) * progress)));
}

function AnimatedStatValue({ value, className = "", duration = 1500, delay = 250 }) {
  const elementRef = useRef(null);
  const [displayValue, setDisplayValue] = useState(() => interpolateValue(value, 0));

  useEffect(() => {
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setDisplayValue(value);
      return undefined;
    }

    let animationFrame = 0;
    let delayTimer = 0;
    let observer;
    let started = false;

    const start = () => {
      if (started) return;
      started = true;
      delayTimer = window.setTimeout(() => {
        const startTime = performance.now();
        const tick = (now) => {
          const elapsed = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          setDisplayValue(interpolateValue(value, eased));
          if (elapsed < 1) animationFrame = window.requestAnimationFrame(tick);
        };
        animationFrame = window.requestAnimationFrame(tick);
      }, delay);
    };

    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            start();
            observer.disconnect();
          }
        },
        { threshold: 0.35 }
      );
      if (elementRef.current) observer.observe(elementRef.current);
    } else {
      start();
    }

    return () => {
      observer?.disconnect();
      window.clearTimeout(delayTimer);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [delay, duration, value]);

  return (
    <span ref={elementRef} className={className} aria-label={value}>
      <span aria-hidden="true">{displayValue}</span>
    </span>
  );
}

export default AnimatedStatValue;
