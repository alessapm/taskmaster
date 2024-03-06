import unittest
from flask import Flask, jsonify
from app import db, create_app
from app.models import Task

class TestTasksBlueprint(unittest.TestCase):

    def setUp(self):
        self.app = create_app()
        self.app.config['TESTING'] = True
        self.client = self.app.test_client()

        with self.app.app_context():
            db.create_all()

    def test_get_tasks(self):
        response = self.client.get('/tasks')
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)

    def test_create_task(self):
        task_data = {'title': 'Test Task', 'description': 'Test Description', 'completed': False}
        response = self.client.post('/tasks', json=task_data)
        data = response.get_json()

        self.assertEqual(response.status_code, 201)
        self.assertEqual(data['message'], 'Task successfully created')