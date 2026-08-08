
import streamlit as st
import pandas as pd
import joblib as jl


# =========================================================
# PAGE CONFIG
# =========================================================

st.set_page_config(
    page_title="Heart Stroke Risk Prediction",
    page_icon="❤️",
    layout="centered"
)


# =========================================================
# LOAD MODEL FILES
# =========================================================

model = jl.load("pickles/model.pkl")
expected_columns = jl.load("pickles/columns.pkl")
scalar = jl.load("pickles/scalar.pkl")
columns_to_scale = jl.load("pickles/columns_to_scale.pkl")


# =========================================================
# DARK PREMIUM THEME
# =========================================================

st.markdown(
    """
    <style>

    /* ================================
       APP BACKGROUND
    ================================= */

    .stApp {
        background: #050505;
        color: #ffffff;
    }


    /* ================================
       MAIN CONTAINER
    ================================= */

    .block-container {
        max-width: 850px;
        padding-top: 25px;
        padding-bottom: 50px;
    }


    /* ================================
       HEADER
    ================================= */

    .hero-title {
        font-size: 36px;
        font-weight: 800;
        color: #ffffff;

        margin-top: -15px;
        margin-left: -10px;
        margin-bottom: 4px;
    }


    .hero-subtitle {
        font-size: 15px;
        font-weight: 500;
        color: #9ca3af;

        margin-left: -7px;
        margin-bottom: 35px;
    }


    /* ================================
       SECTION TITLE
    ================================= */

    .section-title {
        font-size: 25px;
        font-weight: 750;
        color: #ffffff;

        margin-bottom: 5px;
    }


    .section-description {
        font-size: 14px;
        color: #9ca3af;

        margin-bottom: 25px;
        line-height: 1.6;
    }


    /* ================================
       LABELS
    ================================= */

    label {
        color: #e5e7eb !important;
        font-weight: 600 !important;
    }


    /* ================================
       INPUTS
    ================================= */

    div[data-baseweb="select"] > div {

        background: #111111 !important;

        border: 1px solid #27272a !important;

        border-radius: 12px !important;

        color: #ffffff !important;
    }


    div[data-baseweb="input"] > div {

        background: #111111 !important;

        border: 1px solid #27272a !important;

        border-radius: 12px !important;
    }


    input {
        color: #ffffff !important;
    }


    div[data-baseweb="select"] span {
        color: #ffffff !important;
    }


    /* ================================
       INPUT HOVER
    ================================= */

    div[data-baseweb="select"] > div:hover,
    div[data-baseweb="input"] > div:hover {

        border-color: #52525b !important;
    }


    /* ================================
       PREDICT BUTTON
    ================================= */

    div.stButton > button {

        width: 100%;

        height: 58px;

        border: none;

        border-radius: 15px;

        background:
            linear-gradient(
                135deg,
                #ef4444,
                #b91c1c
            );

        color: #ffffff;

        font-size: 18px;

        font-weight: 750;

        margin-top: 25px;

        box-shadow:
            0 10px 30px
            rgba(220, 38, 38, 0.25);

        transition: all 0.2s ease;
    }


    div.stButton > button:hover {

        transform: translateY(-2px);

        background:
            linear-gradient(
                135deg,
                #f43f5e,
                #dc2626
            );

        box-shadow:
            0 15px 40px
            rgba(220, 38, 38, 0.40);
    }


    div.stButton > button:active {
        transform: translateY(0);
    }


    /* ================================
       DIALOG
    ================================= */

    div[data-testid="stDialog"] > div {

        background: #0b0b0b !important;

        border-radius: 24px !important;

        border:
            1px solid #27272a !important;

        box-shadow:
            0 25px 80px
            rgba(0, 0, 0, 0.75);
    }


    /* ================================
       FOOTER
    ================================= */

    .footer-text {

        text-align: center;

        color: #52525b;

        font-size: 12px;

        margin-top: 35px;
    }


    /* ================================
       REMOVE STREAMLIT DEFAULT UI
    ================================= */

    #MainMenu {
        visibility: hidden;
    }

    footer {
        visibility: hidden;
    }

    header {
        background: transparent !important;
    }

    </style>
    """,
    unsafe_allow_html=True
)


# =========================================================
# HEADER
# =========================================================

st.markdown(
    '<div class="hero-title">❤️ Heart Stroke Risk Prediction</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="hero-subtitle">'
    'Machine Learning Prediction System by Ayyan'
    '</div>',
    unsafe_allow_html=True
)


# =========================================================
# PATIENT INFORMATION
# =========================================================

st.markdown(
    '<div class="section-title">🩺 Patient Information</div>',
    unsafe_allow_html=True
)

st.markdown(
    '<div class="section-description">'
    'Provide the patient\'s medical information below '
    'to generate a heart stroke risk prediction.'
    '</div>',
    unsafe_allow_html=True
)


# =========================================================
# INPUTS
# =========================================================

age = st.slider(
    "Age",
    min_value=18,
    max_value=100,
    value=40
)


sex = st.selectbox(
    "Sex",
    ["Male", "Female"]
)


chest_pain = st.selectbox(
    "Chest Pain Type",
    ["ATA", "NAP", "TA", "ASY"]
)


resting_bp = st.number_input(
    "Resting Blood Pressure (mm Hg)",
    min_value=80,
    max_value=200,
    value=120
)


cholesterol = st.number_input(
    "Cholesterol (mg/dL)",
    min_value=100,
    max_value=600,
    value=200
)


fasting_bs = st.selectbox(
    "Fasting Blood Sugar > 120 mg/dL",
    [0, 1]
)


resting_ecg = st.selectbox(
    "Resting ECG",
    ["Normal", "ST", "LVH"]
)


max_hr = st.slider(
    "Maximum Heart Rate",
    min_value=60,
    max_value=220,
    value=150
)


exercise_angina = st.selectbox(
    "Exercise-Induced Angina",
    ["Yes", "No"]
)


oldpeak = st.slider(
    "Oldpeak (ST Depression)",
    min_value=0.0,
    max_value=6.0,
    value=1.0,
    step=0.1
)


st_slope = st.selectbox(
    "ST Slope",
    ["Up", "Flat", "Down"]
)


# =========================================================
# PREDICTION RESULT DIALOG
# =========================================================


@st.dialog("Prediction Result", width="small", dismissible=True)
def show_result(prediction):

    if prediction == 1:

        st.markdown(
            """
            <style>
            .risk-icon {
                font-size: 64px;
                text-align: center;
                margin-bottom: 10px;
            }

            .risk-title-high {
                text-align: center;
                color: #ef4444;
                font-size: 30px;
                font-weight: 800;
                margin-bottom: 5px;
            }

            .risk-subtitle {
                text-align: center;
                color: #f4f4f5;
                font-size: 18px;
                font-weight: 650;
                margin-bottom: 12px;
            }

            .risk-description {
                text-align: center;
                color: #a1a1aa;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            </style>
            """,
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-icon">⚠️</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-title-high">High Risk</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-subtitle">'
            'Heart Disease Risk Detected'
            '</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-description">'
            'The model predicts a higher risk based on '
            'the provided medical information.'
            '</div>',
            unsafe_allow_html=True
        )

        st.warning(
            "⚠️ Please consult a qualified medical professional "
            "for proper evaluation."
        )

    else:

        st.markdown(
            """
            <style>
            .risk-icon {
                font-size: 64px;
                text-align: center;
                margin-bottom: 10px;
            }

            .risk-title-low {
                text-align: center;
                color: #22c55e;
                font-size: 30px;
                font-weight: 800;
                margin-bottom: 5px;
            }

            .risk-subtitle {
                text-align: center;
                color: #f4f4f5;
                font-size: 18px;
                font-weight: 650;
                margin-bottom: 12px;
            }

            .risk-description {
                text-align: center;
                color: #a1a1aa;
                font-size: 14px;
                line-height: 1.6;
                margin-bottom: 20px;
            }
            </style>
            """,
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-icon">✅</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-title-low">Low Risk</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-subtitle">'
            'No High Risk Detected'
            '</div>',
            unsafe_allow_html=True
        )

        st.markdown(
            '<div class="risk-description">'
            'The model predicts a lower risk based on '
            'the provided medical information.'
            '</div>',
            unsafe_allow_html=True
        )

        st.success(
            "✅ The prediction indicates a lower estimated risk."
        )



# =========================================================
# PREDICT
# =========================================================

if st.button(
    "🔍  Predict Heart Disease Risk",
    use_container_width=True
):

    # ---------------------------------------------
    # CREATE RAW INPUT
    # ---------------------------------------------

    raw_input = {

        "age": age,

        "restingbp": resting_bp,

        "cholesterol": cholesterol,

        "fastingbs": fasting_bs,

        "maxhr": max_hr,

        "oldpeak": oldpeak,

        "is_male":
            1 if sex == "Male" else 0,

        "chestpaintype_" + chest_pain:
            1,

        "restingecg_" + resting_ecg:
            1,

        "exercise_angina":
            1 if exercise_angina == "Yes" else 0,

        "st_slope_" + st_slope:
            1
    }


    # ---------------------------------------------
    # DATAFRAME
    # ---------------------------------------------

    input_df = pd.DataFrame(
        [raw_input]
    )


    # ---------------------------------------------
    # ADD MISSING COLUMNS
    # ---------------------------------------------

    for col in expected_columns:

        if col not in input_df.columns:

            input_df[col] = 0


    # ---------------------------------------------
    # CORRECT COLUMN ORDER
    # ---------------------------------------------

    input_df = input_df[
        expected_columns
    ]


    # ---------------------------------------------
    # SCALE NUMERICAL FEATURES
    # ---------------------------------------------

    input_df[
        columns_to_scale
    ] = scalar.transform(
        input_df[
            columns_to_scale
        ]
    )


    # ---------------------------------------------
    # PREDICTION
    # ---------------------------------------------

    prediction = model.predict(
        input_df
    )[0]


    # ---------------------------------------------
    # SHOW RESULT
    # ---------------------------------------------

    show_result(prediction)


# =========================================================
# FOOTER
# =========================================================

st.markdown(
    '<div class="footer-text">'
    'Built with ❤️ and Machine Learning by Ayyan'
    '</div>',
    unsafe_allow_html=True
)