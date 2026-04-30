import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Reveal } from "../../../utils/Reveal";

const tocSections = [
  { id: "abstract", label: "Abstract", num: "0" },
  { id: "introduction", label: "Introduction", num: "1" },
  { id: "research-questions", label: "Research Questions", num: "2" },
  { id: "dataset", label: "Dataset & Challenges", num: "3" },
  { id: "data-preparation", label: "Data Preparation", num: "4" },
  { id: "feature-engineering", label: "Feature Engineering", num: "5" },
  { id: "methodology", label: "Methodology", num: "6" },
  { id: "results", label: "Results & Analysis", num: "7" },
  { id: "discussion", label: "Discussion", num: "8" },
  { id: "conclusion", label: "Conclusion", num: "9" },
];

function Divider({ label }) {
  return (
    <div className="relative w-full h-[1px] bg-surface-variant mb-10">
      <span className="absolute -top-3 left-0 bg-surface pr-4 font-inter text-label-caps text-on-surface-variant uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

function SectionHeading({ num, children }) {
  return (
    <h2 className="font-newsreader text-h2 text-ink mb-6 leading-tight flex items-baseline gap-4">
      <span className="font-inter text-label-caps text-on-surface-variant tracking-widest mt-1">{num}</span>
      {children}
    </h2>
  );
}

function SubHeading({ children }) {
  return (
    <h3 className="font-inter text-[1.05rem] font-semibold text-ink mb-3 mt-8 uppercase tracking-wide">
      {children}
    </h3>
  );
}

function Para({ children, className = "" }) {
  return (
    <p className={`font-inter text-body-md text-on-surface-variant leading-relaxed mb-4 ${className}`}>
      {children}
    </p>
  );
}

function Figure({ src, alt, caption, onClick }) {
  return (
    <figure className="my-8">
      <div
        className="border border-surface-variant overflow-hidden cursor-zoom-in"
        onClick={onClick}
        title="Click to enlarge"
      >
        <img
          src={src}
          alt={alt}
          className="w-full object-contain bg-surface-container-low hover:opacity-90 transition-opacity"
          style={{ maxHeight: "420px" }}
        />
      </div>
      <figcaption className="font-inter text-[0.8rem] text-on-surface-variant mt-3 leading-snug">
        {caption}
      </figcaption>
    </figure>
  );
}

function PaperRetractionAnalysis() {
  const navigate = useNavigate();
  const [lightbox, setLightbox] = useState({ open: false, src: "", caption: "" });

  const openLightbox = (src, caption) => {
    setLightbox({ open: true, src, caption });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: "", caption: "" });
    document.body.style.overflow = "";
  };

  return (
    <main className="max-w-container mx-auto px-8 pt-24 pb-16">

      {/* Top nav */}
      <Reveal>
        <div className="flex items-center gap-3 mb-10">
          <button
            onClick={() => navigate("/research")}
            className="flex items-center gap-2 font-inter text-[0.85rem] text-on-surface-variant hover:text-ink transition-colors"
          >
            <FiArrowLeft size={14} />
            Research
          </button>
          <span className="text-surface-variant">/</span>
          <span className="font-inter text-[0.85rem] text-ink">Paper Retraction Analysis</span>
        </div>
      </Reveal>

      {/* Hero */}
      <Reveal>
        <header className="mb-12">
          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {["NLP", "Text Classification", "K-Means", "TF-IDF", "Random Forest", "EDA", "PCA"].map((tag) => (
              <span
                key={tag}
                className="font-inter text-label-caps text-on-surface-variant border border-surface-variant px-3 py-1 uppercase tracking-widest"
              >
                {tag}
              </span>
            ))}
          </div>

          <h1 className="font-newsreader text-h1 text-ink leading-tight mb-6 max-w-3xl">
            Understanding Paper Retractions: An Exploratory Data Analysis and NLP Classification Approach
          </h1>

          {/* Author strip */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-2 mb-8 pb-8 border-b border-surface-variant">
            <div>
              <p className="font-inter text-[0.75rem] text-on-surface-variant uppercase tracking-widest mb-0.5">Author</p>
              <p className="font-inter text-body-md font-medium text-ink">Chinmoy Mitra</p>
            </div>
            <div>
              <p className="font-inter text-[0.75rem] text-on-surface-variant uppercase tracking-widest mb-0.5">Institution</p>
              <p className="font-inter text-body-md text-on-surface-variant">RUET</p>
            </div>
            <div>
              <p className="font-inter text-[0.75rem] text-on-surface-variant uppercase tracking-widest mb-0.5">Year</p>
              <p className="font-inter text-body-md text-on-surface-variant">2024</p>
            </div>
            <div>
              <p className="font-inter text-[0.75rem] text-on-surface-variant uppercase tracking-widest mb-0.5">Dataset</p>
              <p className="font-inter text-body-md text-on-surface-variant">35,215 papers</p>
            </div>
            <div className="ml-auto">
              <a
                href="https://github.com/Chinmoy17/Paper-Retraction-Analysis-with-EDA-and-NLP"
                target="_blank"
                rel="noopener noreferrer"
                className="font-inter text-[0.85rem] text-ink border border-ink px-4 py-2 hover:bg-ink hover:text-surface transition-colors"
              >
                View on GitHub
              </a>
            </div>
          </div>

          {/* Inline TOC */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {tocSections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="font-inter text-[0.8rem] text-on-surface-variant hover:text-ink transition-colors flex items-baseline gap-1.5"
              >
                <span className="text-[0.65rem] tracking-wider opacity-60">{s.num}</span>
                {s.label}
              </a>
            ))}
          </nav>
        </header>
      </Reveal>

      {/* Abstract */}
      <section id="abstract" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Abstract" />
          <div className="border border-surface-variant bg-surface-container-low p-8">
            <Para>
              This study investigates patterns in scientific paper retractions using exploratory data analysis
              and natural language processing techniques. Analyzing a comprehensive dataset of{" "}
              <strong className="text-ink">35,215 retracted papers</strong> with 21 original columns, we identify
              common retraction reasons and examine temporal and publisher-specific trends.
              The project involved extensive data preparation including handling missing values across multiple columns,
              engineering 22 binary features from retraction reasons, and applying Bag-of-Words with PCA dimensionality
              reduction. Using machine learning classifiers on the engineered features, Random Forest achieved{" "}
              <strong className="text-ink">64.5% accuracy</strong> for multi-class retraction reason classification.
              K-means clustering (k=5) reveals distinct topic groups. The analysis demonstrates the complexity of
              retraction data and the challenges in automated classification when multiple overlapping reasons exist
              per paper.
            </Para>
          </div>
        </Reveal>
      </section>

      {/* Introduction */}
      <section id="introduction" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 1" />
          <SectionHeading num="1">Introduction</SectionHeading>
          <Para>
            Scientific integrity is foundational to research credibility. The increasing rate of paper
            retractions globally has raised concerns about research quality and the effectiveness of
            peer review processes. Understanding why papers are retracted—whether due to honest errors,
            misconduct, or systemic issues—is crucial for developing preventive measures.
          </Para>
          <Para>
            This work was particularly challenging due to the complexity and scale of the dataset.{" "}
            <strong className="text-ink">Manual examination of all 21 data columns was required</strong> to determine
            which features would be most informative for analysis. The dataset contains papers with multiple
            overlapping retraction reasons (separated by semicolons), significant missing values in key columns,
            and inconsistent formatting—all requiring careful preprocessing before any meaningful analysis could begin.
          </Para>
          <Para>
            The computational challenges were substantial: processing 35,215 text records, generating
            Bag-of-Words representations with up to 10,000 features, and performing dimensionality reduction
            while maintaining interpretability. The iterative process of feature engineering, model training,
            and validation required significant patience and methodological rigor.
          </Para>
        </Reveal>
      </section>

      {/* Research Questions */}
      <section id="research-questions" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 2" />
          <SectionHeading num="2">Research Questions</SectionHeading>
          <div className="flex flex-col gap-6">
            {[
              {
                badge: "RQ1",
                question: "What are the most common reasons for paper retractions?",
                rationale: "Understanding patterns helps institutions develop targeted preventive measures and improve research integrity training.",
              },
              {
                badge: "RQ2",
                question: "Can NLP techniques effectively classify retraction reasons from structured features?",
                rationale: "Automated classification could assist editorial processes and reduce the burden of manual review on journal staff.",
              },
              {
                badge: "RQ3",
                question: "Are there temporal or publisher-specific trends in retractions?",
                rationale: "Identifying trends may reveal systemic issues in certain disciplines or publishing ecosystems that require targeted intervention.",
              },
            ].map(({ badge, question, rationale }) => (
              <div key={badge} className="flex gap-5 border border-surface-variant p-6">
                <span className="font-inter text-label-caps text-surface bg-ink px-2 py-1 self-start mt-0.5 flex-shrink-0 tracking-widest">
                  {badge}
                </span>
                <div>
                  <p className="font-inter text-body-md font-medium text-ink mb-1">{question}</p>
                  <p className="font-inter text-[0.875rem] text-on-surface-variant leading-relaxed mb-0">{rationale}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Dataset & Challenges */}
      <section id="dataset" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 3" />
          <SectionHeading num="3">Dataset & Challenges</SectionHeading>
          <Para>
            The dataset <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">retractions35215.csv</code> contains{" "}
            <strong className="text-ink">35,215 records</strong> of retracted papers with 21 original columns
            capturing metadata about each retraction.
          </Para>
          <SubHeading>3.1 Dataset Schema</SubHeading>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border border-surface-variant font-inter text-[0.875rem]">
              <caption className="text-left text-[0.75rem] text-on-surface-variant mb-2 font-medium tracking-wide">
                Table 1: Dataset Columns and Missing Value Analysis
              </caption>
              <thead>
                <tr className="border-b border-surface-variant bg-surface-container">
                  <th className="text-left px-4 py-2.5 font-semibold text-ink">Column</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ink">Description</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-ink">Missing</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ["Record ID", "Unique identifier", "0"],
                  ["Title", "Paper title", "0"],
                  ["Subject", "Research domain/field", "0"],
                  ["Institution", "Author affiliation", "1"],
                  ["Journal", "Publication venue", "0"],
                  ["Publisher", "Publishing company", "0"],
                  ["Country", "Author country", "0"],
                  ["Author", "Author names", "0"],
                  ["URLS", "Related links", "15,254", true],
                  ["ArticleType", "Paper category", "0"],
                  ["RetractionDate", "When retracted", "0"],
                  ["RetractionDOI", "Retraction notice DOI", "206"],
                  ["RetractionPubMedID", "PubMed ID", "2,559"],
                  ["OriginalPaperDate", "Original publication date", "0"],
                  ["Reason", "Retraction reason(s)", "0"],
                  ["Paywalled", "Access status", "2"],
                  ["Notes", "Additional comments", "24,706", true],
                  ["CitationCount", "Number of citations", "0"],
                ].map(([col, desc, missing, highlight]) => (
                  <tr
                    key={col}
                    className={`border-b border-surface-variant ${highlight ? "bg-ink/[0.04]" : ""}`}
                  >
                    <td className="px-4 py-2.5 text-ink font-medium">{col}</td>
                    <td className="px-4 py-2.5 text-on-surface-variant">{desc}</td>
                    <td className={`px-4 py-2.5 text-right ${highlight ? "font-semibold text-ink" : "text-on-surface-variant"}`}>
                      {missing}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <SubHeading>3.2 Key Challenges</SubHeading>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-surface-variant">
            {[
              {
                title: "Multi-label Reasons",
                body: 'Papers often have multiple retraction reasons separated by semicolons (e.g., "+Plagiarism;+Fake Peer Review;+Data Issues"). This makes single-label classification inherently imprecise.',
              },
              {
                title: "Massive Missing Data",
                body: "24,706 missing values in Notes column (70%) and 15,254 missing URLs (43%). These potentially valuable features couldn't be fully utilized.",
              },
              {
                title: "High Cardinality",
                body: "Reason column has 28,759 unique combinations. Publisher has 34,640 unique values. Traditional one-hot encoding would explode dimensionality.",
              },
              {
                title: "Class Imbalance",
                body: "Some retraction reasons appear in thousands of papers, others in only a handful. This severe imbalance affects classifier performance.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-surface p-6">
                <p className="font-inter text-[0.8rem] font-semibold text-ink uppercase tracking-wide mb-2">{title}</p>
                <p className="font-inter text-[0.875rem] text-on-surface-variant leading-relaxed mb-0">{body}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Data Preparation */}
      <section id="data-preparation" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 4" />
          <SectionHeading num="4">Data Preparation</SectionHeading>
          <Para>
            Due to the messy nature of real-world data, extensive preprocessing was required before any analysis.
            Each step of the data cleaning pipeline was carefully sequenced to build on the previous.
          </Para>
          <SubHeading>4.1 Preprocessing Pipeline</SubHeading>
          <div className="border border-surface-variant divide-y divide-surface-variant">
            {[
              {
                step: "1",
                title: "Missing Value Handling",
                desc: (
                  <>
                    Filled missing{" "}
                    <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">Paywalled</code>{" "}
                    values with 'Unknown'. Combined{" "}
                    <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">Notes</code>{" "}
                    column (24,706 missing values) with other text fields for NLP feature extraction.
                  </>
                ),
              },
              {
                step: "2",
                title: "Date Processing & Feature Derivation",
                desc: (
                  <>
                    Converted date columns to proper datetime format (DD/MM/YYYY). Calculated{" "}
                    <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">DateDifference</code>{" "}
                    feature: days between original publication and retraction—a critical signal for understanding
                    retraction patterns.
                  </>
                ),
              },
              {
                step: "3",
                title: "Text Feature Concatenation",
                desc: (
                  <>
                    Unified text columns (Title, Subject, Institution, Journal, Notes) into a single{" "}
                    <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">words_feature</code>{" "}
                    column for comprehensive NLP processing and feature extraction.
                  </>
                ),
              },
              {
                step: "4",
                title: "Reason Parsing & Counting",
                desc: (
                  <>
                    Parsed multi-label{" "}
                    <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">Reason</code>{" "}
                    column (semicolon-separated). Created{" "}
                    <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">Reason_Count</code>{" "}
                    feature and split reasons into separate columns for frequency analysis.
                  </>
                ),
              },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-5 p-6">
                <div className="w-8 h-8 flex-shrink-0 flex items-center justify-center bg-ink text-surface font-inter text-[0.75rem] font-semibold">
                  {step}
                </div>
                <div className="pt-0.5">
                  <p className="font-inter text-[0.875rem] font-semibold text-ink mb-1">{title}</p>
                  <p className="font-inter text-[0.875rem] text-on-surface-variant leading-relaxed mb-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Feature Engineering */}
      <section id="feature-engineering" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 5" />
          <SectionHeading num="5">Feature Engineering</SectionHeading>
          <Para>
            Feature engineering was the most time-intensive part of this project. Two main approaches were used:
            structured binary features and text-based features with dimensionality reduction.
          </Para>

          <SubHeading>5.1 Binary Reason Indicators (21 Features)</SubHeading>
          <Para>
            After analyzing the most common retraction reasons, 21 binary indicator features were manually engineered.
            Each feature checks if the{" "}
            <code className="font-mono text-[0.875rem] bg-surface-container-high px-1.5 py-0.5">Reason</code>{" "}
            column contains specific keywords (case-insensitive matching), converting text patterns into structured
            numerical features.
          </Para>
          <div className="flex flex-wrap gap-2 mb-8">
            {[
              "Investigation", "Unreliable", "Data Issues", "Date Problems", "Breach",
              "Fake Review", "Limited Info", "Duplication", "Referencing", "Peer Review",
              "Random Content", "Plagiarism", "Paper Mill", "Misconduct", "Upgrade",
              "Falsification", "Unresponsive", "Image Issues", "Approval", "Authorship", "Withdrawal",
            ].map((feat) => (
              <span
                key={feat}
                className="font-inter text-[0.75rem] text-on-surface-variant border border-surface-variant px-3 py-1.5 bg-surface-container-low"
              >
                {feat}
              </span>
            ))}
          </div>

          <SubHeading>5.2 Text Feature Pipeline</SubHeading>
          <div className="border border-surface-variant p-6 mb-8">
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
              Bag-of-Words + PCA Pipeline
            </p>
            <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2.5 mb-0">
              {[
                <>
                  <strong className="text-ink">Vectorization:</strong> Applied CountVectorizer with{" "}
                  <code className="bg-surface-container-high px-1.5 py-0.5">min_df=30</code>,{" "}
                  <code className="bg-surface-container-high px-1.5 py-0.5">max_df=0.7</code>, and{" "}
                  <code className="bg-surface-container-high px-1.5 py-0.5">max_features=10,000</code>
                </>,
                <><strong className="text-ink">Vocabulary Filtering:</strong> Removed English stop words and non-alphabetic tokens</>,
                <><strong className="text-ink">Dimensionality Reduction:</strong> Applied PCA retaining 70% variance — reduced to 71 components</>,
                <><strong className="text-ink">Result:</strong> Transformed 10,000 sparse features into 71 dense principal components</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-surface-variant mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <SubHeading>5.3 Clustering Feature Preparation</SubHeading>
          <div className="border border-surface-variant p-6">
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
              K-Means Preprocessing Pipeline
            </p>
            <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2.5 mb-0">
              {[
                <><strong className="text-ink">Feature Selection:</strong> Used 22 features (Reason_Count + 21 binary indicators)</>,
                <><strong className="text-ink">Standardization:</strong> Applied StandardScaler for zero mean and unit variance</>,
                <><strong className="text-ink">PCA Reduction:</strong> Retained 90% variance — reduced to 15 components</>,
                <><strong className="text-ink">Final Shape:</strong> Transformed dataset: (35,215 samples × 15 dimensions)</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-surface-variant mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Methodology */}
      <section id="methodology" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 6" />
          <SectionHeading num="6">Methodology</SectionHeading>

          <SubHeading>6.1 Exploratory Data Analysis</SubHeading>
          <Para>Before modeling, extensive EDA was performed to understand data distributions:</Para>
          <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2 mb-8">
            {[
              <><strong className="text-ink">Publisher Analysis:</strong> Grouped papers by publisher, calculated cumulative percentages</>,
              <><strong className="text-ink">Reason Distribution:</strong> Parsed and counted individual reasons across all papers</>,
              <><strong className="text-ink">Temporal Analysis:</strong> Tracked retractions over time, calculated gap days statistics</>,
              <><strong className="text-ink">Country Analysis:</strong> Examined geographic distribution of retractions</>,
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-surface-variant mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <SubHeading>6.2 Unsupervised Learning: K-Means Clustering</SubHeading>
          <Para>
            K-means clustering was applied to the 15-dimensional PCA-reduced feature space to discover
            natural groupings in retraction patterns.
          </Para>
          <div className="border border-surface-variant p-6 mb-8">
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
              K-Means Configuration
            </p>
            <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2.5 mb-0">
              {[
                <><strong className="text-ink">Cluster Testing:</strong> Evaluated k=3, k=4, and k=5 clusters using elbow method</>,
                <><strong className="text-ink">Final Selection:</strong> Chose k=5 clusters based on cohesion and interpretability</>,
                <><strong className="text-ink">Visualization:</strong> Plotted clusters in 2D PCA space with centroids marked</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-surface-variant mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <SubHeading>6.3 Supervised Learning: Classification</SubHeading>
          <Para>
            Multiple classifiers were trained to predict the full Reason string using the 22 engineered features:
          </Para>
          <div className="border border-surface-variant p-6">
            <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-widest mb-4">
              Models Evaluated
            </p>
            <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2.5 mb-4">
              {[
                <><strong className="text-ink">Multinomial Naive Bayes:</strong> Baseline probabilistic classifier</>,
                <><strong className="text-ink">Decision Tree:</strong> Interpretable tree-based model</>,
                <><strong className="text-ink">Random Forest:</strong> Ensemble of 100 decision trees</>,
                <><strong className="text-ink">Voting Classifier:</strong> Ensemble combining all three models</>,
              ].map((item, i) => (
                <li key={i} className="flex gap-3">
                  <span className="text-surface-variant mt-0.5">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="font-inter text-[0.875rem] text-on-surface-variant mb-0">
              <strong className="text-ink">Protocol:</strong> 80/20 train-test split with{" "}
              <code className="bg-surface-container-high px-1.5 py-0.5">random_state=42</code> for reproducibility.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Results */}
      <section id="results" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 7" />
          <SectionHeading num="7">Results & Analysis</SectionHeading>

          <SubHeading>7.1 Classification Performance</SubHeading>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-surface-variant font-inter text-[0.875rem]">
              <caption className="text-left text-[0.75rem] text-on-surface-variant mb-2 font-medium tracking-wide">
                Table 2: Model Performance Comparison (20% test split)
              </caption>
              <thead>
                <tr className="border-b border-surface-variant bg-surface-container">
                  <th className="text-left px-4 py-2.5 font-semibold text-ink">Model</th>
                  <th className="text-right px-4 py-2.5 font-semibold text-ink">Accuracy</th>
                  <th className="text-left px-4 py-2.5 font-semibold text-ink">Notes</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { model: "Multinomial Naive Bayes", acc: "46.2%", note: "Baseline, assumes feature independence", best: false },
                  { model: "Decision Tree", acc: "64.4%", note: "Prone to overfitting", best: false },
                  { model: "Random Forest", acc: "64.5%", note: "Best single model (100 trees)", best: true },
                  { model: "Voting Classifier", acc: "~64%", note: "Ensemble of all three", best: false },
                ].map(({ model, acc, note, best }) => (
                  <tr
                    key={model}
                    className={`border-b border-surface-variant ${best ? "bg-ink/[0.04]" : ""}`}
                  >
                    <td className={`px-4 py-2.5 ${best ? "font-semibold text-ink" : "text-on-surface-variant"}`}>{model}</td>
                    <td className={`px-4 py-2.5 text-right tabular-nums ${best ? "font-semibold text-ink" : "text-on-surface-variant"}`}>{acc}</td>
                    <td className="px-4 py-2.5 text-on-surface-variant">{note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Para>
            The 64.5% accuracy, while not exceptional, is notable given the{" "}
            <strong className="text-ink">28,759 unique class labels</strong> in the target variable.
            The multi-label nature of retraction reasons (papers often have 3–10 reasons) makes exact string
            matching classification inherently difficult.
          </Para>

          <SubHeading>7.2 Publisher Analysis</SubHeading>
          <Figure
            src="/assets/research/paper-retraction/publisher.png"
            alt="Publisher analysis showing retraction counts and cumulative percentage"
            caption="Figure 1: Publisher Analysis — Top 10 publishers by retraction count with cumulative percentage. A small number of major publishers account for a disproportionate share of retractions."
            onClick={() =>
              openLightbox(
                "/assets/research/paper-retraction/publisher.png",
                "Figure 1: Publisher Analysis — Top 10 publishers by retraction count with cumulative percentage"
              )
            }
          />

          <SubHeading>7.3 Retraction Reason Distribution</SubHeading>
          <Figure
            src="/assets/research/paper-retraction/reason.png"
            alt="Retraction reasons percentage distribution"
            caption='Figure 2: Retraction Reason Distribution — Top 30 individual reasons with cumulative percentage. "Investigation by Journal/Publisher" and "Unreliable Results" dominate the distribution.'
            onClick={() =>
              openLightbox(
                "/assets/research/paper-retraction/reason.png",
                "Figure 2: Retraction Reasons Distribution — Top 30 reasons with cumulative percentage"
              )
            }
          />

          <SubHeading>7.4 K-Means Clustering</SubHeading>
          <Figure
            src="/assets/research/paper-retraction/kmean.png"
            alt="K-means clustering visualization"
            caption="Figure 3: K-Means Clustering (k=5) — Visualization of the first two principal components. Red X markers indicate cluster centroids. Clear separation suggests distinct retraction archetypes."
            onClick={() =>
              openLightbox(
                "/assets/research/paper-retraction/kmean.png",
                "Figure 3: K-Means Clustering (k=5) showing distinct retraction pattern groups"
              )
            }
          />

          <SubHeading>7.5 Key Metrics Summary</SubHeading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-surface-variant">
            {[
              { value: "35,215", label: "Papers Analyzed" },
              { value: "64.5%", label: "Best Accuracy" },
              { value: "22", label: "Engineered Features" },
              { value: "5", label: "Distinct Clusters" },
            ].map(({ value, label }) => (
              <div key={label} className="bg-surface p-6 text-center">
                <p className="font-newsreader text-h2 text-ink mb-1">{value}</p>
                <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-widest mb-0">{label}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* Discussion */}
      <section id="discussion" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 8" />
          <SectionHeading num="8">Discussion</SectionHeading>
          <Para>
            The analysis reveals both the potential and limitations of NLP-based approaches for understanding
            paper retractions. The clustering results show clear patterns exist in the data, while the
            classification accuracy highlights the inherent complexity of multi-label prediction.
          </Para>

          <SubHeading>Why 64.5% Accuracy is Meaningful</SubHeading>
          <Para>While 64.5% may seem modest, context matters:</Para>
          <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2 mb-8">
            {[
              <>The target variable has <strong className="text-ink">28,759 unique values</strong> — random guessing would yield &lt;0.01% accuracy</>,
              <>Papers have multiple overlapping reasons; exact string matching penalizes partial correctness</>,
              <>The model successfully learns from 22 binary features without access to full text content</>,
              <>A reformulation as multi-label classification would likely show improved metrics</>,
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-surface-variant mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <SubHeading>Limitations</SubHeading>
          <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2 mb-0">
            {[
              <><strong className="text-ink">Single-label formulation:</strong> Treating multi-reason retractions as single labels hurts classification</>,
              <><strong className="text-ink">Missing data:</strong> 70% of Notes column was empty, limiting text feature effectiveness</>,
              <><strong className="text-ink">English-only:</strong> Dataset limited to English-language publications</>,
              <><strong className="text-ink">Temporal bias:</strong> Reporting standards have evolved; older data may be inconsistent</>,
              <><strong className="text-ink">No deep learning:</strong> Transformer-based models could capture richer semantic patterns</>,
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-surface-variant mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>
      </section>

      {/* Conclusion */}
      <section id="conclusion" className="mb-16 scroll-mt-24">
        <Reveal>
          <Divider label="Section 9" />
          <SectionHeading num="9">Conclusion</SectionHeading>
          <Para>
            This analysis demonstrates both the viability and challenges of NLP techniques for understanding
            paper retractions. Through extensive data preparation and feature engineering, we transformed
            a messy, real-world dataset into a structured format suitable for machine learning analysis.
          </Para>
          <Para>Key contributions include:</Para>
          <ul className="font-inter text-[0.875rem] text-on-surface-variant space-y-2 mb-8">
            {[
              "A systematic approach to handling multi-label retraction reasons through binary feature engineering",
              "Demonstration that simple ML models can achieve meaningful accuracy on extremely high-cardinality classification tasks",
              "Identification of 5 distinct retraction archetypes through unsupervised clustering",
              "Visualization of publisher and reason distributions revealing concentration patterns",
            ].map((item, i) => (
              <li key={i} className="flex gap-3">
                <span className="text-surface-variant mt-0.5">—</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Para>
            <strong className="text-ink">Future Work:</strong> Reformulating as multi-label classification,
            incorporating transformer-based text embeddings (BERT, SciBERT), expanding to multilingual corpora,
            and developing real-time screening tools for editorial systems.
          </Para>

          <div className="border border-surface-variant p-6 mt-8 flex items-center justify-between gap-6">
            <div>
              <p className="font-inter text-label-caps text-on-surface-variant uppercase tracking-widest mb-1">Source Code</p>
              <p className="font-inter text-[0.875rem] text-on-surface-variant mb-0">
                Full notebook (PRT 564.ipynb) with data preprocessing, feature engineering, and model training.
              </p>
            </div>
            <a
              href="https://github.com/Chinmoy17/Paper-Retraction-Analysis-with-EDA-and-NLP"
              target="_blank"
              rel="noopener noreferrer"
              className="font-inter text-[0.85rem] text-ink border border-ink px-5 py-2.5 hover:bg-ink hover:text-surface transition-colors flex-shrink-0"
            >
              GitHub Repository
            </a>
          </div>
        </Reveal>
      </section>

      {/* Back link */}
      <Reveal>
        <div className="border-t border-surface-variant pt-10">
          <Link
            to="/research"
            className="inline-flex items-center gap-2 font-inter text-[0.875rem] text-on-surface-variant hover:text-ink transition-colors"
          >
            <FiArrowLeft size={14} />
            Back to Research
          </Link>
        </div>
      </Reveal>

      {/* Lightbox */}
      {lightbox.open &&
        createPortal(
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-ink/80 backdrop-blur-sm"
            onClick={closeLightbox}
          >
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 font-inter text-surface text-2xl leading-none hover:text-surface-variant transition-colors"
              aria-label="Close"
            >
              &times;
            </button>
            <div
              className="max-w-4xl w-full mx-6 max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={lightbox.src}
                alt={lightbox.caption}
                className="w-full object-contain max-h-[80vh]"
              />
              {lightbox.caption && (
                <p className="font-inter text-[0.8rem] text-surface-variant mt-3 text-center leading-snug">
                  {lightbox.caption}
                </p>
              )}
            </div>
          </div>,
          document.body
        )}
    </main>
  );
}

export default PaperRetractionAnalysis;
