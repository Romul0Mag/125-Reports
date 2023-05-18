from pydantic import BaseModel


class MeasureBase(BaseModel):
    report_id: str
    type: str
    v: float
    c: float
    p: float
    total_current: float
    total_pot: float

class MeasureCreate(MeasureBase):
    pass

class Measure(MeasureBase):
    measure_id: str
    class Config:
        orm_mode = True