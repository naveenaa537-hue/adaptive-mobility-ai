from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
import models

app = FastAPI()

# Create all tables in the database
Base.metadata.create_all(bind=engine)

# Allow frontend (vyro-web) to talk to this backend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"message": "Adaptive Mobility Backend is running"}