from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.rotuers.wind import router as wind_router

app = FastAPI(title="Forecast API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)

app.include_router(wind_router)

@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "FastApi backend is running"}
