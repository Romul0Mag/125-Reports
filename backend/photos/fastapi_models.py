from pydantic import BaseModel


class PhotoBase(BaseModel):
    report_id: str
    photo_id: str


class PhotoCreate(PhotoBase):
    pass

class Photo(PhotoBase):
    class Config:
        orm_mode = True