from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    age = Column(Integer)
    medical_condition = Column(String, nullable=True)
    emergency_contact_name = Column(String, nullable=True)
    emergency_contact_phone = Column(String, nullable=True)
    assigned_robot_id = Column(Integer, ForeignKey("robots.id"), nullable=True)

    robot = relationship("Robot", back_populates="user")


class Environment(Base):
    __tablename__ = "environments"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)  # e.g. "City Hospital", "Home", "Big Bazaar"
    type = Column(String, nullable=False)  # "hospital", "home", "supermarket"
    restricted_zones = Column(String, nullable=True)  # comma-separated zone names


class Robot(Base):
    __tablename__ = "robots"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    current_environment_id = Column(Integer, ForeignKey("environments.id"), nullable=True)
    current_mode = Column(String, default="idle")  # hospital / home / supermarket / idle
    battery_percent = Column(Float, default=100.0)
    current_location = Column(String, nullable=True)  # e.g. "Room 204" or "Aisle 5"
    speed = Column(Float, default=0.0)
    status = Column(String, default="online")  # online / offline / charging

    user = relationship("User", back_populates="robot", uselist=False)
    environment = relationship("Environment")


class Personalization(Base):
    __tablename__ = "personalization"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    preferred_rooms = Column(String, nullable=True)  # comma-separated room names
    assistance_level = Column(String, default="medium")  # low / medium / high
    favorite_routes = Column(String, nullable=True)


class EmergencyLog(Base):
    __tablename__ = "emergency_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    robot_id = Column(Integer, ForeignKey("robots.id"))
    location = Column(String, nullable=True)
    heart_rate = Column(Float, nullable=True)
    triggered_at = Column(DateTime, default=datetime.utcnow)
    status = Column(String, default="pending")  # pending / attended / resolved


class ActivityLog(Base):
    __tablename__ = "activity_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    robot_id = Column(Integer, ForeignKey("robots.id"))
    heart_rate = Column(Float, nullable=True)
    distance_moved = Column(Float, nullable=True)  # in meters
    speed = Column(Float, nullable=True)
    recorded_at = Column(DateTime, default=datetime.utcnow)