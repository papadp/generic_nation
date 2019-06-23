from enum import Enum as python_enum

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base

engine = create_engine('postgresql://postgres:password_123456@postgres/postgres')
Base = declarative_base()
