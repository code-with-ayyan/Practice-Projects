import streamlit as st
import pandas as pd
import numpy as np
import joblib

st.set_page_config(
    page_title="Ford Car Price Predictor",
    page_icon="🚘",
    layout="wide"
)

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html, body, [class*="css"] {
    font-family: 'Inter', sans-serif;
}

.stApp {
    background:
        radial-gradient(circle at 15% 10%, rgba(37,99,235,.16), transparent 28%),
        radial-gradient(circle at 85% 15%, rgba(14,165,233,.10), transparent 25%),
        linear-gradient(135deg, #060a12 0%, #0b1220 50%, #07101b 100%);
    color: #f8fafc;
}

.block-container {
    max-width: 1050px;
    padding-top: 2.2rem;
    padding-bottom: 4rem;
}

.hero {
    text-align: center;
    padding: 15px 10px 30px;
}

.hero-icon {
    width: 76px;
    height: 76px;
    margin: 0 auto 18px;
    border-radius: 23px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 40px;
    background: linear-gradient(135deg, #2563eb, #0891b2);
    box-shadow: 0 18px 50px rgba(37,99,235,.30);
}

.hero h1 {
    font-size: 42px;
    font-weight: 800;
    letter-spacing: -1.5px;
    margin: 0;
}

.hero p {
    color: #94a3b8;
    font-size: 16px;
    margin-top: 10px;
}

.card {
    background: rgba(15,23,42,.76);
    border: 1px solid rgba(148,163,184,.13);
    border-radius: 24px;
    padding: 28px;
    box-shadow: 0 22px 70px rgba(0,0,0,.30);
    backdrop-filter: blur(18px);
}

.section-title {
    font-size: 20px;
    font-weight: 700;
    margin-bottom: 20px;
}

div[data-baseweb="input"] > div,
div[data-baseweb="select"] > div {
    background: rgba(15,23,42,.92) !important;
    border-color: rgba(148,163,184,.18) !important;
    border-radius: 12px !important;
}

label {
    color: #cbd5e1 !important;
}

.stButton > button {
    width: 100%;
    height: 54px;
    border: 0;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    color: white;
    background: linear-gradient(135deg, #2563eb, #0284c7);
    box-shadow: 0 12px 32px rgba(37,99,235,.25);
    transition: .2s ease;
}

.stButton > button:hover {
    transform: translateY(-2px);
    box-shadow: 0 17px 40px rgba(37,99,235,.36);
}

.result {
    margin-top: 28px;
    padding: 32px;
    border-radius: 24px;
    text-align: center;
    background: linear-gradient(145deg, rgba(30,41,59,.95), rgba(15,23,42,.95));
    border: 1px solid rgba(59,130,246,.28);
    box-shadow: 0 24px 70px rgba(0,0,0,.38);
}

.result-icon {
    font-size: 42px;
}

.result-title {
    color: #94a3b8;
    font-size: 15px;
    font-weight: 600;
    margin-top: 7px;
}

.result-value {
    margin-top: 6px;
    font-size: 43px;
    font-weight: 800;
    letter-spacing: -1px;
}

.result-description {
    margin-top: 10px;
    color: #94a3b8;
    font-size: 13px;
}

.footer {
    text-align: center;
    color: #64748b;
    font-size: 12px;
    margin-top: 28px;
}

div[data-testid="stForm"] {
    border: 0 !important;
    padding: 0 !important;
}

@media (max-width: 700px) {
    .hero h1 {
        font-size: 32px;
    }

    .block-container {
        padding-left: 1rem;
        padding-right: 1rem;
    }

    .card {
        padding: 20px;
    }

    .result-value {
        font-size: 32px;
    }
}
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def load_artifacts():
    model = joblib.load("pickles/model.pkl")
    scaler = joblib.load("pickles/scalar.pkl")
    columns = joblib.load("pickles/columns.pkl")
    columns_to_scale = joblib.load("pickles/cols_to_scale.pkl")
    return model, scaler, list(columns), list(columns_to_scale)

model, scaler, columns, columns_to_scale = load_artifacts()

def find_column(prefix, value):
    candidates = [
        f"{prefix}{value}",
        f"{prefix} {value}",
        f"{prefix}_{value}"
    ]

    for candidate in candidates:
        if candidate in columns:
            return candidate

    normalized_value = value.lower().replace(" ", "")
    for col in columns:
        normalized_col = col.lower().replace(" ", "").replace("_", "")
        if normalized_col.endswith(normalized_value):
            if normalized_col.startswith(prefix.lower().replace("_", "")):
                return col

    return None

def build_input(
    year,
    mileage,
    tax,
    mpg,
    engine_size,
    model_name,
    transmission,
    fuel_type
):
    data = {column: 0 for column in columns}

    base_values = {
        "year": year,
        "mileage": mileage,
        "tax": tax,
        "mpg": mpg,
        "engineSize": engine_size
    }

    for key, value in base_values.items():
        if key in data:
            data[key] = value

    model_col = find_column("model", model_name)
    transmission_col = find_column("transmission", transmission)
    fuel_col = find_column("fuelType", fuel_type)

    if model_col:
        data[model_col] = 1

    if transmission_col:
        data[transmission_col] = 1

    if fuel_col:
        data[fuel_col] = 1

    return pd.DataFrame([data], columns=columns)

st.markdown("""
<div class="hero">
    <div class="hero-icon">🚘</div>
    <h1>Ford Car Price Predictor</h1>
    <p>Estimate the price of a Ford car using a trained Machine Learning regression model.</p>
</div>
""", unsafe_allow_html=True)

st.markdown('<div class="card">', unsafe_allow_html=True)
st.markdown('<div class="section-title">Car Information</div>', unsafe_allow_html=True)

model_options = [
    "B-MAX", "C-MAX", "EcoSport", "Edge", "Escort", "Fiesta",
    "Focus", "Fusion", "Galaxy", "Grand C-MAX", "Grand Tourneo Connect",
    "KA", "Ka+", "Kuga", "Mondeo", "Mustang", "Puma", "Ranger",
    "S-MAX", "Streetka", "Tourneo Connect", "Tourneo Custom",
    "Transit Tourneo"
]

transmission_options = ["Automatic", "Manual", "Semi-Auto"]
fuel_options = ["Diesel", "Electric", "Hybrid", "Other", "Petrol"]

with st.form("ford_prediction_form"):
    left, right = st.columns(2)

    with left:
        model_name = st.selectbox("Ford Model", model_options)
        year = st.number_input(
            "Manufacturing Year",
            min_value=1990,
            max_value=2026,
            value=2018,
            step=1
        )
        mileage = st.number_input(
            "Mileage",
            min_value=0,
            max_value=500000,
            value=40000,
            step=1000
        )
        transmission = st.selectbox(
            "Transmission",
            transmission_options
        )

    with right:
        fuel_type = st.selectbox(
            "Fuel Type",
            fuel_options
        )
        tax = st.number_input(
            "Tax",
            min_value=0,
            max_value=1000,
            value=150,
            step=10
        )
        mpg = st.number_input(
            "MPG",
            min_value=1.0,
            max_value=200.0,
            value=45.0,
            step=0.5
        )
        engine_size = st.number_input(
            "Engine Size",
            min_value=0.5,
            max_value=8.0,
            value=1.5,
            step=0.1
        )

    st.markdown("<br>", unsafe_allow_html=True)
    submitted = st.form_submit_button("Predict Car Price 🚀")

st.markdown('</div>', unsafe_allow_html=True)

if submitted:
    try:
        input_df = build_input(
            year,
            mileage,
            tax,
            mpg,
            engine_size,
            model_name,
            transmission,
            fuel_type
        )

        scale_columns = [
            column for column in columns_to_scale
            if column in input_df.columns
        ]

        if scale_columns:
            input_df[scale_columns] = scaler.transform(
                input_df[scale_columns]
            )

        prediction = float(model.predict(input_df)[0])

        st.markdown(f"""
        <div class="result">
            <div class="result-icon">💰</div>
            <div class="result-title">Estimated Ford Car Price</div>
            <div class="result-value">£{prediction:,.2f}</div>
            <div class="result-description">
                This estimate was generated using the trained
                KNN regression model based on the provided car information.
            </div>
        </div>
        """, unsafe_allow_html=True)

    except Exception as error:
        st.error(f"Prediction failed: {error}")

st.markdown("""
<div class="footer">
    Machine Learning estimate • Not an official vehicle valuation
</div>
""", unsafe_allow_html=True)
