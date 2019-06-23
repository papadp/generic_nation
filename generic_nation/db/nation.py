import logging

from sqlalchemy import Column, Integer, String

from generic_nation.db import Base


class Nation(Base):
    __tablename__ = 'nation'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)

