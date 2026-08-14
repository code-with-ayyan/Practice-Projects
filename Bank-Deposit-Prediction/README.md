# 🏦 Bank Deposit Subscription Prediction

An end-to-end Machine Learning classification project that predicts whether a customer is likely to subscribe to a bank term deposit based on customer and campaign information.

The project compares multiple classification algorithms, evaluates their performance using standard classification metrics, and deploys the best-performing Random Forest model through an interactive Streamlit web application.

## 🚀 Live Demo

🔗 **Live Application:**

https://ayyan-bank-deposit-prediction.streamlit.app/

## 📌 Project Overview

This project demonstrates a complete Machine Learning workflow for predicting customer subscription to a bank term deposit campaign.

The model uses customer information and marketing campaign details such as:

- Age
- Job
- Marital Status
- Education
- Account Balance
- Credit Default Status
- Housing Loan
- Personal Loan
- Contact Type
- Contact Day
- Contact Month
- Contact Duration
- Campaign Contacts
- Previous Contact Information
- Previous Campaign Outcome

The target variable represents whether the customer subscribed to the bank's term deposit.

## 🤖 Models Compared

- Logistic Regression
- K-Nearest Neighbors
- Gaussian Naive Bayes
- Decision Tree
- Support Vector Machine
- Random Forest

## 📊 Model Performance

| Model | Accuracy | Precision | Recall | F1 Score |
| --- | ---: | ---: | ---: | ---: |
| Logistic Regression | 0.819761 | 0.784946 | 0.830042 | 0.806864 |
| KNN Classifier | 0.810803 | 0.759479 | 0.831475 | 0.793848 |
| Gaussian Naive Bayes | 0.705755 | 0.552915 | 0.768686 | 0.643186 |
| Decision Tree | 0.824647 | 0.844935 | 0.800536 | 0.822137 |
| SVM | 0.796688 | 0.780985 | 0.792193 | 0.786549 |
| **Random Forest** | **0.849349** | **0.877193** | **0.820975** | **0.848153** |

## 🏆 Best Model

The **Random Forest Classifier** achieved the best overall performance among the tested models.

- **Accuracy:** 84.93%
- **Precision:** 87.72%
- **Recall:** 82.10%
- **F1 Score:** 84.82%

Random Forest was selected as the final model for deployment.

## 🧠 Machine Learning Workflow

```text
Dataset
   ↓
Data Cleaning
   ↓
Exploratory Data Analysis
   ↓
Feature Engineering
   ↓
Categorical Encoding
   ↓
Train / Test Split
   ↓
Feature Scaling
   ↓
Model Training
   ↓
Model Evaluation
   ↓
Model Comparison
   ↓
Best Model Selection
   ↓
Model Serialization
   ↓
Streamlit Application
   ↓
Deployment
```

## 🖥️ Web Application

The trained Random Forest model was integrated into an interactive Streamlit application.

Users can enter customer and campaign information and receive an estimated subscription probability.

### Features

- Modern dark-themed interface
- Interactive customer input form
- Machine Learning prediction
- Subscription probability
- Probability-based prediction categories
- Responsive interface
- Random Forest classification
- Streamlit deployment

### Prediction Categories

| Probability | Category |
| --- | --- |
| 75% – 100% | Most Likely |
| 50% – 74.9% | Likely |
| 25% – 49.9% | Less Likely |
| 0% – 24.9% | Least Likely |

## 📂 Project Structure

```text
Bank-Deposit-Prediction/
│
├── pickles/
│   ├── model.pkl
│   ├── scalar.pkl
│   ├── required_columns.pkl
│   └── cols_to_scale.pkl
│
├── app.py
├── bank.ipynb
├── bank.csv
├── README.md
├── requirements.txt
└── .gitattributes
```

## 💾 Model Serialization

The trained Machine Learning model and preprocessing components are stored using Joblib.

```text
pickles/
├── model.pkl
├── scalar.pkl
├── required_columns.pkl
└── cols_to_scale.pkl
```

- `model.pkl` — trained Random Forest classification model
- `scalar.pkl` — fitted scaler
- `required_columns.pkl` — model input feature columns
- `cols_to_scale.pkl` — features requiring scaling

The large `model.pkl` file is managed using **Git Large File Storage (Git LFS)**.

## 📈 Evaluation Metrics

### Accuracy

Accuracy represents the percentage of total predictions that were correct.

### Precision

Precision measures how many customers predicted as subscribers actually subscribed.

### Recall

Recall measures how many actual subscribers were correctly identified by the model.

### F1 Score

F1 Score combines precision and recall into a single metric.

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/code-with-ayyan/Bank-Deposit-Prediction.git
```

Move into the project directory:

```bash
cd Bank-Deposit-Prediction
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Run the application:

```bash
streamlit run app.py
```

## 📦 Requirements

- Python
- NumPy
- Pandas
- Scikit-learn
- Joblib
- Streamlit

The complete dependency list is available in `requirements.txt`.

## 🌐 Deployment

The application is deployed using **Streamlit Community Cloud**.

🔗 **Live Application:**

https://ayyan-bank-deposit-prediction.streamlit.app/

## 📚 Learning Outcomes

This project helped in understanding:

- Classification problems
- Data preprocessing
- Exploratory Data Analysis
- Feature engineering
- Categorical encoding
- Feature scaling
- Train-test splitting
- Classification algorithms
- Model comparison
- Accuracy, precision, recall, and F1 score
- Random Forest Classification
- Model serialization
- Streamlit application development
- Machine Learning deployment

## ⚠️ Disclaimer

The prediction generated by this application is a Machine Learning estimate based on the provided customer and campaign information.

It should not be considered a guaranteed prediction of customer behavior or an official banking decision.

This project is intended for educational and demonstration purposes.

## 👨‍💻 Author

**Ayyan Ahmed**

Aspiring AI/ML Engineer | Python Developer

Focused on understanding Machine Learning algorithms from fundamentals and building practical end-to-end Machine Learning applications.

---

⭐ If you find this project useful or interesting, consider giving the repository a star.
