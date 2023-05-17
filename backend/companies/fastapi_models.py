from pydantic import BaseModel


class CompanyBase(BaseModel):
    address_id: str
    name: str
    phone_number: str

class CompanyCreate(CompanyBase):
    pass

class Company(CompanyBase):
    company_id: str
    class Config:
        orm_mode = True