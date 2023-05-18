from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import AddressCreate, Address
from typing import List

#app = FastAPI()
router = APIRouter()

#@app.post("/addresses/", response_model=Address)
@router.post("/addresses/", response_model=Address)
def create_report(address: AddressCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(address))
    try:
        db.insert_dataframe_addresses(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_address = db.get_address_from_cep(address.cep)
    if created_address is None:
        raise HTTPException(status_code=400, detail="Address not created")
    print(created_address)
    return Address.from_orm(created_address)


#@app.get("/addresses/{cep}", response_model=List[Address])
@router.get("/addresses/{cep}", response_model=List[Address])
def read_address(cep: str):
    db = Db()

    addresses = db.get_addresses_from_cep(cep)
    if addresses is None:
        raise HTTPException(status_code=404, detail="Address not found")
    fast_api_addresses = []
    for address in addresses:
        obj = Address.from_orm(address)
        fast_api_addresses.append(obj)
    return fast_api_addresses