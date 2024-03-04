from flask import Flask, request
import psycopg2
from flask_cors import CORS

app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)

conn_string = "host='localhost' dbname='nataliesalazar'"

# print ("Connecting to database\n	->%s" % (conn_string))

# conn = psycopg2.connect(conn_string)

# cursor = conn.cursor()

# cursor.execute("""
#     INSERT INTO users (id, name) VALUES
#     (default,'Ben');
# """) 

# conn.commit()
# conn.close()

	# retrieve the records from the database
	# records = cursor.fetchall()
     
    

	# print out the records using pretty print
	# note that the NAMES of the columns are not shown, instead just indexes.
	# for most people this isn't very useful so we'll show you how to return
	# columns as a dictionary (hash) in the next example.
	# print(records)






@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file("index.html")

# Retrieve user data from database, throw error if user is not found.
@app.route('/user')
def getUser():
    # If arguments are passed into the URL, proceed to retrieve from database.
    if request.args:
        username = request.args.get("username", None)
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username}

        cursor.execute("SELECT * FROM users WHERE name=%(username)s", params) 

        userfetched = cursor.fetchall()
        conn.close()
    else: 
        userfetched = "No user information given to search. Please try again."
    return userfetched

@app.route('/getAllUsers')
def getUsers():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()

    return users

@app.route('/create-user')
def createUser():
    return "User Created"
 
@app.route('/get-messages')
def getMessages():
    return "messages"

@app.route('/send-message')
def sendMessage():
    return "message sent"
