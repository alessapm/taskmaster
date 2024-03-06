from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import sqlite3

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)
    db.init_app(app)

    with app.app_context():
        from .controllers import tasks
        from . import models
        db.create_all()

    return app
