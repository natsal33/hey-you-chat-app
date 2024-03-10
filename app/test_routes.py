import random
import string
import routes
import unittest


class testRoutes(unittest.TestCase):

    def setUp(self):
        routes.app.testing = True
        self.app = routes.app.test_client()

    def test_connection(self):
        result = self.app.get('api/connected')
        decoded_result = result.data.decode("utf-8")
        self.assertEqual(decoded_result,"you're connected!")

    def test_user(self):
        result = self.app.get('api/user?username=Sammy').json
        dummyresult =  [16, 'Sammy', 'Helena, MT', 'bandanabananayellow']
        self.assertEqual(result, dummyresult)

    def test_get_all_users(self):
        result = self.app.get('api/get-all-users').json
        self.assertTrue(len(result) > 0)

    def test_create_delete_user(self):
        username = ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(6))
        create_url = 'api/create-user?username={0}'.format(username)
        create_result = self.app.get(create_url).data.decode('utf-8')
        self.assertEqual(create_result, "User {0} successfully created!".format(username))
        delete_url = 'api/delete-user?username={0}'.format(username)
        delete_result = self.app.get(delete_url).data.decode('utf-8')
        self.assertEqual(delete_result, "User {0} successfully deleted.".format(username))

    def test_get_messages(self):
        result = self.app.get('api/get-messages').json
        self.assertTrue(len(result) > 0)
    
    def test_send_remove_message(self):
        send_result = self.app.get('api/send-message?username=Sammy&message=testingtesting123').data.decode("utf-8")
        print("SEND RESULT:", send_result)
        self.assertEqual(send_result, "Message Sent: testingtesting123")
        remove_result = self.app.get('api/delete-message?username=Sammy&message=testingtesting123').data.decode("utf-8")
        self.assertEqual(remove_result, "Message Removed: testingtesting123")


if __name__ == '__main__':
    unittest.main()