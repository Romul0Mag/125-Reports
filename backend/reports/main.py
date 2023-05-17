from fastapi import FastAPI, HTTPException
from fastapi.encoders import jsonable_encoder
import pandas as pd
from db_connector import Db
from fastapi_models import ReportBase, ReportCreate, Report
from typing import List

app = FastAPI()

@app.post("/reports/", response_model=Report)
def create_report(report: ReportCreate):
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
    return Report.from_orm(created_report)


@app.get("/reports/{company_name}", response_model=List[Report])
def read_report(company_name: str):
    db = Db()

    reports = db.get_report_from_company_name(company_name)
    if reports is None:
        raise HTTPException(status_code=404, detail="Report not found")
    fast_api_reports = []
    for report in reports:
        obj = Report.from_orm(report)
        fast_api_reports.append(obj)
    return fast_api_reports