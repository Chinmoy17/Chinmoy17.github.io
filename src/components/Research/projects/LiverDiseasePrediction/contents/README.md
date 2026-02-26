# Liver Disease Prediction Using Machine Learning

This project aims to predict liver disease using machine learning models. The dataset consists of various biochemical and demographic attributes of patients. Several models, including Random Forest, K-Nearest Neighbors (KNN), Naive Bayes, and Decision Tree, have been implemented to evaluate and compare prediction accuracy.

## Features and Labels
- **Features**: Includes attributes like age, gender, bilirubin levels, enzyme levels, and protein concentrations.
- **Target Label**: `Result` (1: Presence of liver disease, 2: No liver disease)

## Project Goals
1. Preprocess the dataset to handle missing values and encode categorical data.
2. Train multiple machine learning models for liver disease classification.
3. Evaluate model performance using accuracy and classification reports.

## Dataset Description

The dataset contains 11 columns:
1. **Age of the patient**: Numeric
2. **Gender of the patient**: Categorical (encoded as 0 and 1)
3. **Total Bilirubin**: Numeric
4. **Direct Bilirubin**: Numeric
5. **Alkaline_Phosphotase**: Numeric
6. **Sgpt Alamine Aminotransferase**: Numeric
7. **Sgot Aspartate Aminotransferase**: Numeric
8. **Total Protiens**: Numeric
9. **ALB Albumin**: Numeric
10. **A/G Ratio Albumin and Globulin Ratio**: Numeric
11. **Result**: Target label (1: Liver disease, 2: No liver disease)

## Dataset Preprocessing

To ensure the dataset is ready for model training:
- Missing values were filled with median values for numerical features.
- Gender column was label-encoded to convert categorical data into numeric form.
- Irrelevant or corrupted rows were dropped.

## Preprocessing Code

The preprocessing steps were implemented as follows:

1. **Handling Missing Values**:
   - Columns like `Total Bilirubin`, `Direct Bilirubin`, and others were filled with their median values.
   - Rows with critical missing values were removed.
   
2. **Label Encoding**:
   - The `Gender of the patient` column was encoded as:
     - `0`: Female
     - `1`: Male

3. **Renaming Columns**:
   - Renamed long or inconsistent column names for better readability.

4. **Exporting Preprocessed Data**:
   - The cleaned dataset was saved to `processed_data.csv`.

For detailed preprocessing code, refer to the `preprocessing_code.py` file in the repository.

## Models Implemented

Four models were trained and evaluated on the preprocessed dataset:

1. **Random Forest Classifier**
   - Achieved an accuracy of **95.37%**.
   - Used `max_depth=8` for regularization.

2. **K-Nearest Neighbors (KNN)**
   - Achieved an accuracy of **96.89%**.
   - Used `n_neighbors=5`.

3. **Naive Bayes with Bagging**
   - Achieved an accuracy of **56.78%**.
   - Struggled to generalize due to feature dependencies.

4. **Decision Tree Classifier**
   - Achieved the highest accuracy of **99.47%**.

## Evaluation Metrics
Each model was evaluated using:
- **Accuracy Score**
- **Classification Report**
  - Precision, Recall, F1-score

## How to Use the Project

### Prerequisites
- Python 3.8 or above
- Libraries: `pandas`, `numpy`, `scikit-learn`, `matplotlib`, `seaborn`

### Steps to Run
1. Clone the repository:
   git clone https://github.com/yourusername/liver-disease-prediction.git
|-- preprocessing_code.py    # Code for data preprocessing
|-- model_training.py        # Code for training and evaluating models
|-- processed_data.csv       # Preprocessed dataset
|-- README.md                # Project documentation


---

### **Cell 6: Results and Conclusion**


## Results

| Model               | Accuracy  | Precision | Recall | F1-score |
|---------------------|-----------|-----------|--------|----------|
| Random Forest       | 95.37%    | 0.96      | 0.92   | 0.94     |
| K-Nearest Neighbors | 96.89%    | 0.97      | 0.96   | 0.96     |
| Naive Bayes         | 56.78%    | 0.80      | 0.57   | 0.57     |
| Decision Tree       | 99.47%    | 0.99      | 0.99   | 0.99     |

## Conclusion
The Decision Tree model performed the best with a **99.47% accuracy**, demonstrating its effectiveness for this dataset. Further improvement can be explored by tuning hyperparameters or using ensemble techniques.

