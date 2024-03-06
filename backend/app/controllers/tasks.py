from flask import request, jsonify
from app import db
from app.models import Task
from flask import render_template, redirect, url_for

def configure_routes(app):
    @app.route('/tasks', methods=['GET', 'POST'])
    def handle_tasks():
        print('hello')
        if request.method == 'GET':
            tasks = Task.query.all()
            return jsonify([{'id': task.id, 'title': task.title, 'description': task.description, 'completed': task.completed} for task in tasks]), 200
        # Add POST logic here

    # Add more routes here