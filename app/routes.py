import datetime
import time
from flask import Flask, jsonify, request, render_template
from flask_socketio import SocketIO, emit
import subprocess
import psycopg2
import json, os
import bcrypt
import jwt
from flask_cors import CORS





app = Flask(__name__, static_folder="../build", static_url_path="/")
socketio = SocketIO(app,debug=True,cors_allowed_origins='*')
CORS(app)

SECRET_KEY = os.environ.get('SECRET_KEY') or 'gimme all you got'
app.config['SECRET_KEY'] = SECRET_KEY

if __name__ == '__main__':
    socketio.run(app, port=5001)

conn_string = "host='localhost' dbname='nataliesalazar'"

#region
# print ("Connecting to database\n	->%s" % (conn_string))

# conn = psycopg2.connect(conn_string)

# cursor = conn.cursor()

# cursor.execute("""
#     CREATE TABLE usearnames_passwords(
#             user_id SERIAL PRIMARY KEY,
#             username VARCHAR(50) UNIQUE NOT NULL,
#             password_hash BYTEA NOT NULL,
#             salt BYTEA NOT NULL
#     )
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

@app.route("/", defaults={"path": ""})
@app.route("/<string:path>")
@app.route("/<path:path>")
def index(path):
    return app.send_static_file("index.html")

@app.route('/api/connect')
def connected():
    return "you're connected!"

@socketio.on("connect")
def connectedWebSocket():
    emit("after connect", f"{request.sid} is connected")

@socketio.on('message')
def handle_message(data):
    try:
        username = data['username']
        message = data["message"]
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username,
                  'message': message,
                  }
        cursor.execute("INSERT INTO messages (username, message) VALUES (%(username)s, %(message)s)", params)
        conn.commit()
        conn.close()
        emit("after message", data, broadcast=True)
        return "Message Sent: {0}".format(message)
    except:
        return "No message sent. Please try again."

@socketio.on('userLogin')
def user_login(data):
    emit("update-users", "", broadcast=True)

@socketio.on("userLogout")
def user_logout(data):
    emit("update-users", "", broadcast=True)

@socketio.on_error()
def handle_error(e):
    print(request.event["message"])

@socketio.on("disconnect")
def disconnected():
    print(f"{request.sid} client has disconnected")

@app.route('/api/login', methods=["POST"])
def login():
    try:
        request_json = request.get_json()
        username = request_json['username']
        encoded_password = request_json['password'].encode('utf-8')
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        params = {'username': username}
        cursor.execute("SELECT * FROM usernames_passwords WHERE username=%(username)s", params)
        user_fetched = cursor.fetchone()
        if user_fetched:
            username_fetched, hash_fetched, salt_fetched = user_fetched[1], user_fetched[2].tobytes(), user_fetched[3].tobytes();
            conn.close()

            password_match = bcrypt.checkpw(encoded_password, hash_fetched)
            if (password_match):
                conn = psycopg2.connect(conn_string)
                cursor = conn.cursor()
                params['active'] = 1;
                cursor.execute("UPDATE usernames_passwords SET active = b'1' WHERE username = %(username)s;", params)
                conn.commit()
                conn.close()
                token = jwt.encode({"username": username_fetched, "exp": time.time() + 6000}, "thisismyuniquepassword", )
                return jsonify({"authorized": True, "token": token})
            else:
                return jsonify({"authorized": False, "message": "password does not match"});
            
        else:
            return jsonify({"authorized": False, "message": "user not found"})
    except psycopg2.Error as error: 
        return jsonify(error)
    
@app.route('/api/logout', methods=["POST"])
def logout():
    request_json = request.get_json()
    username = request_json['username']
    params = {'username': username}
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    cursor.execute("UPDATE usernames_passwords SET active = b'0' WHERE username = %(username)s;", params)
    conn.commit()
    conn.close()
    print(f'User {username} successfully logged out.')
    return jsonify({})

@app.route('/api/signup', methods=["POST"])
def signup():
    if request.get_json():
        request_json = request.json
        username = request_json['username']
        password = request_json['password'].encode('utf-8')
        salt = bcrypt.gensalt()
        hash = bcrypt.hashpw(password, salt)
        location = "unknown"
        fav_color = "green"
        conn = psycopg2.connect(conn_string)
        
        try:
            cursor = conn.cursor()
            params = {
                'username': username,
                'password_hash': hash,
                'salt': salt,
                'location': location,
                'fav_color': fav_color
            }
            cursor.execute("""
                    INSERT INTO usernames_passwords (user_id, username, password_hash, salt) VALUES(default, %(username)s, %(password_hash)s, %(salt)s)
                           """, params);

            conn.commit()
            conn.close()
            return jsonify({"success": True, "message": "User {0} successfully created!".format(username)})
        except psycopg2.Error as err:
            return jsonify({"success": False, "message": "{0} already exists, please choose a new one!".format(username)})
    else:
        return jsonify({"success": False, "message":"User was not created."})

@app.route('/api/get-all-users')
def getUsers():
    conn = psycopg2.connect(conn_string)
    cursor = conn.cursor()
    cursor.execute("SELECT user_id, username, active FROM usernames_passwords")
    users = cursor.fetchall()
    users_fetched_dict = list(map(lambda user:  {
            "id": user[0],
            "username": user[1],
            "active": user[2]
        }, users))
    conn.close()
    return jsonify(users_fetched_dict)
 
@app.route('/api/get-messages')
def getMessages():
    try:
        conn = psycopg2.connect(conn_string)
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM messages ORDER BY timestamp")
        messages_fetched = cursor.fetchall()
        conn.close()

        messages_fetched_dict = list(map(lambda message: {
            "id": message[0],
            "username": message[1],
            "message": message[2],
            "timestamp": message[3]
        }, messages_fetched))

        return jsonify(messages_fetched_dict)
    
    except:
        return "Could not retrieve messages. Please try again."

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