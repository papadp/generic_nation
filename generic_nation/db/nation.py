from sqlalchemy import Column, Integer, String, JSON
from sqlalchemy.orm import relationship

from generic_nation.db import Base


class Nation(Base):
    __tablename__ = 'nation'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    # columns = relationship("MenuColumn", back_populates="nation")
    columns = Column(JSON, nullable=False)


    def __init__(self, name, columns):
        self.name = name
        self.columns = columns

