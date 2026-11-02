from datetime import date as Date

import httpx
from fastapi import APIRouter, HTTPException

router = APIRouter(
    prefix="/api/wind",
    tags=["wind"]
)

ELEXON_URL = "https://data.elexon.co.uk/bmrs/api/v1/datasets/FUELHH/stream"

@router.get("/actuals")
async def get_wind_actuals(date: Date):
    params = {
        "settlementDateFrom": date.isoformat(),
        "settlementDateTo": date.isoformat(),
        "fuelType": "WIND",
    }

    try:
        async with httpx.AsyncClient(timeout=30.0) as client:
            response = await client.get(ELEXON_URL, params=params)
            response.raise_for_status()
    except httpx.HTTPError as exc:
        raise HTTPException(
            status_code=502,
            detail="Unable to fetch wind generation. Please try again.",
        ) from exc
    return response.json()
