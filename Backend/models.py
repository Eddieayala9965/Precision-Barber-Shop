from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID


class Item(BaseModel):
    amount: int
    quantity: int
    price: int
    
class Barber(BaseModel):
    email: str
    password: str


class Barbers(BaseModel):
    first_name: Optional[str] = Field(default=None, exclude_none=True)
    last_name: Optional[str] = Field(default=None, exclude_none=True)
    email: Optional[str] = Field(default=None, exclude_none=True)
    phone: Optional[str] = Field(default=None, exclude_none=True)
    bio: Optional[str] = Field(default=None, exclude_none=True)
    

class Services(BaseModel):
    service: Optional[str] = Field(default=None, exclude_none=True)
    price: Optional[int] = Field(default=None, exclude_none=True)



    
    
    
    