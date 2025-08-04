from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import joblib

model = joblib.load("model.pkl")
scaler = joblib.load("scaler.pkl")
columns = joblib.load("columns.pkl")


app=FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://heart-disease-predictor-phi.vercel.app/"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class PatientData(BaseModel):
    age: float
    sex: int
    cp: int
    trestbps: float
    chol: float
    fbs: int
    restecg: int
    thalach: float
    exang: int
    oldpeak: float
    slope: int
    ca: int
    thal: int

@app.post('/predict')
def predict(data:PatientData):
    input_data = [getattr(data, col) for col in columns]
    input_scaled = scaler.transform([input_data])
    prediction = model.predict(input_scaled)
    return {"prediction": int(prediction[0])}
