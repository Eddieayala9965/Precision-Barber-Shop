from pydantic import BaseModel
from typing import List


class Item(BaseModel):
    amount: int
    quantity: int
    price: int
    
class Barber(BaseModel):
    email: str
    password: str
    