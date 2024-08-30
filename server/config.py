from dotenv import load_dotenv
import os
import redis
from datetime import timedelta


load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]

    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_ECHO = True
    SQLALCHEMY_DATABASE_URI = rf"sqlite:///./db.sqlite"
