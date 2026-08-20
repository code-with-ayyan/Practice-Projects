# 🚘 Ford Car Price Prediction

An end-to-end Machine Learning regression project for predicting Ford car prices using vehicle information.

The project compares multiple regression algorithms, evaluates their performance using standard regression metrics, and deploys the selected model through an interactive Streamlit web application.

## 🚀 Live Demo

🔗 **Live Application:**

https://ford-car-price-prediction-a.streamlit.app

## 📌 Project Overview

This project demonstrates a complete Machine Learning workflow for used Ford car price prediction.

The model uses vehicle information such as:

- Ford model
- Manufacturing year
- Mileage
- Tax
- MPG
- Engine size
- Transmission
- Fuel type

Multiple regression algorithms were trained and evaluated to determine which model performs best on the dataset.

The final model is integrated into a Streamlit frontend for interactive price prediction.

## 🤖 Models Compared

- Linear Regression
- Decision Tree Regressor
- K-Nearest Neighbors Regressor
- Random Forest Regressor
- Support Vector Machine Regressor

## 📊 Model Performance

| Model | R² Score | Adjusted R² | MAE | RMSE |
|---|---:|---:|---:|---:|
| Linear Regression | 0.847427 | 0.845839 | 1368.21 | 1846.82 |
| Decision Tree | 0.911083 | 0.910157 | 935.09 | 1409.87 |
| **KNN** | **0.931145** | **0.930428** | **844.14** | **1240.66** |
| Random Forest | 0.930698 | 0.929977 | 854.89 | 1244.68 |
| SVM | 0.736978 | 0.734241 | 1733.26 | 2424.83 |

## 🏆 Best Model

The **K-Nearest Neighbors Regressor** achieved the best overall performance.

- **R² Score:** 0.931145
- **Adjusted R²:** 0.930428
- **MAE:** 844.14
- **RMSE:** 1240.66

KNN achieved the highest R² and Adjusted R² while also producing the lowest MAE and RMSE among the evaluated models. Therefore, KNN was selected as the final model for the deployed application.

## 🧠 Machine Learning Workflow

```text
Ford Car Dataset
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
Ford-Car-Price-Prediction/
│
├── pickles/
│   ├── model.pkl
│   ├── scalar.pkl
│   ├── columns.pkl
│   └── columns_to_scale.pkl
│
├── ford_app.py
├── ford_car_price.ipynb
├── ford.csv
├── README.md
└── requirements.txt
```

## 🖥️ Web Application

The Streamlit application provides an interactive interface for estimating Ford car prices.

Users can enter:

- Ford model
- Manufacturing year
- Mileage
- Transmission
- Fuel type
- Tax
- MPG
- Engine size

After submitting the information, the trained KNN regression model generates an estimated car price.

### Features

- Modern dark-themed interface
- Responsive layout
- Interactive input fields
- Ford vehicle information inputs
- Machine Learning price prediction
- Clear prediction result
- Mobile-friendly design
- Streamlit deployment

## 📈 Evaluation Metrics

### R² Score

R² measures how much of the variation in the target variable is explained by the model. Higher values indicate better performance.

### Adjusted R²

Adjusted R² accounts for the number of predictors used by the model. Higher values indicate better performance.

### Mean Absolute Error

MAE measures the average absolute difference between actual and predicted prices. Lower values indicate better performance.

### Root Mean Squared Error

RMSE measures the square root of the average squared prediction error and gives greater importance to larger errors. Lower values indicate better performance.

## 🔬 Model Comparison

The model comparison shows that:

- Linear Regression provides a strong baseline.
- Decision Tree performs significantly better than Linear Regression.
- KNN provides the strongest overall performance.
- Random Forest performs almost identically to KNN.
- SVM performs considerably worse on this dataset.

KNN achieved an R² score of approximately **0.93**, meaning the model explains a large portion of the variation in Ford car prices in the evaluated dataset.

## 💾 Model Serialization

The trained model and preprocessing components are stored using Joblib.

```text
pickles/
├── model.pkl
├── scalar.pkl
├── columns.pkl
└── cols_to_scale.pkl
```

- `model.pkl` — trained KNN regression model
- `scalar.pkl` — fitted feature scaler
- `columns.pkl` — feature columns used by the model
- `cols_to_scale.pkl` — columns requiring scaling before prediction

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/code-with-ayyan/Ford-car-price-prediction.git
```

Move into the project directory:

```bash
cd Ford-car-price-prediction
```

Create a virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Linux:

```bash
source venv/bin/activate
```

Install the dependencies:

```bash
pip install -r requirements.txt
```

Run the Streamlit application:

```bash
streamlit run app.py
```

## 📦 Technologies Used

- Python
- NumPy
- Pandas
- Matplotlib
- Seaborn
- Scikit-learn
- Joblib
- Streamlit
- Jupyter Notebook

## ⚠️ Disclaimer

The predicted price is a Machine Learning estimate and should not be considered an official market valuation.

Actual vehicle prices may vary depending on vehicle condition, location, seller, market demand, service history, specifications, and other factors.

This project is intended for educational and demonstration purposes.

## 📚 Learning Outcomes

This project helped in understanding:

- Regression problems
- Exploratory Data Analysis
- Data preprocessing
- Categorical encoding
- Feature engineering
- Feature scaling
- Train-test splitting
- Regression model comparison
- R² and Adjusted R²
- MAE and RMSE
- KNN Regression
- Decision Tree Regression
- Random Forest Regression
- SVM Regression
- Model serialization
- Streamlit application development
- Machine Learning deployment

## 🌐 Deployment

The application is deployed using **Streamlit Community Cloud**.

🔗 **Live Application:**

https://ford-car-price-prediction-a.streamlit.app

## 👨‍💻 Author

**Ayyan Ahmed**

Machine Learning & AI Student

Learning Machine Learning from fundamentals, implementing algorithms, and building end-to-end AI/ML projects.

---

> **Learn the fundamentals. Build the models. Deploy the solution.**
