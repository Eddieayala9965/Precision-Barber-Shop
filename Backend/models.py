from pydantic import BaseModel, Field
from typing import List, Optional
from uuid import UUID
from datetime import datetime


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
    instagram_link: Optional[str] = Field(default=None, exclude_none=True)
    

class Services(BaseModel):
    service: Optional[str] = Field(default=None, exclude_none=True)
    price: Optional[int] = Field(default=None, exclude_none=True)
    duration: Optional[int] = Field(default=None, exclude_none=True)

class Appointments(BaseModel):
    Barber_id: Optional[str] = Field(default=None, exclude_none=True)
    service_id: Optional[str] = Field(default=None, exclude_none=True)
    client_id: Optional[str] = Field(default=None, exclude_none=True)
    appointment_date: Optional[str] = Field(default=None, exclude_none=True)
    client_name: Optional[str] = Field(default=None, exclude_none=True)
    client_phone: Optional[str] = Field(default=None, exclude_none=True)
    client_email: Optional[str] = Field(default=None, exclude_none=True)
    
class BookingRequest(BaseModel):
    barber_id: str
    service_id: str
    customer_name: str
    customer_phone: str
    customer_email: str
    booking_date: datetime


    
    
    
    