from fastapi import HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import PtrCreate, Ptr
from typing import List


router = APIRouter()

@router.post("/ptrs/", response_model=Ptr)
def create_ptr(ptr: PtrCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(ptr))
    try:
        db.insert_dataframe_ptrs(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_ptr = db.get_ptr_from_report_id(ptr.report_id)
    if created_ptr is None:
        raise HTTPException(status_code=400, detail="Ptr not created")
    print(created_ptr)
    return Ptr.from_orm(created_ptr)


@router.get("/ptrs/company_name={company_name}", response_model=List[Ptr])
def read_ptrs(company_name: str):
    db = Db()

    ptrs = db.get_ptrs_from_company_name(company_name)
    if ptrs is None:
        raise HTTPException(status_code=404, detail="Ptr not found")
    fast_api_ptrs = []
    for ptr in ptrs:
        obj = Ptr.from_orm(ptr)
        fast_api_ptrs.append(obj)
    return fast_api_ptrs