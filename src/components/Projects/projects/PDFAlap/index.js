import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Badge } from "react-bootstrap";
import {
  FiGlobe,
  FiShield,
  FiMessageCircle,
  FiCode,
  FiCheckCircle,
  FiDatabase,
  FiLayers,
  FiZoomIn,
  FiZoomOut,
  FiX,
  FiCpu,
} from "react-icons/fi";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaBrain } from "react-icons/fa";
import ProjectTemplate from "../../ProjectTemplate";
import data from "./data";
import styles from "./PDFAlap.module.css";

/**
 * Icon mapping for features and decisions
 */
const iconMap = {
  globe: FiGlobe,
  scan: MdOutlineDocumentScanner,
  shield: FiShield,
  "message-circle": FiMessageCircle,
  code: FiCode,
  "check-circle": FiCheckCircle,
  brain: FaBrain,
  database: FiDatabase,
  layers: FiLayers,
  cpu: FiCpu,
};

/**
 * PDF-ALAP Project - Dedicated Component
 * A "technical deep-dive" style case study for the multilingual PDF chatbot.
 */
function PDFAlapProject() {
  const [lightbox, setLightbox] = useState(null);
  const [zoom, setZoom] = useState(1);

  const openLightbox = (payload) => {
    setZoom(1);
    setLightbox(payload);
  };
  const closeLightbox = () => setLightbox(null);

  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) zoomIn();
    else zoomOut();
  };

  useEffect(() => {
    if (!lightbox) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (e) => {
      if (e.key === "Escape") closeLightbox();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [lightbox]);

  const zoomProps = (src, alt, caption) => ({
    role: "button",
    tabIndex: 0,
    onClick: () => openLightbox({ src, alt, caption }),
    onKeyDown: (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openLightbox({ src, alt, caption });
      }
    },
  });

  // Table of contents
  const toc = [
    { id: "overview", title: "Overview" },
    { id: "challenge", title: "The Challenge" },
    { id: "architecture", title: "Architecture" },
    { id: "tech-specs", title: "Tech Specs" },
    { id: "decisions", title: "Key Decisions" },
    { id: "bangla-ocr", title: "Bangla OCR" },
    { id: "evaluation", title: "Evaluation" },
    { id: "features", title: "Features" },
    { id: "demo", title: "Demo" },
    { id: "lessons", title: "Lessons Learned" },
  ];

  // Custom Hero Section
  const heroSection = (
    <header className={styles.hero}>
      <div className={styles.heroTop}>
        <h1 className={styles.heroTitle}>{data.title}</h1>
        <p className={styles.heroTagline}>{data.tagline}</p>
        <div className={styles.heroBadges}>
          <Badge className={`${styles.heroBadge} ${styles.heroBadgePublic}`}>
            Open Source
          </Badge>
          <Badge className={`${styles.heroBadge} ${styles.heroBadgeType}`}>
            RAG System
          </Badge>
          <Badge className={`${styles.heroBadge} ${styles.heroBadgeType}`}>
            Learning Project
          </Badge>
        </div>
      </div>

      {/* Stats */}
      <div className={styles.statsRow}>
        {data.stats.map((stat, i) => (
          <div key={i} className={styles.stat}>
            <span className={styles.statValue}>{stat.value}</span>
            <span className={styles.statLabel}>{stat.label}</span>
          </div>
        ))}
      </div>
    </header>
  );

  return (
    <ProjectTemplate
      project={data}
      heroSection={heroSection}
      toc={toc}
      showAside={true}
      variant="technical"
    >
      <div className={styles.content}>
        {/* Overview / Intro */}
        <section id="overview" className={styles.section}>
          <p style={{ fontSize: "1.1rem", lineHeight: 1.8, color: "var(--color-text)" }}>
            <strong>PDF-ALAP</strong> (আলাপ means "conversation" in Bangla) is a privacy-first 
            chatbot that lets you ask questions about your PDF documents — in English or Bangla.
            Built to solve a real problem: studying for board exams from a mix of digital and 
            scanned textbooks, without uploading sensitive documents to cloud services.
          </p>
        </section>

        {/* The Challenge */}
        <section id="challenge" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🎯</span>
            {data.challenge.title}
          </h2>
          <div className={styles.challengeContent}>
            {data.challenge.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1rem" }}>
                {para.split("**").map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            ))}
          </div>
        </section>

        {/* Architecture */}
        <section id="architecture" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🏗️</span>
            {data.architecture.title}
          </h2>
          <div className={styles.architecturePipeline}>
            {data.architecture.layers.map((layer, i) => (
              <div key={i} className={styles.pipelineStep}>
                <div className={styles.pipelineConnector}>
                  <div className={styles.pipelineNumber}>{i + 1}</div>
                  <div className={styles.pipelineLine} />
                </div>
                <div className={styles.pipelineContent}>
                  <div className={styles.pipelineName}>{layer.name}</div>
                  <div className={styles.pipelineDesc}>{layer.description}</div>
                  <div className={styles.pipelineTech}>{layer.tech}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Technical Specifications */}
        <section id="tech-specs" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>⚙️</span>
            {data.techSpecs.title}
          </h2>
          
          {/* Models Used */}
          <h3 className={styles.subsectionTitle}>Models & Configuration</h3>
          <div className={styles.specsTable}>
            {data.techSpecs.models.map((model, i) => (
              <div key={i} className={styles.specRow}>
                <div className={styles.specName}>{model.name}</div>
                <div className={styles.specPurpose}>{model.purpose}</div>
                <code className={styles.specConfig}>{model.config}</code>
              </div>
            ))}
          </div>

          {/* Chunking Strategy */}
          <h3 className={styles.subsectionTitle}>Chunking Strategy</h3>
          <div className={styles.chunkingInfo}>
            <div className={styles.chunkingItem}>
              <span className={styles.chunkingLabel}>Strategy</span>
              <code>{data.techSpecs.chunking.strategy}</code>
            </div>
            <div className={styles.chunkingItem}>
              <span className={styles.chunkingLabel}>Chunk Size</span>
              <code>{data.techSpecs.chunking.chunkSize} characters</code>
            </div>
            <div className={styles.chunkingItem}>
              <span className={styles.chunkingLabel}>Overlap</span>
              <code>{data.techSpecs.chunking.chunkOverlap} characters</code>
            </div>
          </div>

          {/* Dependencies */}
          <h3 className={styles.subsectionTitle}>Dependencies (requirements.txt)</h3>
          <div className={styles.depsGrid}>
            {data.techSpecs.dependencies.map((dep, i) => (
              <div key={i} className={styles.depItem}>
                <code className={styles.depName}>{dep.name}</code>
                <span className={styles.depPurpose}>{dep.purpose}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Decisions */}
        <section id="decisions" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🤔</span>
            Key Technical Decisions
          </h2>
          <div className={styles.decisionsGrid}>
            {data.decisions.map((decision, i) => {
              const Icon = iconMap[decision.icon] || FiCode;
              return (
                <div key={i} className={styles.decisionCard}>
                  <div className={styles.decisionIcon}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.decisionQuestion}>{decision.question}</div>
                  <div className={styles.decisionAnswer}>{decision.answer}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bangla OCR Deep Dive */}
        <section id="bangla-ocr" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>🔤</span>
            {data.banglaOCR.title}
          </h2>
          <div className={styles.ocrContent}>
            {data.banglaOCR.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1rem" }}>
                {para.split("**").map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            ))}
          </div>
          <div className={styles.ocrExamples}>
            {data.banglaOCR.examples.map((ex, i) => (
              <div key={i} className={styles.ocrExample}>
                <span className={styles.ocrIssue}>{ex.issue}</span>
                <span className={styles.ocrExampleText}>{ex.example}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Evaluation Approach */}
        <section id="evaluation" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📊</span>
            {data.evaluation.title}
          </h2>
          <div className={styles.evaluationContent}>
            {data.evaluation.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1rem" }}>
                {para.split("**").map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            ))}
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>✨</span>
            Features
          </h2>
          <div className={styles.featuresGrid}>
            {data.features.map((feature, i) => {
              const Icon = iconMap[feature.icon] || FiCheckCircle;
              return (
                <div key={i} className={styles.featureCard}>
                  <div className={styles.featureIcon}>
                    <Icon size={24} />
                  </div>
                  <div className={styles.featureTitle}>{feature.title}</div>
                  <div className={styles.featureDesc}>{feature.description}</div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Demo Screenshots */}
        <section id="demo" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📸</span>
            Demo
          </h2>
          <div className={styles.screenshotsGrid}>
            {data.screenshots.map((ss, i) => (
              <div
                key={i}
                className={styles.screenshotCard}
                {...zoomProps(ss.src, ss.alt, ss.caption)}
              >
                <img
                  src={ss.src}
                  alt={ss.alt}
                  className={styles.screenshotImage}
                  loading="lazy"
                />
                <div className={styles.screenshotCaption}>{ss.caption}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Use Cases */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>💡</span>
            Use Cases
          </h2>
          <div className={styles.useCasesGrid}>
            {data.useCases.map((uc, i) => (
              <div key={i} className={styles.useCaseCard}>
                <div className={styles.useCaseEmoji}>{uc.emoji}</div>
                <div className={styles.useCaseTitle}>{uc.title}</div>
                <div className={styles.useCaseDesc}>{uc.description}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Lessons Learned */}
        <section id="lessons" className={styles.section}>
          <h2 className={styles.sectionTitle}>
            <span className={styles.sectionIcon}>📝</span>
            {data.lessons.title}
          </h2>
          <div className={styles.lessonsContent}>
            {data.lessons.content.split("\n\n").map((para, i) => (
              <p key={i} style={{ marginBottom: "1rem" }}>
                {para.split("**").map((part, j) =>
                  j % 2 === 1 ? <strong key={j}>{part}</strong> : part
                )}
              </p>
            ))}
          </div>
        </section>
      </div>

      {/* Lightbox */}
      {lightbox &&
        createPortal(
          <div
            className={styles.lightboxOverlay}
            onClick={closeLightbox}
            onWheel={handleWheel}
          >
            <div className={styles.lightboxControls} onClick={(e) => e.stopPropagation()}>
              <button className={styles.lightboxBtn} onClick={zoomOut} title="Zoom out">
                <FiZoomOut size={18} />
              </button>
              <button className={styles.lightboxBtn} onClick={zoomIn} title="Zoom in">
                <FiZoomIn size={18} />
              </button>
              <span className={styles.zoomLevel}>{Math.round(zoom * 100)}%</span>
              <button className={styles.lightboxBtn} onClick={closeLightbox} title="Close">
                <FiX size={18} />
              </button>
            </div>
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className={styles.lightboxImage}
              style={{ transform: `scale(${zoom})` }}
              onClick={(e) => e.stopPropagation()}
            />
            {lightbox.caption && (
              <div className={styles.lightboxCaption}>{lightbox.caption}</div>
            )}
          </div>,
          document.body
        )}
    </ProjectTemplate>
  );
}

export default PDFAlapProject;
