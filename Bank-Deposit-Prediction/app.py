import joblib
import pandas as pd
import streamlit as st
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent
PICKLE_DIR = BASE_DIR / "pickles"

MODEL_PATH = PICKLE_DIR / "model.pkl"
SCALER_PATH = PICKLE_DIR / "scalar.pkl"
COLUMNS_PATH = PICKLE_DIR / "required_columns.pkl"
SCALE_COLUMNS_PATH = PICKLE_DIR / "cols_to_scale.pkl"

st.set_page_config(
    page_title="Bank Deposit Predictor",
    page_icon="🏦",
    layout="wide",
    initial_sidebar_state="collapsed",
)

st.markdown("""
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

html, body, [class*="css"] {
    font-family: 'Inter', sans-serif;
}

.stApp {
    background:
        radial-gradient(circle at 15% 10%, rgba(56, 189, 248, .12), transparent 28%),
        radial-gradient(circle at 85% 15%, rgba(99, 102, 241, .13), transparent 30%),
        #07111f;
    color: #eef6ff;
}

.block-container {
    max-width: 1180px;
    padding-top: 2.2rem;
    padding-bottom: 3rem;
}

.hero {
    padding: 34px 38px;
    border: 1px solid rgba(148,163,184,.16);
    border-radius: 26px;
    background: linear-gradient(135deg, rgba(15,32,55,.92), rgba(9,22,39,.88));
    box-shadow: 0 22px 70px rgba(0,0,0,.28);
    margin-bottom: 25px;
}

.badge {
    display: inline-block;
    padding: 7px 12px;
    border-radius: 999px;
    background: rgba(56,189,248,.12);
    border: 1px solid rgba(56,189,248,.25);
    color: #7dd3fc;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
}

.hero h1 {
    margin: 14px 0 8px;
    font-size: 42px;
    line-height: 1.1;
    font-weight: 800;
    letter-spacing: -.035em;
}

.hero p {
    color: #a9bdd2;
    font-size: 16px;
    line-height: 1.7;
    max-width: 780px;
    margin-bottom: 0;
}

div[data-testid="stForm"] {
    border: 1px solid rgba(148,163,184,.13);
    border-radius: 22px;
    padding: 18px 22px 22px;
    background: rgba(9,23,40,.72);
}

label {
    color: #e7eef7 !important;
    font-weight: 650 !important;
}

input {
    color: #ffffff !important;
    -webkit-text-fill-color: #ffffff !important;
}

div[data-baseweb="input"] > div,
div[data-baseweb="select"] > div {
    background: #111c2b !important;
    border: 1px solid rgba(148,163,184,.18) !important;
    border-radius: 12px !important;
}

div[data-baseweb="select"] * {
    color: #ffffff !important;
}

div[data-baseweb="input"] > div:hover,
div[data-baseweb="select"] > div:hover {
    border-color: rgba(56,189,248,.5) !important;
}

.predict-wrap {
    max-width: 430px;
    margin: 28px auto 4px;
}

.stFormSubmitButton > button {
    width: 100%;
    min-height: 56px;
    border: 0;
    border-radius: 15px;
    font-weight: 800;
    font-size: 16px;
    background: linear-gradient(135deg, #38bdf8, #6366f1);
    color: white;
    box-shadow: 0 14px 35px rgba(59,130,246,.28);
    transition: .2s ease;
}

.stFormSubmitButton > button:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 42px rgba(59,130,246,.38);
}

div[data-testid="stDialog"] > div {
    background: #0b1524 !important;
    border: 1px solid rgba(148,163,184,.18) !important;
    border-radius: 24px !important;
    box-shadow: 0 30px 100px rgba(0,0,0,.55);
}

.result-card {
    text-align: center;
    padding: 12px 8px 20px;
}

.result-icon {
    font-size: 58px;
    margin-bottom: 8px;
}

.result-title {
    color: #cbd5e1;
    font-size: 14px;
    font-weight: 700;
    letter-spacing: .08em;
    text-transform: uppercase;
}

.result-group {
    font-size: 30px;
    font-weight: 850;
    margin: 8px 0 6px;
}

.result-probability {
    font-size: 38px;
    font-weight: 850;
    color: #7dd3fc;
    margin-bottom: 10px;
}

.result-description {
    color: #9fb1c4;
    font-size: 13px;
    line-height: 1.6;
}

.footer {
    text-align: center;
    color: #71859b;
    font-size: 12px;
    padding: 26px 0 0;
}

#MainMenu, footer {
    visibility: hidden;
}

header {
    background: transparent !important;
}
</style>
""", unsafe_allow_html=True)

@st.cache_resource
def load_artifacts():
    model = joblib.load(MODEL_PATH)
    scaler = joblib.load(SCALER_PATH)
    required_columns = list(joblib.load(COLUMNS_PATH))
    columns_to_scale = list(joblib.load(SCALE_COLUMNS_PATH))
    return model, scaler, required_columns, columns_to_scale

try:
    model, scaler, required_columns, columns_to_scale = load_artifacts()
except Exception as e:
    st.error("Model files could not be loaded.")
    st.exception(e)
    st.stop()

st.markdown("""
<div class="hero">
    <div class="badge">Machine Learning · Classification</div>
    <h1>Bank Deposit Predictor</h1>
    <p>
        Enter customer information to estimate the probability of subscribing
        to the bank's term deposit campaign using a trained Random Forest classifier.
    </p>
</div>
""", unsafe_allow_html=True)

with st.form("prediction_form"):
    st.markdown("### 👤 Customer Information")

    c1, c2, c3 = st.columns(3)

    with c1:
        age = st.number_input("Age", min_value=18, max_value=100, value=35, step=1)
        job = st.selectbox("Job", [
            "admin.", "blue-collar", "entrepreneur", "housemaid", "management",
            "retired", "self-employed", "services", "student", "technician",
            "unemployed", "unknown"
        ])
        marital = st.selectbox("Marital Status", ["married", "single", "divorced"])
        education = st.selectbox("Education", ["primary", "secondary", "tertiary", "unknown"])
        default = st.selectbox("Credit in Default", ["no", "yes"])

    with c2:
        balance = st.number_input("Account Balance", value=1000.0, step=100.0)
        housing = st.selectbox("Housing Loan", ["no", "yes"])
        loan = st.selectbox("Personal Loan", ["no", "yes"])
        contact = st.selectbox("Contact Type", ["cellular", "telephone", "unknown"])
        day = st.number_input("Last Contact Day", min_value=1, max_value=31, value=15, step=1)

    with c3:
        month = st.selectbox("Last Contact Month", [
            "jan", "feb", "mar", "apr", "may", "jun", "jul", "aug",
            "sep", "oct", "nov", "dec"
        ])
        duration = st.number_input(
            "Last Contact Duration (seconds)",
            min_value=0,
            value=300,
            step=10
        )
        campaign = st.number_input("Campaign Contacts", min_value=1, value=1, step=1)
        pdays = st.number_input("Days Since Previous Contact", min_value=-1, value=-1, step=1)
        previous = st.number_input("Previous Contacts", min_value=0, value=0, step=1)
        poutcome = st.selectbox(
            "Previous Campaign Outcome",
            ["unknown", "failure", "other", "success"]
        )

    st.markdown('<div class="predict-wrap">', unsafe_allow_html=True)
    submitted = st.form_submit_button("🔮 Predict Deposit Subscription")
    st.markdown("</div>", unsafe_allow_html=True)

if submitted:
    raw = pd.DataFrame([{
        "age": age,
        "job": job,
        "marital": marital,
        "education": education,
        "default": 1 if default == "yes" else 0,
        "balance": balance,
        "housing": 1 if housing == "yes" else 0,
        "loan": 1 if loan == "yes" else 0,
        "contact": contact,
        "day": day,
        "month": month,
        "duration": duration,
        "campaign": campaign,
        "pdays": pdays,
        "previous": previous,
        "poutcome": poutcome,
    }])

    raw["previous_loans"] = raw["loan"] + raw["housing"]
    raw.drop(columns=["loan", "housing"], inplace=True)
    raw["previous_contact"] = (raw["pdays"] != -1).astype(int)

    dummy_cols = [
        "job",
        "marital",
        "education",
        "contact",
        "month",
        "poutcome"
    ]

    prepared = pd.get_dummies(raw, columns=dummy_cols, dtype=int)
    prepared = prepared.reindex(columns=required_columns, fill_value=0)
    prepared[columns_to_scale] = scaler.transform(prepared[columns_to_scale])

    prediction = int(model.predict(prepared)[0])

    if hasattr(model, "predict_proba"):
        probability = float(model.predict_proba(prepared)[0][1]) * 100
    else:
        probability = 100.0 if prediction == 1 else 0.0

    if probability >= 75:
        group = "Most Likely"
        icon = "🚀"
        color = "#34d399"
    elif probability >= 50:
        group = "Likely"
        icon = "✨"
        color = "#7dd3fc"
    elif probability >= 25:
        group = "Less Likely"
        icon = "📊"
        color = "#fbbf24"
    else:
        group = "Least Likely"
        icon = "◽"
        color = "#fb7185"

    @st.dialog("Prediction Result", width="small", dismissible=True)
    def show_result():
        st.markdown(
            f"""
            <div class="result-card">
                <div class="result-icon">{icon}</div>
                <div class="result-title">Prediction Result</div>
                <div class="result-group" style="color:{color};">
                    {group}
                </div>
                <div class="result-probability">
                    {probability:.1f}%
                </div>
                <div class="result-description">
                    Estimated probability of subscribing to the bank's
                    term deposit campaign.
                </div>
            </div>
            """,
            unsafe_allow_html=True
        )

    show_result()

st.markdown(
    '<div class="footer">Built with Machine Learning by Ayyan</div>',
    unsafe_allow_html=True
)
