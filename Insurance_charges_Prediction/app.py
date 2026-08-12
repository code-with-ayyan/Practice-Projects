
import streamlit as st
import pandas as pd
import joblib

st.set_page_config(
    page_title="Insurance Charges Predictor",
    page_icon="💳",
    layout="centered",
    initial_sidebar_state="collapsed"
)

@st.cache_resource
def load_artifacts():
    model = joblib.load("pickles/model.pkl")
    scaler = joblib.load("pickles/scalar.pkl")
    columns_to_scale = joblib.load("pickles/columns_to_scale.pkl")
    return model, scaler, columns_to_scale

model, scaler, columns_to_scale = load_artifacts()

st.markdown(
    """
    <style>
    .stApp {
        background:
            radial-gradient(circle at 10% 0%, rgba(59,130,246,.12), transparent 28%),
            radial-gradient(circle at 90% 10%, rgba(168,85,247,.10), transparent 28%),
            #07090d;
        color: #f5f7fa;
    }

    .block-container {
        max-width: 850px;
        padding-top: 2.2rem;
        padding-bottom: 3rem;
    }

    header[data-testid="stHeader"] {
        background: transparent;
    }

    .hero {
        padding: 28px 30px;
        border: 1px solid rgba(255,255,255,.09);
        border-radius: 24px;
        background: linear-gradient(
            145deg,
            rgba(255,255,255,.07),
            rgba(255,255,255,.025)
        );
        box-shadow: 0 20px 60px rgba(0,0,0,.35);
        margin-bottom: 22px;
    }

    .hero-title {
        font-size: 38px;
        font-weight: 850;
        letter-spacing: -1.5px;
        margin-bottom: 7px;
        color: #ffffff;
    }

    .hero-subtitle {
        color: #a7adb8;
        font-size: 15px;
    }

    .section-title {
        font-size: 23px;
        font-weight: 800;
        margin-top: 18px;
        margin-bottom: 4px;
        color: #ffffff;
    }

    .section-description {
        color: #969daa;
        font-size: 14px;
        margin-bottom: 18px;
    }

    div[data-testid="stVerticalBlockBorderWrapper"] {
        border-radius: 20px;
        border-color: rgba(255,255,255,.08);
        background: rgba(255,255,255,.025);
    }

    label {
        color: #e7eaf0 !important;
        font-weight: 650 !important;
    }

    input,
    textarea {
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
    }

    div[data-baseweb="input"] {
        background: #11151c !important;
        border-radius: 12px !important;
    }

    div[data-baseweb="input"] input {
        color: #ffffff !important;
        -webkit-text-fill-color: #ffffff !important;
    }

    div[data-baseweb="select"] > div {
        background: #11151c !important;
        border-radius: 12px !important;
        color: #ffffff !important;
    }

    div[data-baseweb="select"] * {
        color: #ffffff !important;
    }

    div.stButton > button {
        width: 100%;
        height: 54px;
        border: 0;
        border-radius: 15px;
        background: linear-gradient(135deg, #2563eb, #7c3aed);
        color: white;
        font-size: 17px;
        font-weight: 800;
        box-shadow: 0 12px 30px rgba(37,99,235,.25);
        transition: .2s ease;
    }

    div.stButton > button:hover {
        transform: translateY(-2px);
        box-shadow: 0 16px 35px rgba(37,99,235,.35);
    }

    .result-card {
        text-align: center;
        padding: 30px 22px;
        border-radius: 22px;
        border: 1px solid rgba(255,255,255,.10);
        background: linear-gradient(
            145deg,
            rgba(255,255,255,.075),
            rgba(255,255,255,.025)
        );
        box-shadow: 0 20px 50px rgba(0,0,0,.35);
    }

    .result-icon {
        font-size: 58px;
        margin-bottom: 8px;
    }

    .result-title {
        font-size: 28px;
        font-weight: 850;
        color: #ffffff;
        margin-bottom: 10px;
    }

    .result-value {
        font-size: 38px;
        font-weight: 900;
        color: #60a5fa;
        margin-bottom: 15px;
    }

    .result-description {
        color: #a5aab5;
        font-size: 14px;
        line-height: 1.7;
    }

    .footer {
        text-align: center;
        color: #686e79;
        font-size: 12px;
        margin-top: 28px;
    }

    @media (max-width: 640px) {
        .block-container {
            padding-left: 1rem;
            padding-right: 1rem;
            padding-top: 1.2rem;
        }

        .hero {
            padding: 22px 20px;
            border-radius: 20px;
        }

        .hero-title {
            font-size: 30px;
        }

        .hero-subtitle {
            font-size: 13px;
        }

        .section-title {
            font-size: 21px;
        }

        .result-title {
            font-size: 23px;
        }

        .result-value {
            font-size: 32px;
        }
    }
    </style>
    """,
    unsafe_allow_html=True
)

st.markdown(
    """
    <div class="hero">
        <div class="hero-title">
            💳 Insurance Charges Predictor
        </div>
        <div class="hero-subtitle">
            Random Forest Machine Learning Model • Built by Ayyan
        </div>
    </div>
    """,
    unsafe_allow_html=True
)

st.markdown(
    """
    <div class="section-title">
        🧾 Customer Information
    </div>

    <div class="section-description">
        Enter the customer's information below to estimate insurance charges.
    </div>
    """,
    unsafe_allow_html=True
)

with st.container(border=True):

    col1, col2 = st.columns(2)

    with col1:
        age = st.slider(
            "Age",
            18,
            100,
            30
        )

        sex = st.selectbox(
            "Sex",
            ["Female", "Male"]
        )

        bmi = st.number_input(
            "BMI",
            min_value=10.0,
            max_value=60.0,
            value=27.9,
            step=0.1,
            format="%.1f"
        )

    with col2:
        children = st.number_input(
            "Number of Children",
            min_value=0,
            max_value=10,
            value=0,
            step=1
        )

        smoker = st.selectbox(
            "Smoker",
            ["No", "Yes"]
        )

        region = st.selectbox(
            "Region",
            [
                "northeast",
                "northwest",
                "southeast",
                "southwest"
            ]
        )

if bmi < 18.5:
    bmi_category = "Underweight"
elif bmi < 25:
    bmi_category = "Normal weight"
elif bmi < 30:
    bmi_category = "Overweight"
else:
    bmi_category = "Obese"

st.markdown(
    f"""
    <div style="
        margin-top:14px;
        padding:13px 16px;
        border-radius:14px;
        background:rgba(59,130,246,.07);
        border:1px solid rgba(59,130,246,.13);
        color:#cbd5e1;
        font-size:14px;
    ">
        <b>BMI category:</b> {bmi_category}
    </div>
    """,
    unsafe_allow_html=True
)

st.write("")

if st.button(
    "💰 Predict Insurance Charges",
    use_container_width=True
):

    raw_input = {
        "age": age,
        "is_female": 1 if sex == "Female" else 0,
        "bmi": bmi,
        "children": children,
        "is_smoker": 1 if smoker == "Yes" else 0,
        "region_northeast": 1 if region == "northeast" else 0,
        "region_northwest": 1 if region == "northwest" else 0,
        "region_southeast": 1 if region == "southeast" else 0,
        "region_southwest": 1 if region == "southwest" else 0,
        "bmi_category_Underweight": 1 if bmi_category == "Underweight" else 0,
        "bmi_category_Normal weight": 1 if bmi_category == "Normal weight" else 0,
        "bmi_category_Overweight": 1 if bmi_category == "Overweight" else 0,
        "bmi_category_Obese": 1 if bmi_category == "Obese" else 0
    }

    input_df = pd.DataFrame([raw_input])

    expected_columns = [
        "age",
        "is_female",
        "bmi",
        "children",
        "is_smoker",
        "region_northeast",
        "region_northwest",
        "region_southeast",
        "region_southwest",
        "bmi_category_Underweight",
        "bmi_category_Normal weight",
        "bmi_category_Overweight",
        "bmi_category_Obese"
    ]

    input_df = input_df[expected_columns]

    input_df[columns_to_scale] = scaler.transform(
        input_df[columns_to_scale]
    )

    prediction = float(model.predict(input_df)[0])

    @st.dialog("Prediction Result", width="small")
    def show_result(value):

        st.html(
            f"""
            <div class="result-card">

                <div class="result-icon">
                    💰
                </div>

                <div class="result-title">
                    Estimated Insurance Charges
                </div>

                <div class="result-value">
                    Rs. {value:,.2f}
                </div>

                <div class="result-description">
                    This estimate was generated using the
                    trained Random Forest regression model
                    based on the provided customer information.
                </div>

            </div>
            """
        )

        st.write("")

        st.caption(
            "This is a machine-learning estimate and not an official insurance quote."
        )
       
            
    show_result(prediction)

st.markdown(
    """
    <div class="footer">
        💳 Insurance Charges Prediction • Machine Learning Project by Ayyan
    </div>
    """,
    unsafe_allow_html=True
)