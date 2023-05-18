from pydantic import BaseModel


class PtrBase(BaseModel):
    report_id: str
    tension: float
    resistence: float


class PtrCreate(PtrBase):
    pass

class Ptr(PtrBase):
    ptr_id: str
    class Config:
        orm_mode = True