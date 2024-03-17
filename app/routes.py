import datetime
from flask import Flask, jsonify, request
import psycopg2
import json, os
from flask_cors import CORS
from werkzeug.security import check_password_hash, generate_password_hash



app = Flask(__name__, static_folder="../build", static_url_path="/")
CORS(app)
SECRET_KEY = os.environ.get('SECRET_KEY') or 'gimme all you got'
app.config['SECRET_KEY'] = SECRET_KEY

conn_string = "host='localhost' dbname='nataliesalazar'"

#region
# print ("Connecting to database\n	->%s" % (conn_string))

# conn = psycopg2.connect(conn_string)

# cursor = conn.cursor()

# cursor.execute("""
#     INSERT INTO username_passwords (username, password) VALUES 
#         ('Natalie!', 'Bitches!'),
#         ('Ben', 'iloveseahawks'),
#         ('Sammy', 'wheresdaburgers'),
#         ('Monica', 'Kameron4ever')
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
#endregion

@app.route('/')
@app.route('/index')
def index():
    return app.send_static_file("index.html")

@app.route('/api/connected')
def connected():
    return "you're connected!"

@app.route('/api/login', methods=["POST"])
def login():
    if request.get_json():
        request_json = request.get_json()
        username = request_json['username']
        password = request_json['password']

        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username, 'password': password}
        cursor.execute("SELECT * FROM username_passwords WHERE username=%(username)s AND password=%(password)s", params)
        user_fetched = cursor.fetchone()
        if user_fetched:
            print("USER FOUND!")
        conn.close()
    return jsonify("logged in")

# @app.route('/api/signup')
# def signup():



@app.route('/api/user', methods=["POST"])
def getUser():
    # If arguments are passed into the URL, proceed to retrieve from database.
    if request.get_json():
        request_json = request.get_json()
        username = request_json['username']
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username}

        cursor.execute("SELECT * FROM users WHERE username=%(username)s", params) 
        user_fetched = cursor.fetchall()[0]
        user_fetched_dict = {
            "id": user_fetched[0],
            "username": user_fetched[1],
            "location": user_fetched[2],
            "fav_color": user_fetched[3],
        }

        conn.close()
    else: 
        user_fetched_dict = "No user information given to search. Please try again."
    return jsonify(user_fetched_dict)

@app.route('/api/get-all-users')
def getUsers():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users")
    users = cursor.fetchall()
    users_fetched_dict = list(map(lambda user:  {
            "id": user[0],
            "username": user[1],
            "location": user[2],
            "fav_color": user[3],
        }, users))
    conn.close()
    return jsonify(users_fetched_dict)

@app.route('/api/create-user', methods=["POST"])
def createUser():

    if request.get_json():
        request_json = request.get_json()
        username = request_json['username']
        location = request_json['location'] or "unknown"
        fav_color = request_json['fav_color'] or "green"
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

@app.route('/api/delete-user', methods=["POST"])
def deleteUser():

    if request.get_json():
        request_json = request.get_json()
        username = request_json['username']
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
            print("User {0} successfully deleted.".format(username))
            return("User {0} successfully deleted.".format(username))
        except psycopg2.Error as err:
            return("{0} does not exist.".format(username))
    else:
        return "User was not deleted."
 
@app.route('/api/get-messages', methods=["POST"])
def getMessages():
    try:
        request_json = request.get_json()
        username = request_json["username"]
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        if username:
            params = {'username': username}
            cursor.execute("SELECT * FROM messages WHERE username=%(username)s ORDER BY timestamp", params)
            messages_fetched = cursor.fetchall()
            conn.close()
        else:
            cursor.execute("SELECT * FROM messages ")
            messages_fetched = cursor.fetchall()
            conn.close()
        messages_fetched_dict = list(map(lambda message: {
                "id": message[0],
                "username": message[1],
                "message": message[2],
                "timestamp": message[3]
            }, messages_fetched))
        print("MESSAGES FETCHED: ", messages_fetched_dict)
        return jsonify(messages_fetched_dict)
    except:
        return "Could not retrieve messages. Please try again."

@app.route('/api/send-message', methods=["POST"])
def sendMessage():
    try:
        request_json = request.get_json()
        username = request_json["username"]
        message = request_json["message"]
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username,
                  'message': message,
                  }
        cursor.execute("INSERT INTO messages (username, message) VALUES (%(username)s, %(message)s)", params)
        conn.commit()
        conn.close()
        return "Message Sent: {0}".format(message)
    except:
        return "No message sent. Please try again."

@app.route('/api/remove-message', methods=["POST"])
def removeMessage():
    try:
        request_json = request.get_json()
        username = request_json["username"]
        message = request_json["message"]
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
    except:
        return "Message not found to remove."