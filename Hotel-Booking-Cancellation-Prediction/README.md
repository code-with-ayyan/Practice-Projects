# 🏨 Hotel Booking Cancellation Predictor

A full-stack Machine Learning application that predicts whether a hotel booking is likely to be canceled.

The project combines a trained Scikit-learn Machine Learning pipeline, a FastAPI backend, and a React + Vite frontend. The application has been deployed on AWS EC2 and is currently accessible through the EC2 public IP.

## 🌐 Live Application

**Live URL:** http://56.228.33.7

The application is currently running through the AWS EC2 public IP address.

---

## 📌 Project Overview

This project takes hotel reservation information from a web-based form and sends it to a FastAPI prediction API.

The backend:

1. Receives the booking information.
2. Validates the submitted data using Pydantic.
3. Adds the required derived booking feature(s).
4. Loads the trained Scikit-learn pipeline from `pipeline.pkl`.
5. Passes the booking data through the trained preprocessing and prediction pipeline.
6. Returns the cancellation prediction to the frontend.

The frontend then displays the prediction result in a user-friendly interface.

---

## ✨ What Was Implemented

### 🧠 Machine Learning

- Trained hotel booking cancellation prediction model.
- Saved the complete trained preprocessing/model pipeline as `pipeline.pkl`.
- Used Scikit-learn for preprocessing and prediction.
- Preserved the Scikit-learn version required by the saved pipeline: **1.6.1**.
- Prediction is performed directly through the saved pipeline.

### ⚡ FastAPI Backend

A REST API was implemented using FastAPI.

The main prediction endpoint is:

```text
POST /predict
```

The backend uses Pydantic models to validate incoming booking data.

The API accepts information such as:

- Hotel
- Lead time
- Weekend nights
- Week nights
- Adults
- Children
- Babies
- Meal
- Country
- Market segment
- Distribution channel
- Repeated guest status
- Previous cancellations
- Previous non-canceled bookings
- Booking changes
- Deposit type
- Customer type
- ADR
- Required parking spaces
- Special requests
- Room type change status

A derived `total_guests` value is also calculated from:

```text
adults + children + babies
```

### 🎨 React Frontend

A modern React + Vite frontend was implemented for interacting with the prediction API.

The interface organizes the booking information into clear sections:

- Booking Information
- Guest Information
- Booking History
- Booking Source
- Stay & Payment

The frontend includes:

- Human-friendly field labels
- Select inputs for categorical values
- Numeric validation
- Yes/No controls for binary features
- Live total guest calculation
- Loading state while prediction is being processed
- Prediction result display
- Error handling for failed API requests
- Responsive layout for different screen sizes

### 📊 Prediction Result

The application displays the model prediction to the user.

Prediction values are interpreted as:

| Prediction | Meaning |
|---|---|
| `0` | Booking predicted not to be canceled |
| `1` | Cancellation predicted |

---

## 🗂️ Project Structure

```text
Hotel-Booking/
│
├── app.py
├── pipeline.pkl
├── requirements.txt
├── runtime.txt
├── main.ipynb
│
└── frontend/
    ├── package.json
    ├── package-lock.json
    ├── vite.config.js
    ├── public/
    │
    └── src/
        ├── App.jsx
        ├── main.jsx
        ├── components/
        ├── data/
        ├── pages/
        ├── services/
        └── styles/
```

---

## 🔄 Application Workflow

```text
User
 │
 ▼
React Frontend
 │
 │ Booking Information
 ▼
POST /predict
 │
 ▼
FastAPI Backend
 │
 ▼
Pydantic Validation
 │
 ▼
Data Preparation
 │
 ▼
Scikit-learn Pipeline
 │
 ▼
Cancellation Prediction
 │
 ▼
FastAPI Response
 │
 ▼
React Prediction Result
```

---

## 🛠️ Technologies Used

### Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib

### Backend

- FastAPI
- Pydantic
- Uvicorn

### Frontend

- React
- Vite
- JavaScript
- CSS

### Deployment

- AWS EC2
- Ubuntu Linux
- Python 3.12.13

---

## 📦 Python Environment

The deployment uses:

```text
Python 3.12.13
```

The saved Machine Learning pipeline is compatible with:

```text
scikit-learn==1.6.1
```

The required Python packages are defined in:

```text
requirements.txt
```

---

## 🚀 Running the Backend

Create and activate the Python environment:

```bash
python3.12 -m venv .venv
source .venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Start the FastAPI application:

```bash
uvicorn app:app --host 0.0.0.0 --port 8000
```

FastAPI automatically provides interactive API documentation at:

```text
/docs
```

---

## 🎨 Running the Frontend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

For a production build:

```bash
npm run build
```

---

## ☁️ AWS Deployment

The application has been deployed to an AWS EC2 instance.

Current public address:

```text
http://56.228.33.7
```

The deployed application connects the React frontend with the FastAPI prediction backend and serves the Machine Learning prediction workflow through the web interface.

---

## 📓 Model Development

The Machine Learning development and experimentation work is included in:

```text
main.ipynb
```

The final trained pipeline used by the deployed API is:

```text
pipeline.pkl
```

Keeping the preprocessing and prediction pipeline together allows the deployed API to apply the same transformations used during model training.

---

## 📋 Example Prediction Request

```json
{
  "hotel": "City Hotel",
  "lead_time": 120,
  "stays_in_weekend_nights": 2,
  "stays_in_week_nights": 4,
  "adults": 2,
  "children": 0,
  "babies": 0,
  "meal": "BB",
  "country": "United Kingdom",
  "market_segment": "Online TA",
  "distribution_channel": "TA/TO",
  "is_repeated_guest": 0,
  "previous_cancellations": 0,
  "previous_bookings_not_canceled": 0,
  "booking_changes": 0,
  "deposit_type": "No Deposit",
  "customer_type": "Transient",
  "adr": 100,
  "required_car_parking_spaces": 0,
  "total_of_special_requests": 1,
  "room_type_changed": 0
}
```

---

## 👨‍💻 Author

**Ayyan Ahmed**

Machine Learning & AI Student

Building practical Machine Learning applications from model development to production deployment.
