from sqlalchemy import (
    ARRAY,
    TIME,
    TIMESTAMP,
    Boolean,
    Column,
    Enum,
    Float,
    ForeignKey,
    ForeignKeyConstraint,
    Integer,
    String,
    Text,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

ReportTypes = Enum("preventiva", "corretiva", name="report_types_enum")
MeasureTypes = Enum("entrada", "saida", name="measure_types_enum")

class Users (Base):
    __tablename__ = "users"

    user_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    name = Column(Text, nullable=False, unique=True)
    phone_number = Column(Text, nullable=False, unique=True)
    email = Column(Text, nullable=False, unique=True)

    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)


class Equipments(Base):
    __tablename__ = "equipments"

    equipment_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    manufacturer = Column(Text, nullable=False)
    model = Column(Text, nullable=False)
    power = Column(Text, nullable=False)
    series_number = Column(Text, nullable=False, unique=True)
    fabrication_date = Column(TIMESTAMP, nullable=False)
    has_network_card = Column(Boolean, nullable=False, server_default="FALSE", index=True)
    has_eth_cable = Column(Boolean, nullable=False, server_default="FALSE", index=True)

    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)


class Addresses(Base):
    __tablename__ = "addresses"

    address_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    street = Column(Text, nullable=False)
    city = Column(Text, nullable=False)
    state = Column(Text, nullable=False)
    cep = Column(Text, nullable=False)
    country = Column(Text, nullable=False)
    number = Column(Integer, nullable=True)


class Companies(Base):
    __tablename__ = "companies"

    company_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    address_id = Column(UUID, ForeignKey(Addresses.address_id), nullable=False)
    name = Column(Text, nullable=False, unique=True)
    phone_number = Column(Text, nullable=False, unique=True)

    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)


class Reports(Base):
    __tablename__ = "reports"

    report_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    company_id = Column(UUID, ForeignKey(Companies.company_id), nullable=False)
    equipment_id = Column(UUID, ForeignKey(Equipments.equipment_id), nullable=False)
    user_id = Column(UUID, ForeignKey(Users.user_id), nullable=False)

    type = Column(ReportTypes, nullable=False)

    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)


class Measures(Base):
    __tablename__ = "measures"

    measure_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    report_id = Column(UUID, ForeignKey(Reports.report_id), nullable=False)

    type = Column(MeasureTypes, nullable=False)

    v = Column(Float, nullable=True)
    c = Column(Float, nullable=True)
    p = Column(Float, nullable=True)

    total_current = Column(Float, nullable=True)
    total_pot = Column(Float, nullable=True)

    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)


class PreventiveTensionResistence(Base):
    __tablename__ = "preventive_tension_resistence"

    ptr_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    report_id = Column(UUID, ForeignKey(Reports.report_id), nullable=False)

    tension = Column(Float, nullable=True)
    resistence = Column(Float, nullable=True)
    
    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)


class Photos(Base):
    __tablename__ = "photos"
    photo_id = Column(UUID, primary_key=True, server_default="gen_random_uuid()")
    report_id = Column(UUID, ForeignKey(Reports.report_id), nullable=False)

    created_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    updated_at = Column(TIMESTAMP, nullable=False, server_default=func.now())
    is_active = Column(Boolean, nullable=False, server_default="TRUE", index=True)