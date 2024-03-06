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
        # Test the GET /tasks endpoint
        response = self.client.get('/tasks')
        data = response.get_json()

        self.assertEqual(response.status_code, 200)
        self.assertIsInstance(data, list)