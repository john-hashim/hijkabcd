from fastapi import FastAPI

from app.rotuers.wind import router as wind_router

app = FastAPI(title="Forecast API")

app.include_router(wind_router)

@app.get("/")
def read_root() -> dict[str, str]:
    return {"message": "FastApi backend is running"}
