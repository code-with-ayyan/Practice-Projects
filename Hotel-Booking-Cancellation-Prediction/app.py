from fastapi import FastAPI
from pydantic import BaseModel, Field
from fastapi.middleware.cors import CORSMiddleware
from typing import Literal
import pandas as pd 
import joblib as jl


app = FastAPI()

allowed_origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


pipeline = jl.load("pipeline.pkl")

class DataModel(BaseModel):
    
    hotel: Literal[
        "City Hotel",
        "Resort Hotel"
    ]

    lead_time: int = Field(
        ge=0,
    )

    stays_in_weekend_nights: int = Field(
        ge=0
    )

    stays_in_week_nights: int = Field(
        ge=0
    )

    adults: int = Field(
        ge=0
    )

    children: int = Field(
        ge=0
    )

    babies: int = Field(
        ge=0
    )

    meal: Literal[
        "BB",
        "FB",
        "HB",
        "SC",
        "Undefined"
    ]

    country: Literal[
        "Belgium",
        "Brazil",
        "France",
        "Germany",
        "Ireland",
        "Italy",
        "Netherlands",
        "Portugal",
        "Spain",
        "United Kingdom",
        "others"
    ]

    market_segment: Literal[
        "Aviation",
        "Complementary",
        "Corporate",
        "Direct",
        "Groups",
        "Offline TA/TO",
        "Online TA"
    ]

    distribution_channel: Literal[
        "Corporate",
        "Direct",
        "GDS",
        "TA/TO",
        "Undefined"
    ]

    is_repeated_guest: Literal[
        1,
        0
    ]

    previous_cancellations: int = Field(
        ge=0
    )

    previous_bookings_not_canceled: int = Field(
        ge=0
    )

    booking_changes: int = Field(
        ge=0
    )

    deposit_type: Literal[
        "No Deposit",
        "Non Refund",
        "Refundable"
    ]

    customer_type: Literal[
        "Contract",
        "Group",
        "Transient",
        "Transient-Party"
    ]

    adr: float = Field(
        ge=0,
    )

    required_car_parking_spaces: int = Field(
        ge=0
    )

    total_of_special_requests: int = Field(
        ge=0
    )

    room_type_changed: Literal[
        1,
        0
    ]    


class ResponseModel(BaseModel):
    
    prediction : int
    cancellation_probability : float
    
    
    
def get_cancellation_probability(input_df):
    
    if not hasattr(pipeline, "predict_proba"):
        return None

    classes = list(pipeline.classes_)
    if 1 not in classes:
        return None

    probabilities = pipeline.predict_proba(input_df)[0]
    return float(probabilities[classes.index(1)])


@app.post('/predict', response_model = ResponseModel)

def predict(data : DataModel):
    
    input_row = data.model_dump()
    
    input_row["total_guests"] = data.adults + data.children + data.babies
    
    input_df = pd.DataFrame([input_row])
    
    prediction = pipeline.predict(input_df)[0]
    
    return ResponseModel(
        prediction=prediction,
        cancellation_probability=get_cancellation_probability(input_df),
    )