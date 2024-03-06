from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from .controllers.tasks import tasks_blueprint # blueprint to fix mismatched route configuration
from . import models

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///tasks.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    CORS(app)
    db.init_app(app)

    with app.app_context():
        from .controllers.tasks import tasks_blueprint
        from . import models
        app.register_blueprint(tasks_blueprint)

        db.create_all()

    return app
