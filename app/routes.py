from flask import Flask, request
import psycopg2

app = Flask(__name__)

conn_string = "host='localhost' dbname='nataliesalazar'"


@app.route('/')
@app.route('/index')
def index():
    return "Hello, World!"

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
    return userfetched

# Retrieve all users logged in the database
@app.route('/api/get-all-users')
def getUsers():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    conn.close()

    return users

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

            return messagesfetched
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
