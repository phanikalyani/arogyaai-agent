from sqlalchemy import Column, Integer, String
from app.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True)
    password = Column(String)
    age = Column(Integer)
    gender = Column(String)
    conditions = Column(String)
    allergies = Column(String)