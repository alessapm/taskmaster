from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()

from .controllers.tasks import tasks_blueprint # blueprint to fix mismatched route configuration
from . import models # move models import to after db initialization

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)
    
    db.init_app(app)

    from .controllers.tasks import tasks_blueprint
    app.register_blueprint(tasks_blueprint)

    with app.app_context():
        db.create_all()

    return app
