# 💳 Insurance Charges Prediction

A Machine Learning regression project that predicts estimated insurance charges based on customer information.

The project compares multiple regression algorithms and uses the best-performing model to build an interactive Streamlit web application.

## 🚀 Live Demo

🔗 **Live Application:**  
https://ayyan-insurance-charges-prediction.streamlit.app

## 📌 Project Overview

This project demonstrates an end-to-end Machine Learning workflow for insurance charges prediction.

The following customer information is used for prediction:

- Age
- Sex
- BMI
- Number of Children
- Smoking Status
- Region

Multiple regression algorithms were trained and evaluated to determine the best model for the prediction task.

The final model was integrated into a Streamlit frontend and deployed online.

## 🤖 Models Compared

- Linear Regression
- Decision Tree Regressor
- K-Nearest Neighbors Regressor
- Random Forest Regressor

## 📊 Model Performance

| Model | R² Score | Adjusted R² | MAE | RMSE |
|---|---:|---:|---:|---:|
| Linear Regression | 0.802517 | 0.792410 | 4338.923817 | 6024.004673 |
| Decision Tree | 0.797372 | 0.787001 | 2743.403351 | 6101.977336 |
| KNN | 0.561290 | 0.538837 | 5532.465446 | 8978.616749 |
| Random Forest | **0.882175** | **0.876145** | **2588.687357** | **4653.061926** |

## 🏆 Best Model

The **Random Forest Regressor** achieved the best overall performance.

### Random Forest Performance

- **R² Score:** 0.882175
- **Adjusted R²:** 0.876145
- **MAE:** 2588.687357
- **RMSE:** 4653.061926

Random Forest achieved the highest R² and Adjusted R² scores while also achieving the lowest MAE and RMSE.

Therefore, Random Forest was selected as the final model for deployment.

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
Streamlit Frontend
   ↓
Deployment
```

## 📂 Project Structure

```text
Insurance_charges_Prediction/
│
├── pickles/
│   ├── model.pkl
│   ├── scalar.pkl
│   ├── columns.pkl
│   └── columns_to_scale.pkl
│
├── app.py
├── insurance.ipynb
├── insurance.csv
├── README.md
├── requirements.txt
└── .gitattributes
```

## 🖥️ Web Application

The Streamlit application provides an interactive interface for estimating insurance charges.

Users can enter:

- Age
- Sex
- BMI
- Number of Children
- Smoking Status
- Region

After submitting the information, the trained Random Forest model generates an estimated insurance charge.

### Features

- Modern dark-themed interface
- Responsive design
- Mobile-friendly layout
- Interactive input fields
- Random Forest regression prediction
- Estimated insurance charges
- Premium prediction result dialog
- Deployed Streamlit application

## 📈 Evaluation Metrics

### R² Score

R² measures how much of the variation in the target variable is explained by the model.

Higher values indicate better performance.

### Adjusted R²

Adjusted R² accounts for the number of predictors used by the model.

Higher values indicate better performance.

### Mean Absolute Error

MAE measures the average absolute difference between actual and predicted values.

Lower values indicate better performance.

### Root Mean Squared Error

RMSE measures the square root of the average squared prediction error and gives greater importance to larger errors.

Lower values indicate better performance.

## 🔬 Model Comparison

The model comparison shows that:

- Linear Regression provides a strong baseline.
- Decision Tree achieves relatively low MAE but has a higher RMSE than Random Forest.
- KNN performs significantly worse on this dataset.
- Random Forest provides the strongest overall performance.

The Random Forest model achieves an R² score of approximately **0.88**, meaning it explains a large portion of the variation in insurance charges.

## 🌐 Deployment

The application is deployed using **Streamlit Community Cloud**.

🔗 **Live Application:**  
https://ayyan-insurance-charges-prediction.streamlit.app

The trained model and preprocessing artifacts are included with the project so the Streamlit application can load them during deployment.

The large `model.pkl` file is managed using **Git Large File Storage (Git LFS)**.

## ⚙️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/code-with-ayyan/Insurance_charges_Prediction.git
```

### 2. Move into the Project Directory

```bash
cd Insurance_charges_Prediction
```

### 3. Create a Virtual Environment

```bash
python -m venv venv
```

### 4. Activate the Virtual Environment

Linux:

```bash
source venv/bin/activate
```

Windows:

```bash
venv\Scripts\activate
```

### 5. Install Dependencies

```bash
pip install -r requirements.txt
```

### 6. Run the Streamlit Application

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
- Matplotlib
- Seaborn

## 💾 Model Serialization

The trained model and preprocessing components are saved using Joblib.

```text
pickles/
├── model.pkl
├── scalar.pkl
├── columns.pkl
└── columns_to_scale.pkl
```

- `model.pkl` — trained Random Forest regression model
- `scalar.pkl` — fitted feature scaler
- `columns.pkl` — model feature columns
- `columns_to_scale.pkl` — columns requiring scaling before prediction

## 📱 Responsive Application

The frontend is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile

The interface automatically adapts to smaller screen sizes for a better user experience.

## ⚠️ Disclaimer

The predicted value is a **machine-learning estimate** and should not be considered an official insurance quote.

Actual insurance charges may vary depending on the insurance provider, policy, coverage, location, customer profile, and other factors.

This project is intended for educational and demonstration purposes.

## 📚 Learning Outcomes

This project helped in understanding:

- Regression problems
- Feature preprocessing
- Categorical encoding
- Feature scaling
- Train-test splitting
- Regression model comparison
- Evaluation metrics
- Random Forest Regression
- Model serialization
- Streamlit application development
- Machine Learning deployment

## 👨‍💻 Author

**Ayyan Ahmed**

Machine Learning & AI Student

Building and understanding Machine Learning algorithms from fundamentals to deployment.

