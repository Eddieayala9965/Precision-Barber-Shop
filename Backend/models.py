from pydantic import BaseModel
from typing import List
from uuid import UUID


class Item(BaseModel):
    amount: int
    quantity: int
    price: int
    
class Barber(BaseModel):
    email: str
    password: str


class Barbers(BaseModel):
    first_name: str
    last_name: str
    email: str
    phone: str
    bio: str
    
class Services(BaseModel):
    service: str
    price: int

    
    
    