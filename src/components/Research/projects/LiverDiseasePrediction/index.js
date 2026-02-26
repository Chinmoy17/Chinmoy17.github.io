import React, { useState, useEffect } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { createPortal } from "react-dom";
import Particle from "../../../Particle";
import styles from "./LiverDiseasePrediction.module.css";

/**
 * Liver Disease Prediction - Academic Paper Style Component
 * Comparative analysis of machine learning models for liver disease diagnosis
 */

const sections = [
  { id: "abstract", title: "Abstract", number: "0" },
  { id: "introduction", title: "Introduction", number: "1" },
  { id: "research-questions", title: "Research Questions", number: "2" },
  { id: "dataset", title: "Dataset & Features", number: "3" },
  { id: "data-preparation", title: "Data Preparation", number: "4" },
  { id: "methodology", title: "Methodology", number: "5" },
  { id: "results", title: "Results & Analysis", number: "6" },
  { id: "discussion", title: "Discussion", number: "7" },
  { id: "conclusion", title: "Conclusion", number: "8" },
];

function LiverDiseasePrediction() {
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
                <span className={styles.metaLabel}>Models Compared</span>
                <span className={styles.metaValue}>4 algorithms</span>
              </div>
            </div>

            <a
              href="https://github.com/Chinmoy17/Liver-Disease-Prediction-With-Machine-Learning"
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
          {/* Paper Header */}
          <header className={styles.paperHeader}>
            <h1 className={styles.paperTitle}>
              Liver Disease Prediction Using Machine Learning: A Comparative Analysis
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
              {["Machine Learning", "Classification", "Healthcare", "Random Forest", "KNN", "Decision Tree", "Naive Bayes"].map((kw) => (
                <span key={kw} className={styles.keyword}>{kw}</span>
              ))}
            </div>
          </header>

          {/* Abstract */}
          <section id="abstract" className={styles.section}>
            <div className={styles.abstractBox}>
              <h2 className={styles.abstractTitle}>Abstract</h2>
              <p className={styles.abstractText}>
                Liver disease is a significant global health concern, requiring early and accurate diagnosis
                for effective treatment. This study presents a comprehensive comparative analysis of machine learning
                algorithms for predicting liver disease from patient biochemical and demographic data.
                We evaluate four classification models—Random Forest, K-Nearest Neighbors (KNN), Naive Bayes with Bagging,
                and Decision Tree—on a dataset containing 11 clinical features. After preprocessing to handle missing
                values and encode categorical data, models were trained and evaluated using accuracy, precision, recall,
                and F1-score metrics. <strong>Decision Tree achieved the highest performance with 99.47% accuracy</strong>,
                outperforming Random Forest (95.37%), KNN (96.89%), and Naive Bayes (56.78%). The results demonstrate
                the effectiveness of tree-based approaches for this classification task and highlight the importance
                of model selection in medical diagnostic applications.
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
              Liver disease encompasses a range of conditions affecting liver function, including cirrhosis,
              hepatitis, and fatty liver disease. Early detection is critical for patient outcomes, as liver
              damage is often irreversible in advanced stages. Traditional diagnostic approaches rely on
              clinical observation and laboratory tests, but machine learning offers the potential to
              improve diagnostic accuracy and speed.
            </p>
            <p className={styles.paragraph}>
              The goal of this project is to develop and compare machine learning models capable of predicting
              liver disease presence from biochemical markers and patient demographics. The dataset includes
              standard liver function tests (bilirubin levels, enzymes, protein concentrations) along with
              basic patient information. By systematically comparing multiple algorithms, we identify which
              approaches are most suitable for this binary classification task.
            </p>
            <p className={styles.paragraph}>
              This work focuses on practical implementation: preprocessing messy real-world data, handling
              missing values, training multiple models, and rigorously evaluating their performance. The results
              provide insights into model selection for healthcare applications where prediction accuracy directly
              impacts patient care decisions.
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
                <p className={styles.rqText}>Which machine learning algorithm performs best for liver disease prediction?</p>
                <p className={styles.rqRationale}>
                  Comparing multiple classification approaches helps identify the most accurate and reliable
                  model for clinical deployment.
                </p>
              </div>
            </div>

            <div className={styles.researchQuestion}>
              <span className={styles.rqBadge}>RQ2</span>
              <div>
                <p className={styles.rqText}>How do different preprocessing strategies affect model performance?</p>
                <p className={styles.rqRationale}>
                  Healthcare data often contains missing values and inconsistencies. Understanding the impact
                  of preprocessing decisions is crucial for robust model development.
                </p>
              </div>
            </div>

            <div className={styles.researchQuestion}>
              <span className={styles.rqBadge}>RQ3</span>
              <div>
                <p className={styles.rqText}>What evaluation metrics best capture model suitability for medical diagnosis?</p>
                <p className={styles.rqRationale}>
                  Beyond accuracy, metrics like precision and recall have different implications for
                  false positive/negative trade-offs in healthcare contexts.
                </p>
              </div>
            </div>
          </section>

          {/* Dataset & Features */}
          <section id="dataset" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>3</span>
              Dataset & Features
            </h2>

            <p className={styles.paragraph}>
              The dataset contains patient records with 11 columns representing biochemical and demographic attributes.
              The target variable <code className={styles.inlineCode}>Result</code> indicates liver disease presence (1) or absence (2).
            </p>

            <h3 className={styles.subsectionTitle}>3.1 Feature Description</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <caption>Table 1: Dataset Feature Schema</caption>
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Type</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td>Age</td><td>Numeric</td><td>Patient age in years</td></tr>
                  <tr><td>Gender</td><td>Categorical</td><td>Patient gender (encoded 0=Female, 1=Male)</td></tr>
                  <tr><td>Total Bilirubin</td><td>Numeric</td><td>Total bilirubin concentration (mg/dL)</td></tr>
                  <tr><td>Direct Bilirubin</td><td>Numeric</td><td>Direct bilirubin concentration (mg/dL)</td></tr>
                  <tr><td>Alkaline Phosphotase</td><td>Numeric</td><td>Alkaline phosphatase enzyme level (IU/L)</td></tr>
                  <tr><td>Sgpt Alamine Aminotransferase</td><td>Numeric</td><td>ALT enzyme level (IU/L)</td></tr>
                  <tr><td>Sgot Aspartate Aminotransferase</td><td>Numeric</td><td>AST enzyme level (IU/L)</td></tr>
                  <tr><td>Total Proteins</td><td>Numeric</td><td>Total protein concentration (g/dL)</td></tr>
                  <tr><td>ALB Albumin</td><td>Numeric</td><td>Albumin concentration (g/dL)</td></tr>
                  <tr><td>A/G Ratio</td><td>Numeric</td><td>Albumin-to-Globulin ratio</td></tr>
                  <tr className={styles.highlightRow}><td><strong>Result (Target)</strong></td><td>Binary</td><td>1 = Liver disease, 2 = No liver disease</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className={styles.subsectionTitle}>3.2 Data Challenges</h3>
            <p className={styles.paragraph}>
              The raw dataset presented several challenges requiring preprocessing:
            </p>
            <ul className={styles.methodList}>
              <li><strong>Missing Values:</strong> Multiple columns contained missing entries requiring imputation strategies</li>
              <li><strong>Categorical Encoding:</strong> Gender required label encoding for model compatibility</li>
              <li><strong>Inconsistent Naming:</strong> Column names needed standardization for clarity</li>
              <li><strong>Corrupted Records:</strong> Some rows had critical missing data and were removed</li>
            </ul>
          </section>

          {/* Data Preparation */}
          <section id="data-preparation" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>4</span>
              Data Preparation
            </h2>

            <p className={styles.paragraph}>
              Systematic preprocessing was essential to prepare the dataset for model training. The following
              pipeline was implemented to ensure data quality and consistency.
            </p>

            <h3 className={styles.subsectionTitle}>4.1 Preprocessing Pipeline</h3>

            <div className={styles.pipelineBox}>
              <div className={styles.pipelineSteps}>
                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>1</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Missing Value Imputation</div>
                    <div className={styles.pipelineStepDesc}>
                      Numerical features filled with column-wise median values to maintain robustness against outliers
                      in laboratory data. Applied to bilirubin levels, enzyme concentrations, and protein measurements.
                    </div>
                  </div>
                </div>

                <div className={styles.pipelineArrow}>↓</div>

                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>2</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Categorical Encoding</div>
                    <div className={styles.pipelineStepDesc}>
                      Gender feature transformed using label encoding (Female = 0, Male = 1) to convert categorical
                      string values into numerical format compatible with machine learning algorithms.
                    </div>
                  </div>
                </div>

                <div className={styles.pipelineArrow}>↓</div>

                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>3</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Column Standardization</div>
                    <div className={styles.pipelineStepDesc}>
                      Renamed lengthy column names (e.g., "Sgpt Alamine Aminotransferase" → "ALT") for improved
                      code readability and maintainability throughout the analysis workflow.
                    </div>
                  </div>
                </div>

                <div className={styles.pipelineArrow}>↓</div>

                <div className={styles.pipelineStep}>
                  <div className={styles.pipelineIcon}>4</div>
                  <div className={styles.pipelineContent}>
                    <div className={styles.pipelineStepTitle}>Data Validation & Export</div>
                    <div className={styles.pipelineStepDesc}>
                      Removed rows with critical missing target values that could not be reliably imputed.
                      Exported clean dataset to <code className={styles.inlineCode}>processed_data.csv</code> for reproducibility.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className={styles.subsectionTitle}>4.2 Implementation Rationale</h3>
            <p className={styles.paragraph}>
              <strong>Median imputation</strong> was chosen over mean imputation because biomedical data often contains
              extreme outliers due to measurement errors or rare pathological conditions. The median provides a more
              robust central tendency estimate that better represents typical patient values.
            </p>
            <p className={styles.paragraph}>
              <strong>Label encoding</strong> was sufficient for the binary gender feature. For datasets with
              multiple categorical features or non-binary categories, one-hot encoding would be more appropriate
              to avoid introducing artificial ordinality.
            </p>
          </section>

          {/* Methodology */}
          <section id="methodology" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>5</span>
              Methodology
            </h2>

            <p className={styles.paragraph}>
              Four machine learning algorithms were selected for comparison, representing different
              classification paradigms: ensemble learning, instance-based learning, probabilistic methods,
              and tree-based approaches.
            </p>

            <h3 className={styles.subsectionTitle}>5.1 Experimental Setup</h3>

            <div className={styles.algorithmBox}>
              <div className={styles.algorithmTitle}>Data Splitting Protocol</div>
              <ul className={styles.algorithmSteps}>
                <li>
                  <strong>Train-Test Split:</strong> Dataset partitioned using 80/20 ratio with random state
                  fixed at 42 for reproducibility
                </li>
                <li>
                  <strong>Stratification:</strong> Class distribution maintained in both splits to prevent
                  training bias from imbalanced samples
                </li>
                <li>
                  <strong>Features (X):</strong> All 10 input features (age, gender, biochemical markers)
                </li>
                <li>
                  <strong>Target (y):</strong> Binary outcome variable (liver disease presence/absence)
                </li>
              </ul>
            </div>

            <h3 className={styles.subsectionTitle}>5.2 Classification Models</h3>

            <div className={styles.methodCard}>
              <h4>Model 1: Random Forest Classifier</h4>
              <p>
                <strong>Paradigm:</strong> Ensemble learning through bootstrap aggregation<br/>
                <strong>Configuration:</strong> Maximum tree depth limited to 8 levels to prevent overfitting<br/>
                <strong>Rationale:</strong> Combines multiple decision trees to reduce variance and improve generalization
              </p>
            </div>

            <div className={styles.methodCard}>
              <h4>Model 2: K-Nearest Neighbors (KNN)</h4>
              <p>
                <strong>Paradigm:</strong> Instance-based lazy learning<br/>
                <strong>Configuration:</strong> K=5 neighbors with majority voting classification<br/>
                <strong>Rationale:</strong> Non-parametric approach assuming similar patients have similar outcomes
              </p>
            </div>

            <div className={styles.methodCard}>
              <h4>Model 3: Naive Bayes with Bagging</h4>
              <p>
                <strong>Paradigm:</strong> Probabilistic classification with ensemble stabilization<br/>
                <strong>Configuration:</strong> Gaussian NB with 10 bootstrap estimators<br/>
                <strong>Rationale:</strong> Fast probabilistic model with bagging to compensate for feature dependence violations
              </p>
            </div>

            <div className={styles.methodCard}>
              <h4>Model 4: Decision Tree Classifier</h4>
              <p>
                <strong>Paradigm:</strong> Tree-based hierarchical decision learning<br/>
                <strong>Configuration:</strong> Unrestricted depth to capture complex decision boundaries<br/>
                <strong>Rationale:</strong> Mirrors clinical diagnostic logic with sequential feature-based decisions
              </p>
            </div>

            <h3 className={styles.subsectionTitle}>5.3 Evaluation Metrics</h3>
            <p className={styles.paragraph}>
              Each model was evaluated using multiple metrics to comprehensively assess performance:
            </p>
            <ul className={styles.methodList}>
              <li><strong>Accuracy:</strong> Overall correctness (correct predictions / total predictions)</li>
              <li><strong>Precision:</strong> Of predicted positives, how many were correct (minimizes false positives)</li>
              <li><strong>Recall:</strong> Of actual positives, how many were detected (minimizes false negatives)</li>
              <li><strong>F1-Score:</strong> Harmonic mean of precision and recall (balanced metric)</li>
            </ul>
          </section>

          {/* Results */}
          <section id="results" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>6</span>
              Results & Analysis
            </h2>

            <h3 className={styles.subsectionTitle}>6.1 Model Performance Comparison</h3>
            <div className={styles.tableWrapper}>
              <table className={styles.dataTable}>
                <caption>Table 2: Classification Performance on Test Set</caption>
                <thead>
                  <tr>
                    <th>Model</th>
                    <th>Accuracy</th>
                    <th>Precision</th>
                    <th>Recall</th>
                    <th>F1-Score</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Random Forest</td>
                    <td>95.37%</td>
                    <td>0.96</td>
                    <td>0.92</td>
                    <td>0.94</td>
                  </tr>
                  <tr>
                    <td>K-Nearest Neighbors</td>
                    <td>96.89%</td>
                    <td>0.97</td>
                    <td>0.96</td>
                    <td>0.96</td>
                  </tr>
                  <tr>
                    <td>Naive Bayes (Bagging)</td>
                    <td>56.78%</td>
                    <td>0.80</td>
                    <td>0.57</td>
                    <td>0.57</td>
                  </tr>
                  <tr className={styles.highlightRow}>
                    <td><strong>Decision Tree</strong></td>
                    <td><strong>99.47%</strong></td>
                    <td><strong>0.99</strong></td>
                    <td><strong>0.99</strong></td>
                    <td><strong>0.99</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className={styles.subsectionTitle}>6.2 Key Findings Summary</h3>
            <div className={styles.findingsGrid}>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>99.47%</span>
                <span className={styles.findingLabel}>Best Accuracy (Decision Tree)</span>
              </div>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>4</span>
                <span className={styles.findingLabel}>Models Compared</span>
              </div>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>11</span>
                <span className={styles.findingLabel}>Clinical Features</span>
              </div>
              <div className={styles.findingCard}>
                <span className={styles.findingValue}>0.99</span>
                <span className={styles.findingLabel}>Best F1-Score</span>
              </div>
            </div>

            <h3 className={styles.subsectionTitle}>6.3 Analysis</h3>
            <p className={styles.paragraph}>
              <strong>Decision Tree</strong> significantly outperforms all other models with 99.47% accuracy
              and near-perfect precision/recall. This suggests the feature space contains clear decision boundaries
              that a tree structure can effectively capture.
            </p>
            <p className={styles.paragraph}>
              <strong>KNN</strong> achieves strong performance (96.89%) as a non-parametric approach, indicating
              that similar patients (in feature space) tend to have similar outcomes. The local decision boundaries
              work well for this dataset.
            </p>
            <p className={styles.paragraph}>
              <strong>Random Forest</strong> performs respectably (95.37%) but does not surpass the single Decision Tree,
              suggesting that ensemble averaging may introduce unnecessary complexity or that the optimal tree depth
              constraint (max_depth=8) limits expressiveness.
            </p>
            <p className={styles.paragraph}>
              <strong>Naive Bayes</strong> underperforms significantly (56.78%), likely due to the strong conditional
              dependencies between biochemical features (e.g., bilirubin levels and enzyme concentrations are correlated).
              The Naive Bayes independence assumption is violated, degrading performance.
            </p>
          </section>

          {/* Discussion */}
          <section id="discussion" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>7</span>
              Discussion
            </h2>

            <h3 className={styles.subsectionTitle}>Why Decision Tree Excels</h3>
            <p className={styles.paragraph}>
              The Decision Tree's superior performance can be attributed to several factors:
            </p>
            <ul className={styles.methodList}>
              <li><strong>Hierarchical Decision Logic:</strong> Liver disease diagnosis follows a hierarchical process
                (e.g., first check bilirubin, then enzymes, then proteins). Decision trees naturally mirror this structure.</li>
              <li><strong>Non-Linear Boundaries:</strong> The model captures complex interactions between features without
                assuming linear separability.</li>
              <li><strong>Feature Interactions:</strong> Trees can model interactions naturally (e.g., high bilirubin
                combined with low albumin), which simpler models struggle with.</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Implications for Clinical Use</h3>
            <p className={styles.paragraph}>
              The 99.47% accuracy suggests this model could serve as a reliable screening tool in clinical settings.
              High precision (0.99) minimizes false positives, reducing unnecessary follow-up tests. High recall (0.99)
              minimizes false negatives, ensuring most patients with liver disease are correctly identified.
            </p>

            <h3 className={styles.subsectionTitle}>Limitations</h3>
            <ul className={styles.limitationList}>
              <li><strong>Overfitting Risk:</strong> Unrestricted decision tree depth may lead to overfitting on training data.
                Cross-validation should confirm generalization to unseen patients.</li>
              <li><strong>Dataset Size:</strong> The dataset size and class distribution were not specified. Performance
                may vary with larger or more diverse patient populations.</li>
              <li><strong>Feature Engineering:</strong> Additional derived features (e.g., ratios, polynomial terms) could
                further improve model performance.</li>
              <li><strong>Interpretability vs. Complexity:</strong> While Decision Trees are interpretable, a very deep tree
                may be difficult for clinicians to validate or understand.</li>
              <li><strong>No External Validation:</strong> Results are based on a single train-test split. External validation
                on data from different hospitals/regions is needed to confirm robustness.</li>
            </ul>

            <h3 className={styles.subsectionTitle}>Future Work</h3>
            <p className={styles.paragraph}>
              Potential directions for improvement include:
            </p>
            <ul className={styles.methodList}>
              <li>Hyperparameter tuning (tree depth, min_samples_split) using GridSearchCV</li>
              <li>Feature importance analysis to identify the most predictive biomarkers</li>
              <li>Ensemble methods combining Decision Tree with other strong learners</li>
              <li>Cross-validation to ensure stability across different data splits</li>
              <li>Deployment as a real-time prediction API for clinical integration</li>
            </ul>
          </section>

          {/* Conclusion */}
          <section id="conclusion" className={styles.section}>
            <h2 className={styles.sectionTitle}>
              <span className={styles.sectionNumber}>8</span>
              Conclusion
            </h2>
            <p className={styles.paragraph}>
              This study demonstrates the effectiveness of machine learning for liver disease prediction from
              clinical laboratory data. By comparing four classification models—Random Forest, KNN, Naive Bayes,
              and Decision Tree—we identified Decision Tree as the optimal approach with 99.47% accuracy.
            </p>
            <p className={styles.paragraph}>
              Key contributions include:
            </p>
            <ul className={styles.methodList}>
              <li>A systematic preprocessing pipeline for handling missing values and categorical data in medical datasets</li>
              <li>Comprehensive evaluation of four classification paradigms using multiple performance metrics</li>
              <li>Evidence that tree-based models excel at capturing hierarchical clinical decision logic</li>
              <li>Identification of Naive Bayes limitations due to feature dependency violations</li>
            </ul>
            <p className={styles.paragraph}>
              The results suggest that Decision Tree classifiers are well-suited for liver disease diagnosis tasks,
              achieving near-perfect performance across all evaluation metrics. With proper validation and clinical
              integration, such models could serve as valuable screening tools to support early detection and
              improve patient outcomes.
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

export default LiverDiseasePrediction;
