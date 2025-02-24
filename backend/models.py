from sqlalchemy import Column, Integer, String, ForeignKey, JSON
from sqlalchemy.orm import relationship
from database import Base
from database import engine

# User model
# Primary Key: id - Allows each user to be uniquely identified
class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(255), unique=True, index=True)
    email = Column(String(255), unique=True, index=True)
    hashed_password = Column(String(255))
    resumes = relationship("Resume", back_populates="user")

class Resume(Base):
    __tablename__ = "resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    personal_info = Column(JSON) 
    education = Column(JSON)      
    experiences = Column(JSON)
    user = relationship("User", back_populates="resumes")

# Goes through the models associated with the Base class and checks if the table exists in the database
Base.metadata.create_all(bind=engine)