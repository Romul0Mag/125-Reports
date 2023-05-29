from fastapi import HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import EquipmentCreate, Equipment
from typing import List


router = APIRouter()

@router.post("/equipments/", response_model=Equipment)
def create_equipment(equipment: EquipmentCreate):
    db = Db()
    df = pd.json_normalize(jsonable_encoder(equipment))
    df['fabrication_date'] = pd.to_datetime(df['fabrication_date'], format="%d/%m/%Y")
    try:
        db.insert_dataframe_equipment(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_equipment = db.get_equipment_from_series_number(equipment.series_number)
    print(created_equipment)
    if created_equipment is None:
        raise HTTPException(status_code=400, detail="Equipment not created")
    print(created_equipment)
    return Equipment.from_orm(created_equipment)


@router.get("/equipments/series_number={series_number}", response_model=List[Equipment])
def read_equipment(series_number: str):
    db = Db()

    equipments = db.get_equipments_from_series_number(series_number)
    if equipments is None:
        raise HTTPException(status_code=404, detail="Equipment not found")
    fast_api_equipment = []
    for equipment in equipments:
        obj = Equipment.from_orm(equipment)
        fast_api_equipment.append(obj)
    return fast_api_equipment