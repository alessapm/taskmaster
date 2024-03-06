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
    if request.method == 'GET':
        tasks = Task.query.all()
        return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
   
   elif request.method == 'POST':
       data = request.get_json

       new_task = Task(
           title = data.get('title'),
           description = data.get('description')
           completed = data.get('completed', False)
       )

       db.session.add(new_task)
       db.session.commit()

       return jsonify({'message': 'Task successfully created'}), 201

def edit_task(id):
    task = Task.query.get_or_404(id)

    if request.method == 'PUT':
        data = request.get.json()

        task.title = data.get('title', task.title),
        task.description = data.get('description', task.description)
        task.completed = data.get('completed', task.completed)

        db.session.commit()

        return jsonify({'message': 'Task successfully updated'}), 201

