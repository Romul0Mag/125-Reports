from pydantic import BaseModel


class ReportBase(BaseModel):
    company_id: str
    equipment_id: str
    user_id: str
    type: str

class ReportCreate(ReportBase):
    pass

class Report(ReportBase):
    report_id: str
    class Config:
        orm_mode = True