from fastapi import FastAPI, HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import UserCreate, User
from typing import List

#app = FastAPI()
router = APIRouter()

#@app.post("/users/", response_model=User)
@router.post("/users/", response_model=User)
def create_user(user: UserCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(user))
    try:
        db.insert_dataframe_users(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_user = db.get_user_from_user_email(user.email)
    if created_user is None:
        raise HTTPException(status_code=400, detail="User not created")
    print(created_user)
    return User.from_orm(created_user)


#@app.get("/users/{user_email}", response_model=List[User])
@router.get("/users/{user_email}", response_model=List[User])
def read_report(user_email: str):
    db = Db()
    users = db.get_users_from_user_email(user_email)
    if users is None:
        raise HTTPException(status_code=404, detail="User not found")
    fast_api_users = []
    for user in users:
        obj = User.from_orm(user)
        fast_api_users.append(obj)
    return fast_api_users