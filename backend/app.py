from fastapi import FastAPI, Depends, HTTPException, status
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError, jwt
from datetime import datetime, timedelta
from passlib.context import CryptContext
from models import User
from database import SessionLocal, engine
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import secrets
import logging
logging.getLogger('passlib').setLevel(logging.ERROR)

app = FastAPI()
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

# Cors Control - Outside applications cannot hit our FastAPI application
# Only allow requests from localhost: 3000 can interact with this API
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], #Allow all methods
    allow_headers=["*"], #Allow all headers
)

# Creates a database session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# Hash passwords in the future
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") 

# JWT Key
SECRET_KEY = secrets.token_hex(32)
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Pydantic model that defines the structure of the user data
class UserCreate(BaseModel):
    email: str
    username: str
    password: str

# Queries the database to get a user by their username
def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()

# Hashes the provided password
# Creates a new user wit the proper username and hashed password
# Adds the user to the database
def create_user(db: Session, user: UserCreate):
    hashed_password = pwd_context.hash(user.password)
    db_user = User(email=user.email, username=user.username, hashed_password=hashed_password)
    db.add(db_user)
    # Commit pending changes to the database
    db.commit()
    return "complete"

# Endpoint to Create A New User
# Checks if the user already exists: if so, return an error
# If user doesn't exist, create a new user
@app.post("/register")
def register_user(user: UserCreate, db: Session = Depends(get_db)):
    db_user = get_user_by_username(db, username=user.username)
    if db_user:
        raise HTTPException(status_code=400, detail="Username already exists")
    else:
        return create_user(db=db, user=user)
    
# Authenticate User and Check Verification
# Check if the user exists in the database
# If so, check if the password is correct
# Return the user object is authentication succeeds
def authenticate_user(username: str, password: str, db: Session):
    user = db.query(User).filter(User.username == username).first()
    if not user:
        return False
    if not pwd_context.verify(password, user.hashed_password):
        return False
    return user

# Create Acces Token
# Encodes user data into a JWT
def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# Endpoint for Token
# Authenticates the user
# If the user is authenticated, generate a JWT token and return it
@app.post("/token")
def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = authenticate_user(form_data.username, form_data.password, db)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.username}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}

# Method to Verify Token
# Decodes the token and checks if the username is in the payload
def verify_token(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        if username is None:
            raise HTTPException(status_code=403, detail="Invalid token")
    except JWTError:
        raise HTTPException(status_code=403, detail="Invalid token")
    
# Endpoint to Verify Token
# Accepts a token and verifies its validity
@app.get("/verify-token/{token}")
async def verify_user_token(token: str):
    verify_token(token)
    return {"message": "Token is valid"}

# WorkFlow
# 1. User registers at /register endpoint by submitting a username and password. If new, user is added to the database
# 2. User logs in at /token endpoint by submitting a username and password. If successful, a JWT token is returned
# 3. User can verify the token at /verify-token/{token} endpoint by submitting the token.