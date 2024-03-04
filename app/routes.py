from flask import Flask

app = Flask(__name__)






@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

@app.route('/user')
def getUser():
    return "User Info"

@app.route('/getUsers')
def getUsers():
    return "users" 

@app.route('/create-user')
def createUser():
    return "User Created"
 
@app.route('/get-messages')
def getMessages():
    return "messages"

@app.route('/send-message')
def sendMessage():
    return "message sent"
