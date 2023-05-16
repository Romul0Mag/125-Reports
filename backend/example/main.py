from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from db_connector import get_session
from models import Addresses, Reports
 

app = FastAPI()

@app.post("/reports")
def create_report(report: Reports):
    session = get_session()
    new_reports = Reports(**report.dict())
    session.add(new_reports)
    session.commit()
    session.refresh(new_reports)
    return new_reports

@app.post("/addresses")
def create_address(address: Addresses):
    session = get_session()
    new_address = Addresses(**address.dict())
    session.add(new_address)
    session.commit()
    session.refresh(new_address)
    return new_address