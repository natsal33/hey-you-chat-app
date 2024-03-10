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
        create_result = self.app.get(create_url).data
        
        delete_url = 'api/delete-user?username={0}'.format(username)
        result = self.app.get(delete_url).data


if __name__ == '__main__':
    unittest.main()