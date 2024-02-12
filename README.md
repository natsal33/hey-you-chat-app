# Hey You! - a place to chat (IN PROGRESS)

## Features

- Real-time messaging: Users can send and receive messages in real-time.
- User authentication: Users can register, login, and authenticate themselves to access the chat features.
- Secure storage: User and message data is securely stored in a PostgreSQL database.
- Lightweight API: The API built with Flask provides efficient communication between the front-end and the database.

UPDATE 2/11/24:
Hey You! has a functioning front-end message board and user list ready for message+user data. Next steps will be to create dummy message+user data in PostgreSQL, and develop an API in Flask to manage read and write requests.

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
