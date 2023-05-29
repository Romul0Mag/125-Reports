from fastapi import HTTPException, APIRouter
from fastapi.encoders import jsonable_encoder
import pandas as pd
from .db_connector import Db
from .fastapi_models import PhotoCreate, Photo
from typing import List


router = APIRouter()

@router.post("/photos/", response_model=Photo)
def create_photo(photo: PhotoCreate):
    db = Db()
    # convert Pydantic model to DataFrame
    df = pd.json_normalize(jsonable_encoder(photo))
    try:
        db.insert_dataframe(df)
        db.commit()
    except Exception as e:
        db.rollback()
    
    created_photo = db.get_photos_from_report_id(photo.report_id)[0]
    if created_photo is None:
        raise HTTPException(status_code=400, detail="Photo not created")
    print(created_photo)
    return Photo.from_orm(created_photo)


@router.get("/photos/company_name={company_name}", response_model=List[Photo])
def read_photos_from_company_name(company_name: str):
    db = Db()

    photos = db.get_photos_from_company_name(company_name)
    if photos is None:
        raise HTTPException(status_code=404, detail="Photo not found")
    fast_api_photos = []
    for photo in photos:
        obj = Photo.from_orm(photo)
        fast_api_photos.append(obj)
    return fast_api_photos

@router.get("/photos/report_id={report_id}", response_model=List[Photo])
def read_photos_from_report_id(report_id: str):
    db = Db()

    photos = db.get_photos_from_report_id(report_id)
    if photos is None:
        raise HTTPException(status_code=404, detail="Photo not found")
    fast_api_photos = []
    for photo in photos:
        obj = Photo.from_orm(photo)
        fast_api_photos.append(obj)
    return fast_api_photos

@router.get("/photos/user_id={user_id}", response_model=List[Photo])
def read_photos_from_user_id(user_id: str):
    db = Db()

    photos = db.get_photos_from_user_id(user_id)
    if photos is None:
        raise HTTPException(status_code=404, detail="Photo not found")
    fast_api_photos = []
    for photo in photos:
        obj = Photo.from_orm(photo)
        fast_api_photos.append(obj)
    return fast_api_photos