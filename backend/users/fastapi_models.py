from pydantic import BaseModel


class UserBase(BaseModel):
    email: str
    name: str
    phone_number: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    user_id: str
    class Config:
        orm_mode = True