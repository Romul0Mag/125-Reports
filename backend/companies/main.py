from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import CompanyBase, CompanyCreate, Company
from typing import List

#app = FastAPI()
router = APIRouter()

#@app.post("/companies/", response_model=Company)
@router.post("/companies/", response_model=Company)
def create_company(company: CompanyCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(company))
    try:
        db.insert_dataframe_companies(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_company = db.get_company_from_address_id(company.address_id)
    if created_company is None:
        raise HTTPException(status_code=400, detail="Company not created")
    print(created_company)
    return Company.from_orm(created_company)


#@app.get("/companies/{company_name}", response_model=List[Company])
@router.get("/companies/{company_name}", response_model=List[Company])
def read_company(company_name: str):
    db = Db()

    companies = db.get_company_from_company_name(company_name)
    if companies is None:
        raise HTTPException(status_code=404, detail="Company not found")
    fast_api_companies = []
    for company in companies:
        obj = Company.from_orm(company)
        fast_api_companies.append(obj)
    return fast_api_companies