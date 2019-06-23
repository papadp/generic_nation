from sqlalchemy import Column, Integer, String, Enum, ForeignKey, Float, JSON
from sqlalchemy.orm import relationship

from generic_nation.db import Base


class Order(Base):
    __tablename__ = 'order'

    id = Column(Integer, primary_key=True, index=True)
    rows = Column(JSON, nullable=False)

    def __init__(self):

        self.rows = []

