from flask import Flask, jsonify, request
import psycopg2
import json
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

@app.route('/api/connected')
def connected():
    return "you're connected!"
# Retrieve user data from database, throw error if user is not found.
@app.route('/api/user')
def getUser():
    # If arguments are passed into the URL, proceed to retrieve from database.
    if request.args:
        username = request.args.get("username", None)
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username}

        cursor.execute("SELECT * FROM users WHERE username=%(username)s", params) 

        userfetched = cursor.fetchall()
        conn.close()
    else: 
        userfetched = "No user information given to search. Please try again."
    return jsonify(userfetched[0])

# Retrieve all users logged in the database
@app.route('/api/get-all-users')
def getUsers():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()
    return jsonify(users)

# Adds User to "user" and "messages" database with attributes username, location, and fav_color. Assigns location 
# as "unknown" and fav_color as "green" if not assigned by the argument input. Throws exception if user attempts to
# create a duplicate username.
@app.route('/api/create-user')
def createUser():

    if request.args:
        username = request.args.get("username", None)
        location = request.args.get("location", "unknown")
        fav_color = request.args.get("fav_color", "green")
        conn = psycopg2.connect(conn_string)
        try:
            cursor = conn.cursor()
            params = {
                'username': username,
                'location': location,
                'fav_color': fav_color
            }
            cursor.execute("""
                    INSERT INTO users (id, username, location, fav_color) VALUES (default, %(username)s, %(location)s, %(fav_color)s);
            """, params);
            conn.commit()
            conn.close()
            return("User {0} successfully created!".format(username))
        except psycopg2.Error as err:
            return("{0} already exists, please choose a new one!".format(username))
    else:
        return "User was not created."

@app.route('/api/delete-user')
def deleteUser():

    if request.args:
        username = request.args.get("username", None)
        conn = psycopg2.connect(conn_string)
        try:
            cursor = conn.cursor()
            params = {
                'username': username,
            }
            cursor.execute("""
                    DELETE FROM users WHERE username=%(username)s;
            """, params);
            conn.commit()
            conn.close()
            return("User {0} successfully deleted.".format(username))
        except psycopg2.Error as err:
            return("{0} does not exist.".format(username))
    else:
        return "User was not deleted."
 
@app.route('/api/get-messages')
def getMessages():
    if request.args:
        username = request.args.get("username", None)
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username}
        cursor.execute("SELECT messages FROM messages WHERE username=%(username)s", params)
        messagesfetched = cursor.fetchall()
        conn.close()
        return messagesfetched
    else:
        try:
            conn = psycopg2.connect(conn_string)
            cursor = conn.cursor()
            cursor.execute("SELECT messages FROM messages ")
            messagesfetched = cursor.fetchall()
            conn.close()
            return jsonify(messagesfetched)
        except:
            return "Could not retrieve messages. Please try again."

@app.route('/api/send-message')
def sendMessage():
    if request.args:
        username = request.args.get("username", None)
        message = request.args.get("message", None)
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username,
                  'message': message,
                  }
        cursor.execute("INSERT INTO messages (username, message) VALUES (%(username)s, %(message)s)", params)
        conn.commit()
        conn.close()
        return "Message Sent: {0}".format(message)
    return "No message sent. Please try again."

@app.route('/api/delete-message')
def removeMessage():
    if request.args:
        username = request.args.get("username", None)
        message = request.args.get("message", None)
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username,
                  'message': message,
                  }
        cursor.execute("""
                    DELETE FROM messages WHERE username=%(username)s AND message=%(message)s;
            """, params);
        conn.commit()
        conn.close()
        return "Message Removed: {0}".format(message)