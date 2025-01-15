from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os

mysql_password = os.getenv("MYSQL_PASSWORD")

# Configures a SQLAlchemy connection to my MySQL database
SQLALCHEMY_DATABASE_URL = f"mysql+pymysql://root:{mysql_password}@localhost:3306/jobtracker"
engine = create_engine(SQLALCHEMY_DATABASE_URL)

# SessionLocal provides database sessions for each request
# Base is the base class for defining the database models
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()