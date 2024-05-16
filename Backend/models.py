from pydantic import BaseModel
from typing import List


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
    
    