from pydantic import BaseModel
from datetime import datetime


class EquipmentBase(BaseModel):
    manufacturer: str
    model: str
    power: str
    series_number: str
    fabrication_date: str | datetime

class EquipmentCreate(EquipmentBase):
    pass

class Equipment(EquipmentBase):
    equipment_id: str
    class Config:
        orm_mode = True