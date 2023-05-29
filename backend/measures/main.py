from fastapi import HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import MeasureCreate, Measure
from typing import List

router = APIRouter()

@router.post("/measures/", response_model=Measure)
def create_measure(measure: MeasureCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(measure))
    try:
        db.insert_dataframe_measures(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_measure = db.get_measure_from_report_id(measure.report_id)
    if created_measure is None:
        raise HTTPException(status_code=400, detail="Measure not created")
    print(created_measure)
    return Measure.from_orm(created_measure)


@router.get("/measures/company_name={company_name}", response_model=List[Measure])
def read_measures_from_company_name(company_name: str):
    db = Db()

    measures = db.get_measures_from_company_name(company_name)
    if measures is None:
        raise HTTPException(status_code=404, detail="Measure not found")
    fast_api_measures = []
    for measure in measures:
        obj = Measure.from_orm(measure)
        fast_api_measures.append(obj)
    return fast_api_measures


@router.get("/measures/equipment_id={equipment_id}", response_model=List[Measure])
def read_measures_from_equipment_id(equipment_id: str):
    db = Db()

    measures = db.get_measures_from_equipment_id(equipment_id)
    if measures is None:
        raise HTTPException(status_code=404, detail="Measure not found")
    fast_api_measures = []
    for measure in measures:
        obj = Measure.from_orm(measure)
        fast_api_measures.append(obj)
    return fast_api_measures