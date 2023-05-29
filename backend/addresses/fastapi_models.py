from pydantic import BaseModel


class AddressBase(BaseModel):
    street: str
    city: str
    state: str
    cep: str
    country: str
    number: int

class AddressCreate(AddressBase):
    pass

class Address(AddressBase):
    address_id: str
    class Config:
        orm_mode = True