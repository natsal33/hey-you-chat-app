import random
import string
import routes
import unittest
import requests


class testRoutes(unittest.TestCase):

    def setUp(self):
        routes.app.testing = True
        self.app = routes.app.test_client()

    def test_connection(self):
        result = self.app.get('api/connected')
        decoded_result = result.data.decode("utf-8")
        self.assertEqual(decoded_result,"you're connected!")

    def test_user(self):
        # result = self.app.get('api/user?username=Sammy').json
        result = requests.post('http://localhost:5000/api/user', json={"username": "Sammy"}).json()
        dummyresult =  [16, 'Sammy', 'Helena, MT', 'bandanabananayellow']
        self.assertEqual(result, dummyresult)

    def test_get_all_users(self):
        result = self.app.get('api/get-all-users').json
        self.assertTrue(len(result) > 0)

    def test_create_delete_user(self):
        # Assign random string to username
        username = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        # Create user with randomized username from db
        create_result = requests.post('http://localhost:5000/api/create-user', json={"username": username, "location": None, "fav_color": None}).text
        self.assertEqual(create_result, "User {0} successfully created!".format(username))
        # Delete randomized username from db
        delete_result = requests.post('http://localhost:5000/api/delete-user', json={"username": username}).text
        self.assertEqual(delete_result, "User {0} successfully deleted.".format(username))

    def test_get_messages(self):
        result = requests.post('http://localhost:5000/api/get-messages', json={"username": None}).json()
        self.assertTrue(len(result) > 0)
    
    def test_send_remove_message(self):
        # Send a mock message to the db
        send_result = requests.post('http://localhost:5000/api/send-message', json={"username": "Sammy", "message": "testingtesting123"}).text
        self.assertEqual(send_result, "Message Sent: testingtesting123")
        # Remove mock message from the db
        remove_result = requests.post('http://localhost:5000/api/remove-message', json={"username": "Sammy", "message": "testingtesting123"}).text
        self.assertEqual(remove_result, "Message Removed: testingtesting123")


if __name__ == '__main__':
    unittest.main()