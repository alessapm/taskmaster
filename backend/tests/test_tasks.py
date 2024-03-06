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

    def tearDown(self):
        with self.app.app_context():
            db.session.remove()
            db.drop_all()

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

    def test_update_task(self):
        with self.app.app_context():
            task = Task(title='Task', description='Description', completed=False)
            db.session.add(task)
            db.session.commit()

            updated_data = {'title': 'Updated Task', 'description': 'Updated Description', 'completed': True}
            response = self.client.put('/tasks/{}'.format(task.id), json=updated_data)
            data = response.get_json()

            self.assertEqual(response.status_code, 201)
            self.assertEqual(data['message'], 'Task successfully updated')

    def test_delete_task(self):
        with self.app.app_context():
            task = Task(title='Test Task', description='Test Description', completed=False)
            db.session.add(task)
            db.session.commit()

            response = self.client.delete('/tasks/{}'.format(task.id))
            data = response.get_json()

            self.assertEqual(response.status_code, 200)
            self.assertEqual(data['message'], 'Task successfully deleted')
