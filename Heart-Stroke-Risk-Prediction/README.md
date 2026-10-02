# ❤️ Heart Stroke Risk Prediction

A Machine Learning web application that predicts the risk of heart disease based on patient medical information.

The project includes a complete machine learning workflow, from data preprocessing and feature selection to model training, evaluation, Pipeline-based preprocessing, model saving, and deployment with Streamlit.

---

## 🌐 Live Demo

**[Open the Live Application](https://ayyan-heart-stroke-prediction.streamlit.app/)**

---

## 📌 Project Overview

This project uses patient medical information to predict whether a person is at risk of heart disease.

The trained machine learning model is integrated into a Streamlit frontend where users can enter patient information and receive a prediction through an interactive interface.

The final application uses an **SVM-based Scikit-learn Pipeline** that combines preprocessing and prediction into a single workflow.

---

## ✨ Features

- ❤️ Heart disease risk prediction
- 🖥️ Interactive Streamlit frontend
- 🌙 Dark/premium UI
- 📱 Responsive interface for mobile and desktop
- 📊 Multiple machine learning models tested
- 🔍 Feature selection using Mutual Information and Chi-Square
- ⚙️ Numerical feature scaling using `StandardScaler`
- 🔗 Scikit-learn Pipeline for preprocessing and model prediction
- 💾 Saved trained SVM Pipeline and feature columns
- 🚀 Deployed using Streamlit Community Cloud

---

## 🧠 Machine Learning Workflow

The project follows these main steps:

```text
Dataset
   ↓
Data Preprocessing
   ↓
Feature Encoding
   ↓
Feature Selection
   ↓
Train / Test Split
   ↓
Pipeline Construction
   ↓
StandardScaler
   ↓
SVM Model
   ↓
Model Evaluation
   ↓
Model Selection
   ↓
Pipeline Saving
   ↓
Streamlit Frontend
   ↓
Deployment
```

## 🔍 Feature Selection

Two feature-selection techniques were used:

**Mutual Information**

Mutual Information was used to measure the relationship between individual features and the target variable.

**Chi-Square Test**

The Chi-Square test was used to evaluate the relationship between categorical features and the target.

Features were analyzed using both methods before building the final model.

## 🤖 Models Tested

The following classification models were evaluated:

- Logistic Regression
- K-Nearest Neighbors (KNN)
- Gaussian Naive Bayes
- Decision Tree
- Support Vector Machine (SVM)
- Random Forest

The models were compared using:

- Accuracy
- Precision
- Recall
- F1 Score

## 📊 Model Evaluation

| Model | Accuracy | Precision | Recall | F1 Score |
|---|---|---|---|---|
| Logistic Regression | 0.861386 | 0.925926 | 0.833333 | 0.877193 |
| KNN | 0.851485 | 0.909091 | 0.833333 | 0.869565 |
| Gaussian Naive Bayes | 0.854785 | 0.909639 | 0.838889 | 0.872832 |
| Decision Tree | 0.831683 | 0.895706 | 0.811111 | 0.851312 |
| SVM | 0.867987 | 0.916667 | 0.855556 | 0.885057 |
| Random Forest | 0.864686 | 0.916168 | 0.850000 | 0.881844 |

## 🏆 Selected Model

Based on the evaluation results, SVM achieved the highest F1 Score and Accuracy among the tested models.

Therefore, SVM was selected as the final model for the deployed application.

For deployment, the SVM model was integrated into a Scikit-learn Pipeline with the required preprocessing steps.

## 🔗 SVM Pipeline

The final deployed model uses a Pipeline that combines preprocessing and the SVM classifier into a single object.

Conceptually:

```text
Raw User Input
      ↓
Preprocessing
      ↓
StandardScaler
      ↓
SVM
      ↓
Prediction
```

This allows the frontend to send the raw feature values directly to the saved Pipeline without manually applying the scaler.

The Pipeline also keeps preprocessing and prediction together, making the deployment workflow simpler and more consistent.

## 💾 Model Persistence

The trained SVM Pipeline was saved using Joblib.

The saved Pipeline contains the preprocessing and trained SVM model required for prediction.

The frontend loads the saved Pipeline using:

```python
model = joblib.load("pickles/svm_pipeline.pkl")
```

The feature columns are loaded separately using:

```python
expected_columns = joblib.load("pickles/columns.pkl")
```

The frontend then passes the prepared input data directly to the Pipeline:

```python
prediction = model.predict(input_df)[0]
```

## 🛠️ Technologies Used

- Python
- NumPy
- Pandas
- Scikit-learn
- Joblib
- Streamlit
- Git & GitHub
- Streamlit Community Cloud

## 📂 Project Structure

```text
heart-disease-prediction/
│
├── app.py
├── requirements.txt
├── README.md
│
└── pickles/
    ├── svm_pipeline.pkl
    └── columns.pkl
```

## ⚙️ Local Setup

Clone the repository:

```bash
git clone https://github.com/code-with-ayyan/Heart-Stroke-Risk-Prediction.git
cd Heart-Stroke-Risk-Prediction
```

Install the required dependencies:

```bash
pip install -r requirements.txt
```

Run the Streamlit application:

```bash
streamlit run app.py
```

The application will be available locally at:

```text
http://localhost:8501
```

## 🐞 Troubleshooting

### `AttributeError: module 'sklearn.compose._column_transformer' has no attribute '_RemainderColsList'`

This error means the scikit-learn version used to **train and pickle** the model doesn't match the scikit-learn version currently **installed** in your environment. The saved `svm_pipeline.pkl` was created with scikit-learn **1.6.1**; loading it with a newer version (e.g. 1.8.0) can fail because internal `ColumnTransformer` classes changed between releases. Pickle files reference these internal paths directly, so scikit-learn does not guarantee cross-version compatibility for pickled objects.

**Fix — pin the matching scikit-learn version:**

```bash
pip install scikit-learn==1.6.1
```

**Note on Python version:** scikit-learn 1.6.1 does not yet ship pre-built wheels for very new Python releases (e.g. Python 3.14). If `pip install` tries to build from source and hangs or fails, use an older, well-supported Python version (3.11 or 3.12) for this project's virtual environment instead:

```bash
python3.11 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

**Longer-term fix:** retrain the model and re-save the pickle files (`svm_pipeline.pkl`, `columns.pkl`, `scalar.pkl`, `columns_to_scale.pkl`) using the scikit-learn version you intend to deploy with, so the pinned-version workaround is no longer needed.

To avoid this issue for anyone else running the project, pin the exact scikit-learn version in `requirements.txt`:

```text
scikit-learn==1.6.1
```

## 🚀 Deployment

The application is deployed using Streamlit Community Cloud.

The GitHub repository is connected to the deployed application, allowing changes pushed to the repository to trigger a new deployment automatically.

## ⚠️ Disclaimer

This application is an educational machine learning project and should not be used as a medical diagnostic tool.

The prediction is generated by a machine learning model and should not replace professional medical advice or evaluation.

## 👨‍💻 Author

**Ayyan**

Machine Learning Project — Heart Disease Prediction

## 🔗 Live Application

[ayyan-heart-stroke-prediction.streamlit.app](https://ayyan-heart-stroke-prediction.streamlit.app/)