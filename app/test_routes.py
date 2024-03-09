import routes
import unittest

class MyTestCase(unittest.TestCase):

    def setUp(self):
        routes.app.testing = True
        self.app = routes.app.test_client()

    def test_get_users(self):
        result = self.app.get('/api/get-all-users').data
        print("result inside test: ", result)
        self.assertIs(type(result), list)

if __name__ == '__main__':
    unittest.main()