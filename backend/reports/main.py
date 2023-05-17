from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
import pandas as pd
from db_connector import Db
from fastapi_models import ReportBase, ReportCreate, Report

app = FastAPI()

@app.post("/reports/", response_model=Report)
def create_user(report: ReportCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(report))
    try:
        db.insert_dataframe_reports(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_report = db.get_report_from_equipment_id(report.equipment_id)
    if created_report is None:
        raise HTTPException(status_code=400, detail="Report not created")
    print(created_report)
    return created_report