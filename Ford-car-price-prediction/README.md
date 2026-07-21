# 🚗 Ford Car Price Prediction using Multiple Regression Algorithms

## 📖 Overview

This project predicts the selling prices of Ford cars using multiple regression algorithms. It demonstrates a complete end-to-end Machine Learning workflow, including data preprocessing, exploratory data analysis (EDA), feature engineering, feature selection, model training, evaluation, visualization, and model comparison.

Currently, the project includes:

* Linear Regression
* K-Nearest Neighbors (KNN) Regression

The repository is designed to grow over time, and additional regression algorithms such as Decision Tree, Random Forest, Support Vector Regression (SVR), and Gradient Boosting will be added for performance comparison.

---

# 📂 Dataset

The dataset contains information about Ford vehicles with the following features:

* Model
* Year
* Transmission
* Mileage
* Fuel Type
* Tax
* MPG
* Engine Size

**Target Variable**

* Price

---

# 🔄 Machine Learning Workflow

1. Data Loading
2. Exploratory Data Analysis (EDA)
3. Data Cleaning
4. Outlier Detection & Removal
5. Feature Engineering
6. One-Hot Encoding
7. Train-Test Split
8. Feature Scaling using StandardScaler
9. Feature Selection
10. Model Training
11. Model Evaluation
12. Model Comparison
13. Prediction Visualization

---

# 🤖 Implemented Models

## 1. Linear Regression

A baseline regression model used to establish initial performance.

### Performance

| Metric      |            Value |
| ----------- | ---------------: |
| R² Score    |       **0.8474** |
| Adjusted R² |       **0.8458** |
| MAE         |      **1368.21** |
| MSE         | **3,410,730.70** |
| RMSE        |      **1846.82** |

---

## 2. K-Nearest Neighbors (KNN) Regression

A distance-based regression algorithm that predicts prices by averaging the target values of the K nearest neighbors.

### Performance

| Metric      |            Value |
| ----------- | ---------------: |
| R² Score    |       **0.9314** |
| Adjusted R² |       **0.9306** |
| MAE         |       **846.48** |
| MSE         | **1,534,395.09** |
| RMSE        |      **1238.71** |

---

# 📊 Model Comparison

| Model             |         R² | Adjusted R² |         MAE |        RMSE |
| ----------------- | ---------: | ----------: | ----------: | ----------: |
| Linear Regression | **0.8474** |  **0.8458** | **1368.21** | **1846.82** |
| KNN Regression    | **0.9314** |  **0.9306** |  **846.48** | **1238.71** |

Among the currently implemented models, **KNN Regression achieved the best performance**, producing a higher R² Score and lower prediction errors than Linear Regression.

---

# 📷 Visualizations

## Linear Regression

* Actual vs Predicted Prices
* Residual Distribution

## KNN Regression

* Actual vs Predicted Prices
* Residual Distribution

---

# 📁 Project Structure

```text
Ford-Car-Price-Prediction/

├── ford.csv
├── ford.ipynb
│
├── images_linear_model/
│   ├── actual_vs_linear_model.png
│   └── residual_distribution_linear_model.png
│
├── images_KNN_model/
│   ├── actual_vs_KNN_model.png
│   └── residual_distribution_KNN_model.png
│
│
├── README.md
└── requirements.txt
```

---

# 🛠 Technologies Used

* Python
* NumPy
* Pandas
* Matplotlib
* Seaborn
* Scikit-learn
* Jupyter Notebook

---

# 🎯 Learning Outcomes

Through this project, I gained practical experience in:

* Exploratory Data Analysis (EDA)
* Data Cleaning
* Feature Engineering
* Feature Selection
* Feature Scaling
* Linear Regression
* KNN Regression
* Regression Model Evaluation
* Model Comparison
* Building End-to-End Machine Learning Pipelines

---

# 🚀 Future Work

The following regression algorithms will be implemented and compared in future updates:

* Decision Tree Regressor
* Random Forest Regressor
* Support Vector Regressor (SVR)
* Gradient Boosting Regressor
* XGBoost Regressor
* AdaBoost Regressor

---

# 👨‍💻 Author

**Ayyan Ahmed**

Aspiring AI/ML Engineer | Building end-to-end Machine Learning projects and implementing machine learning algorithms from scratch to strengthen mathematical understanding and practical skills.
