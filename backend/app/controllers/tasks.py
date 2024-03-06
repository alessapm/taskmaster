from flask import Blueprint, request, jsonify
from app import db
from app.models import Task

tasks_blueprint = Blueprint('tasks', __name__)

@tasks_blueprint.route('/')
def root():
    print("hello !")
    return 'hello'

@tasks_blueprint.route('/tasks', methods=['GET', 'POST'])
def handle_tasks():
    print('hello')
    if request.method == 'GET':
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
    # Add POST logic here

# Add more routes here if needed
