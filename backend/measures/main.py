from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import MeasureCreate, Measure
from typing import List

#app = FastAPI()
router = APIRouter()

#@app.post("/measures/", response_model=Measure)
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


#@app.get("/measures/{company_name}", response_model=List[Measure])
@router.get("/measures/{company_name}", response_model=List[Measure])
def read_measures(company_name: str):
    db = Db()

    measures = db.get_measures_from_company_name(company_name)
    if measures is None:
        raise HTTPException(status_code=404, detail="Measure not found")
    fast_api_measures = []
    for measure in measures:
        obj = Measure.from_orm(measure)
        fast_api_measures.append(obj)
    return fast_api_measures