from flask_sqlalchemy import SQLAlchemy
from flask_session import Session
from uuid import uuid4

db = SQLAlchemy()

def get_uuid():
    return uuid4().hex

class Role(db.Model):
    __tablename__ = "role"
    id = db.Column(db.Integer, primary_key=True, unique=True)
    name = db.Column(db.String(5), unique=True, nullable=False)
    users = db.relationship('User', backref='role', lazy=True)

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    email = db.Column(db.String(345), unique=True)
    name = db.Column(db.Text)
    password = db.Column(db.Text, nullable=False)
    roleid = db.Column(db.Integer, db.ForeignKey("role.id"), nullable=False, default=2)

def insert_default_role():
    if Role.query.count() == 0:
        adminRole = Role(name="admin") 
        userRole = Role(name="user") 
        db.session.add(adminRole)
        db.session.add(userRole)
        db.session.commit()

