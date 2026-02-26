import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Particle from "../../../Particle";
import styles from "./PaperRetractionAnalysis.module.css";

/**
 * Paper Retraction Analysis - Academic Paper Style Component
 * Detailed content extracted from PRT 564.ipynb notebook
 */

const sections = [
  { id: "abstract", title: "Abstract", number: "0" },
  { id: "introduction", title: "Introduction", number: "1" },
  { id: "research-questions", title: "Research Questions", number: "2" },
  { id: "dataset", title: "Dataset & Challenges", number: "3" },
  { id: "data-preparation", title: "Data Preparation", number: "4" },
  { id: "feature-engineering", title: "Feature Engineering", number: "5" },
  { id: "methodology", title: "Methodology", number: "6" },
  { id: "results", title: "Results & Analysis", number: "7" },
  { id: "discussion", title: "Discussion", number: "8" },
  { id: "conclusion", title: "Conclusion", number: "9" },
];

function PaperRetractionAnalysis() {
  const [activeSection, setActiveSection] = useState("abstract");
  const [lightbox, setLightbox] = useState({ open: false, src: "", caption: "" });

  // Track scroll position to highlight active section in TOC
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 120;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: "smooth"
      });
    }
  };

  const openLightbox = (src, caption) => {
    setLightbox({ open: true, src, caption });
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    setLightbox({ open: false, src: "", caption: "" });
    document.body.style.overflow = "auto";
  };

  return (
    <Container fluid className="project-section">
      <Particle />

      <div className={styles.pageWrapper}>
        {/* Left Sidebar - Table of Contents */}
        <aside className={styles.sidebar}>
          <div className={styles.sidebarContent}>
            <Link to="/research" className={styles.backLink}>
              &larr; Back to Research
            </Link>

            <nav className={styles.tocNav}>
              <h3 className={styles.tocTitle}>Contents</h3>
              <ul className={styles.tocList}>
                {sections.map((section) => (
                  <li key={section.id}>
                    <button
                      className={`${styles.tocItem} ${activeSection === section.id ? styles.tocItemActive : ""}`}
                      onClick={() => scrollToSection(section.id)}
                    >
                      <span className={styles.tocNumber}>{section.number}</span>
                      <span className={styles.tocText}>{section.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </nav>

            <div className={styles.sidebarMeta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Author</span>
                <span className={styles.metaValue}>Chinmoy Mitra</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Institution</span>
                <span className={styles.metaValue}>RUET</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Year</span>
                <span className={styles.metaValue}>2024</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Dataset Size</span>
                <span className={styles.metaValue}>35,215 papers</span>
              </div>
            </div>

            <a
              href="https://github.com/Chinmoy17/Paper-Retraction-Analysis-with-EDA-and-NLP"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.githubLink}
            >
              View on GitHub
            </a>
          </div>
        </aside>

        {/* Main Content */}
        <main className={styles.mainContent}>
          {/* Paper Title */}
          <header className={styles.paperHeader}>
            <h1 className={styles.paperTitle}>
              Understanding Paper Retractions: An Exploratory Data Analysis and NLP Classification Approach
            </h1>
            <p className={styles.paperAuthors}>
              <strong>Chinmoy Mitra</strong>
              <br />
              <span className={styles.paperAffiliation}>
                Rajshahi University of Engineering and Technology (RUET)
              </span>
            </p>
            <div className={styles.paperKeywords}>
              <span className={styles.keywordLabel}>Keywords:</span>
              {["NLP", "Text Classification", "K-Means", "TF-IDF", "Random Forest", "EDA", "PCA", "Feature Engineering"].map((kw) => (
                <span key={kw} className={styles.keyword}>{kw}</span>
              ))}
            </div>
          </header>

          {/* Abstract */}
          <section id="abstract" className={styles.section}>
            <div className={styles.abstractBox}>
              <h2 className={styles.abstractTitle}>Abstract</h2>
              <p className={styles.abstractText}>
                This study investigates patterns in scientific paper retractions using exploratory data analysis
                and natural language processing techniques. Analyzing a comprehensive dataset of <strong>35,215 retracted papers</strong> with
                21 original columns, we identify common retraction reasons and examine temporal and publisher-specific trends.
                The project involved extensive data preparation including handling missing values across multiple columns,
                engineering 22 binary features from retraction reasons, and applying Bag-of-Words with PCA dimensionality reduction.
                Using machine learning classifiers on the engineered features, Random Forest achieved <strong>64.5% accuracy</strong> for
                multi-class retraction reason classification. K-means clustering (k=5) reveals distinct topic groups.
                The analysis demonstrates the complexity of retraction data and the challenges in automated classification
                when multiple overlapping reasons exist per paper.
              </p>
            </div>
          </section>

          {/* Introduction */}
          <section id="introduction" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>1</span>
              Introduction
            </h2>
            <p className={styles.paragraph}>
              Scientific integrity is foundational to research credibility. The increasing rate of paper
              retractions globally has raised concerns about research quality and the effectiveness of
              peer review processes. Understanding why papers are retracted—whether due to honest errors,
              misconduct, or systemic issues—is crucial for developing preventive measures.
            </p>
            <p className={styles.paragraph}>
              This work was particularly challenging due to the complexity and scale of the dataset.
              <strong> Manual examination of all 21 data columns was required</strong> to determine which features would be
              most informative for analysis. The dataset contains papers with multiple overlapping retraction reasons
              (separated by semicolons), significant missing values in key columns, and inconsistent formatting—all
              requiring careful preprocessing before any meaningful analysis could begin.
            </p>
            <p className={styles.paragraph}>
              The computational challenges were substantial: processing 35,215 text records, generating
              Bag-of-Words representations with up to 10,000 features, and performing dimensionality reduction
              while maintaining interpretability. The iterative process of feature engineering, model training,
              and validation required significant patience and methodological rigor.
            </p>
          </section>

          {/* Research Questions */}
          <section id="research-questions" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>2</span>
              Research Questions
            </h2>

            <div className={styles.researchQuestion}>
              <span className={styles.rqBadge}>RQ1</span>
              <div>
                <p className={styles.rqText}>What are the most common reasons for paper retractions?</p>
                <p className={styles.rqRationale}>
                  Understanding patterns helps institutions develop targeted preventive measures
                  and improve research integrity training.
                </p>
              </div>
            </div>

            <div className={styles.researchQuestion}>
              <span className={styles.rqBadge}>RQ2</span>
              <div>
                <p className={styles.rqText}>Can NLP techniques effectively classify retraction reasons from structured features?</p>
                <p className={styles.rqRationale}>
                  Automated classification could assist editorial processes and reduce
                  the burden of manual review on journal staff.
                </p>
              </div>
            </div>

            <div className={styles.researchQuestion}>
              <span className={styles.rqBadge}>RQ3</span>
              <div>
                <p className={styles.rqText}>Are there temporal or publisher-specific trends in retractions?</p>
                <p className={styles.rqRationale}>
                  Identifying trends may reveal systemic issues in certain disciplines
                  or publishing ecosystems that require targeted intervention.
                </p>
              </div>
            </div>
          </section>

          {/* Dataset & Challenges */}
          <section id="dataset" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3</span>
              Dataset & Challenges
            </h2>

            <p className={styles.paragraph}>
              The dataset <code>retractions35215.csv</code> contains <strong>35,215 records</strong> of retracted papers
              with 21 original columns capturing metadata about each retraction.
            </p>

            <h3 className={styles.subsectionTitle}>3.1 Dataset Schema</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <caption>Table 1: Dataset Columns and Missing Value Analysis</caption>
                <thead>
                  <tr>
                    <th>Column</th>
                    <th>Description</th>
                    <th>Missing</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Record ID</td><td>Unique identifier</td><td>0</td></tr>
                  <tr><td>Title</td><td>Paper title</td><td>0</td></tr>
                  <tr><td>Subject</td><td>Research domain/field</td><td>0</td></tr>
                  <tr><td>Institution</td><td>Author affiliation</td><td>1</td></tr>
                  <tr><td>Journal</td><td>Publication venue</td><td>0</td></tr>
                  <tr><td>Publisher</td><td>Publishing company</td><td>0</td></tr>
                  <tr><td>Country</td><td>Author country</td><td>0</td></tr>
                  <tr><td>Author</td><td>Author names</td><td>0</td></tr>
                  <tr className={styles.highlightRow}><td>URLS</td><td>Related links</td><td><strong>15,254</strong></td></tr>
                  <tr><td>ArticleType</td><td>Paper category</td><td>0</td></tr>
                  <tr><td>RetractionDate</td><td>When retracted</td><td>0</td></tr>
                  <tr><td>RetractionDOI</td><td>Retraction notice DOI</td><td>206</td></tr>
                  <tr><td>RetractionPubMedID</td><td>PubMed ID</td><td>2,559</td></tr>
                  <tr><td>OriginalPaperDate</td><td>Original publication date</td><td>0</td></tr>
                  <tr><td>Reason</td><td>Retraction reason(s)</td><td>0</td></tr>
                  <tr><td>Paywalled</td><td>Access status</td><td>2</td></tr>
                  <tr className={styles.highlightRow}><td>Notes</td><td>Additional comments</td><td><strong>24,706</strong></td></tr>
                  <tr><td>CitationCount</td><td>Number of citations</td><td>0</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className={styles.subsectionTitle}>3.2 Key Challenges</h3>
            <div className={styles.challengeGrid}>
              <div className={styles.challengeCard}>
                <h4>Multi-label Reasons</h4>
                <p>Papers often have multiple retraction reasons separated by semicolons (e.g., "+Plagiarism;+Fake Peer Review;+Data Issues").
                This makes single-label classification inherently imprecise.</p>
              </div>
              <div className={styles.challengeCard}>
                <h4>Massive Missing Data</h4>
                <p>24,706 missing values in Notes column (70%) and 15,254 missing URLs (43%).
                These potentially valuable features couldn't be fully utilized.</p>
              </div>
              <div className={styles.challengeCard}>
                <h4>High Cardinality</h4>
                <p>Reason column has 28,759 unique combinations. Publisher has 34,640 unique values.
                Traditional one-hot encoding would explode dimensionality.</p>
              </div>
              <div className={styles.challengeCard}>
                <h4>Class Imbalance</h4>
                <p>Some retraction reasons appear in thousands of papers, others in only a handful.
                This severe imbalance affects classifier performance.</p>
              </div>
            </div>
          </section>

          {/* Data Preparation */}
          <section id="data-preparation" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4</span>
              Data Preparation
            </h2>
            <p className={styles.paragraph}>
              Due to the messy nature of real-world data, extensive preprocessing was required before any analysis.
              This section details each step of the data cleaning pipeline.
            </p>

            <h3 className={styles.subsectionTitle}>4.1 Preprocessing Pipeline</h3>

            <div className={styles.pipelineBox}>
              <div className={styles.pipelineSteps}>
                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>1</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Missing Value Handling</div>
                    <div className={styles.pipelineStepDesc}>
                      Filled missing <code className={styles.inlineCode}>Paywalled</code> values with 'Unknown'.
                      Combined <code className={styles.inlineCode}>Notes</code> column (24,706 missing values) with other text fields for NLP feature extraction.
                    </div>
                  </div>
                </div>

                <div className={styles.pipelineArrow}>↓</div>

                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>2</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Date Processing & Feature Derivation</div>
                    <div className={styles.pipelineStepDesc}>
                      Converted date columns to proper datetime format (DD/MM/YYYY). Calculated <code className={styles.inlineCode}>DateDifference</code> feature:
                      days between original publication and retraction—a critical signal for understanding retraction patterns.
                    </div>
                  </div>
                </div>

                <div className={styles.pipelineArrow}>↓</div>

                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>3</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Text Feature Concatenation</div>
                    <div className={styles.pipelineStepDesc}>
                      Unified text columns (Title, Subject, Institution, Journal, Notes) into a single <code className={styles.inlineCode}>words_feature</code> column
                      for comprehensive NLP processing and feature extraction.
                    </div>
                  </div>
                </div>

                <div className={styles.pipelineArrow}>↓</div>

                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>4</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Reason Parsing & Counting</div>
                    <div className={styles.pipelineStepDesc}>
                      Parsed multi-label <code className={styles.inlineCode}>Reason</code> column (semicolon-separated).
                      Created <code className={styles.inlineCode}>Reason_Count</code> feature and split reasons into separate columns for frequency analysis.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Feature Engineering */}
          <section id="feature-engineering" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5</span>
              Feature Engineering
            </h2>
            <p className={styles.paragraph}>
              Feature engineering was the most time-intensive part of this project. Two main approaches were used:
              structured binary features and text-based features with dimensionality reduction.
            </p>

            <h3 className={styles.subsectionTitle}>5.1 Binary Reason Indicators (21 Features)</h3>
            <p className={styles.paragraph}>
              After analyzing the most common retraction reasons, 21 binary indicator features were manually engineered.
              Each feature checks if the <code className={styles.inlineCode}>Reason</code> column contains specific keywords
              (case-insensitive matching), converting text patterns into structured numerical features.
            </p>

            <div className={styles.featureGrid}>
              <div className={styles.featureItem}>Investigation</div>
              <div className={styles.featureItem}>Unreliable</div>
              <div className={styles.featureItem}>Data Issues</div>
              <div className={styles.featureItem}>Date Problems</div>
              <div className={styles.featureItem}>Breach</div>
              <div className={styles.featureItem}>Fake Review</div>
              <div className={styles.featureItem}>Limited Info</div>
              <div className={styles.featureItem}>Duplication</div>
              <div className={styles.featureItem}>Referencing</div>
              <div className={styles.featureItem}>Peer Review</div>
              <div className={styles.featureItem}>Random Content</div>
              <div className={styles.featureItem}>Plagiarism</div>
              <div className={styles.featureItem}>Paper Mill</div>
              <div className={styles.featureItem}>Misconduct</div>
              <div className={styles.featureItem}>Upgrade</div>
              <div className={styles.featureItem}>Falsification</div>
              <div className={styles.featureItem}>Unresponsive</div>
              <div className={styles.featureItem}>Image Issues</div>
              <div className={styles.featureItem}>Approval</div>
              <div className={styles.featureItem}>Authorship</div>
              <div className={styles.featureItem}>Withdrawal</div>
            </div>

            <h3 className={styles.subsectionTitle}>5.2 Text Feature Pipeline</h3>

            <div className={styles.algorithmBox}>
              <div className={styles.algorithmTitle}>Bag-of-Words + PCA Pipeline</div>
              <ul className={styles.algorithmSteps}>
                <li>
                  <strong>Vectorization:</strong> Applied CountVectorizer with <code className={styles.inlineCode}>min_df=30</code>,
                  <code className={styles.inlineCode}>max_df=0.7</code>, and <code className={styles.inlineCode}>max_features=10,000</code>
                </li>
                <li>
                  <strong>Vocabulary Filtering:</strong> Removed English stop words and non-alphabetic tokens
                </li>
                <li>
                  <strong>Dimensionality Reduction:</strong> Applied PCA retaining 70% variance → reduced to 71 components
                </li>
                <li>
                  <strong>Result:</strong> Transformed 10,000 sparse features into 71 dense principal components
                </li>
              </ul>
            </div>

            <h3 className={styles.subsectionTitle}>5.3 Clustering Feature Preparation</h3>

            <div className={styles.algorithmBox}>
              <div className={styles.algorithmTitle}>K-Means Preprocessing Pipeline</div>
              <ul className={styles.algorithmSteps}>
                <li>
                  <strong>Feature Selection:</strong> Used 22 features (Reason_Count + 21 binary indicators)
                </li>
                <li>
                  <strong>Standardization:</strong> Applied StandardScaler for zero mean and unit variance
                </li>
                <li>
                  <strong>PCA Reduction:</strong> Retained 90% variance → reduced to 15 components
                </li>
                <li>
                  <strong>Final Shape:</strong> Transformed dataset: (35,215 samples × 15 dimensions)
                </li>
              </ul>
            </div>
          </section>

          {/* Methodology */}
          <section id="methodology" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6</span>
              Methodology
            </h2>

            <h3 className={styles.subsectionTitle}>6.1 Exploratory Data Analysis</h3>
            <p className={styles.paragraph}>
              Before modeling, extensive EDA was performed to understand data distributions:
            </p>
            <ul className={styles.methodList}>
              <li><strong>Publisher Analysis:</strong> Grouped papers by publisher, calculated cumulative percentages</li>
              <li><strong>Reason Distribution:</strong> Parsed and counted individual reasons across all papers</li>
              <li><strong>Temporal Analysis:</strong> Tracked retractions over time, calculated gap days statistics</li>
              <li><strong>Country Analysis:</strong> Examined geographic distribution of retractions</li>
            </ul>

            <h3 className={styles.subsectionTitle}>6.2 Unsupervised Learning: K-Means Clustering</h3>
            <p className={styles.paragraph}>
              K-means clustering was applied to the 15-dimensional PCA-reduced feature space
              to discover natural groupings in retraction patterns.
            </p>

            <div className={styles.algorithmBox}>
              <div className={styles.algorithmTitle}>K-Means Configuration</div>
              <ul className={styles.algorithmSteps}>
                <li>
                  <strong>Cluster Testing:</strong> Evaluated k=3, k=4, and k=5 clusters using elbow method
                </li>
                <li>
                  <strong>Final Selection:</strong> Chose k=5 clusters based on cohesion and interpretability
                </li>
                <li>
                  <strong>Visualization:</strong> Plotted clusters in 2D PCA space with centroids marked
                </li>
              </ul>
            </div>

            <h3 className={styles.subsectionTitle}>6.3 Supervised Learning: Classification</h3>
            <p className={styles.paragraph}>
              Multiple classifiers were trained to predict the full Reason string using the 22 engineered features:
            </p>

            <div className={styles.methodCard}>
              <h4>Models Evaluated</h4>
              <ul className={styles.methodList}>
                <li><strong>Multinomial Naive Bayes:</strong> Baseline probabilistic classifier</li>
                <li><strong>Decision Tree:</strong> Interpretable tree-based model</li>
                <li><strong>Random Forest:</strong> Ensemble of 100 decision trees</li>
                <li><strong>Voting Classifier:</strong> Ensemble combining all three models</li>
              </ul>
              <p className={styles.paragraph} style={{ marginTop: '12px', marginBottom: '0' }}>
                <strong>Protocol:</strong> 80/20 train-test split with <code className={styles.inlineCode}>random_state=42</code> for reproducibility.
              </p>
            </div>
          </section>

          {/* Results */}
          <section id="results" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7</span>
              Results & Analysis
            </h2>

            <h3 className={styles.subsectionTitle}>7.1 Classification Performance</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <caption>Table 2: Model Performance Comparison (20% test split)</caption>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Accuracy</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Multinomial Naive Bayes</td>
                    <td>46.2%</td>
                    <td>Baseline, assumes feature independence</td>
                  </tr>
                  <tr>
                    <td>Decision Tree</td>
                    <td>64.4%</td>
                    <td>Prone to overfitting</td>
                  </tr>
                  <tr className={styles.highlightRow}>
                    <td><strong>Random Forest</strong></td>
                    <td><strong>64.5%</strong></td>
                    <td>Best single model (100 trees)</td>
                  </tr>
                  <tr>
                    <td>Voting Classifier</td>
                    <td>~64%</td>
                    <td>Ensemble of all three</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className={styles.paragraph}>
              The 64.5% accuracy, while not exceptional, is notable given the <strong>28,759 unique class labels</strong> in the target variable.
              The multi-label nature of retraction reasons (papers often have 3-10 reasons) makes exact string matching classification inherently difficult.
            </p>

            <h3 className={styles.subsectionTitle}>7.2 Publisher Analysis</h3>
            <figure className={styles.figure}>
              <img
                src="/assets/research/paper-retraction/publisher.png"
                alt="Publisher analysis showing retraction counts and cumulative percentage"
                className={styles.figureImage}
                onClick={() => openLightbox("/assets/research/paper-retraction/publisher.png", "Figure 1: Publisher Analysis - Top 10 publishers by retraction count with cumulative percentage")}
              />
              <figcaption className={styles.figureCaption}>
                <strong>Figure 1:</strong> Publisher Analysis — Top 10 publishers by retraction count with cumulative percentage.
                A small number of major publishers account for a disproportionate share of retractions.
              </figcaption>
            </figure>

            <h3 className={styles.subsectionTitle}>7.3 Retraction Reason Distribution</h3>
            <figure className={styles.figure}>
              <img
                src="/assets/research/paper-retraction/reason.png"
                alt="Retraction reasons percentage distribution"
                className={styles.figureImage}
                onClick={() => openLightbox("/assets/research/paper-retraction/reason.png", "Figure 2: Retraction Reasons Distribution - Top 30 reasons with cumulative percentage")}
              />
              <figcaption className={styles.figureCaption}>
                <strong>Figure 2:</strong> Retraction Reason Distribution — Top 30 individual reasons with cumulative percentage.
                "Investigation by Journal/Publisher" and "Unreliable Results" dominate the distribution.
              </figcaption>
            </figure>

            <h3 className={styles.subsectionTitle}>7.4 K-Means Clustering</h3>
            <figure className={styles.figure}>
              <img
                src="/assets/research/paper-retraction/kmean.png"
                alt="K-means clustering visualization"
                className={styles.figureImage}
                onClick={() => openLightbox("/assets/research/paper-retraction/kmean.png", "Figure 3: K-Means Clustering (k=5) showing distinct retraction pattern groups")}
              />
              <figcaption className={styles.figureCaption}>
                <strong>Figure 3:</strong> K-Means Clustering (k=5) — Visualization of the first two principal components.
                Red X markers indicate cluster centroids. Clear separation suggests distinct retraction archetypes.
              </figcaption>
            </figure>

            <h3 className={styles.subsectionTitle}>7.5 Key Metrics Summary</h3>
            <div className={styles.findingsGrid}>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>35,215</span>
                <span className={styles.findingLabel}>Papers Analyzed</span>
              </div>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>64.5%</span>
                <span className={styles.findingLabel}>Best Accuracy</span>
              </div>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>22</span>
                <span className={styles.findingLabel}>Engineered Features</span>
              </div>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>5</span>
                <span className={styles.findingLabel}>Distinct Clusters</span>
              </div>
            </div>
          </section>

          {/* Discussion */}
          <section id="discussion" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8</span>
              Discussion
            </h2>
            <p className={styles.paragraph}>
              The analysis reveals both the potential and limitations of NLP-based approaches for understanding
              paper retractions. The clustering results show clear patterns exist in the data, while the
              classification accuracy highlights the inherent complexity of multi-label prediction.
            </p>

            <h3 className={styles.subsectionTitle}>Why 64.5% Accuracy is Meaningful</h3>
            <p className={styles.paragraph}>
              While 64.5% may seem modest, context matters:
            </p>
            <ul className={styles.methodList}>
              <li>The target variable has <strong>28,759 unique values</strong> — random guessing would yield &lt;0.01% accuracy</li>
              <li>Papers have multiple overlapping reasons; exact string matching penalizes partial correctness</li>
              <li>The model successfully learns from 22 binary features without access to full text content</li>
              <li>A reformulation as multi-label classification would likely show improved metrics</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Limitations</h3>
            <ul className={styles.limitationList}>
              <li><strong>Single-label formulation:</strong> Treating multi-reason retractions as single labels hurts classification</li>
              <li><strong>Missing data:</strong> 70% of Notes column was empty, limiting text feature effectiveness</li>
              <li><strong>English-only:</strong> Dataset limited to English-language publications</li>
              <li><strong>Temporal bias:</strong> Reporting standards have evolved; older data may be inconsistent</li>
              <li><strong>No deep learning:</strong> Transformer-based models could capture richer semantic patterns</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>9</span>
              Conclusion
            </h2>
            <p className={styles.paragraph}>
              This analysis demonstrates both the viability and challenges of NLP techniques for understanding
              paper retractions. Through extensive data preparation and feature engineering, we transformed
              a messy, real-world dataset into a structured format suitable for machine learning analysis.
            </p>
            <p className={styles.paragraph}>
              Key contributions include:
            </p>
            <ul className={styles.methodList}>
              <li>A systematic approach to handling multi-label retraction reasons through binary feature engineering</li>
              <li>Demonstration that simple ML models can achieve meaningful accuracy on extremely high-cardinality classification tasks</li>
              <li>Identification of 5 distinct retraction archetypes through unsupervised clustering</li>
              <li>Visualization of publisher and reason distributions revealing concentration patterns</li>
            </ul>
            <p className={styles.paragraph}>
              <strong>Future Work:</strong> Reformulating as multi-label classification, incorporating transformer-based
              text embeddings (BERT, SciBERT), expanding to multilingual corpora, and developing real-time
              screening tools for editorial systems.
            </p>
          </section>
        </main>
      </div>

      {/* Lightbox Modal */}
      {lightbox.open && createPortal(
        <div className={styles.lightboxOverlay} onClick={closeLightbox}>
          <button className={styles.lightboxClose} onClick={closeLightbox}>&times;</button>
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            <img src={lightbox.src} alt={lightbox.caption} className={styles.lightboxImage} />
            {lightbox.caption && <p className={styles.lightboxCaption}>{lightbox.caption}</p>}
          </div>
        </div>,
        document.body
      )}
    </Container>
  );
}

export default PaperRetractionAnalysis;
