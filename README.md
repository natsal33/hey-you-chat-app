# Hey You! - a place to chat (IN PROGRESS)

## Features

- (IP) Real-time messaging: Users can send and receive messages in real-time.
- (IP ) User authentication using JSON Web Tokens: Users can register, login, and authenticate themselves to access the chat features.
- Secure storage via PostgresSQL: User and message data is securely stored in a PostgreSQL database.
- (IP) Lightweight API: The API built with Flask provides efficient communication between the front-end and the database.

UPDATE 3/8/24:
Hey You! has an established backend using psycopg2 with tables that store user profile data, usernam+password credentials, and messages posted to the chat with username and time stamps.
Created branch "jwt_imp" to implement JWT authenticaion without harming the main branch. Progress so far:
   - Created authentication helper methods in /src/Provider/AuthHelperMethods.js to make creating, checking, and deleting JSON web tokens through login and logout site routing.
   - Created authentication React component wrapper <Protected Route/> in /src/Routes/ProtectedRoute.jsx to provide a simple way to protect react router components (such as the chat page) from unauthenticated users.

## Setup Instructions

### Frontend Setup

1. Clone this repository:

   ```
   git clone https://github.com/natsal33/hey-you-chat-app
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Start the development server:

   ```
   npm start
   ```

<!-- ### Backend Setup

1. Navigate to the `./app` directory:

    ```
    cd app
    ```

2. Create a virtual environment:

    ```
    python3 -m venv venv
    ```

3. Activate the virtual environment:

    - On macOS and Linux:

        ```
        source venv/bin/activate
        ```

    - On Windows:

        ```
        venv\Scripts\activate
        ```


4. Set up the PostgreSQL database:

    - Install PostgreSQL if you haven't already: [PostgreSQL Downloads](https://www.postgresql.org/download/)
    - Create a new database and note down the credentials.

5. Configure the Flask application:

    - Rename `.env.example` to `.env`.
    - Update the `DATABASE_URL` variable in `.env` with your PostgreSQL database URL.

6. Run the Flask application:

    ```
    flask run
    ``` -->

## Tech Stack

- Frontend:

  - React
  - JavaScript
  - HTML/CSS

- Backend:

  - Flask (Python)

- Database:
  - PostgreSQL

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

If you have any questions or suggestions, feel free to contact me at natmsal33@gmail.com. I'd love to hear from you!
