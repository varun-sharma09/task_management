## Introduction
This project is a RESTful API built with Node.js, Express, and MongoDB. It includes user authentication, task management functionalities, and is validated using Joi. This README provides instructions on how to install, run, and test the API using Postman.

## Prerequisites
Before you begin, ensure you have the following installed on your system:

 1. Node.js (version 14 or higher)
 2. MongoDB (for local database)
 3. Postman (for testing API endpoints)

## Installation
1. Clone the Repository

git clone <repository-url>
cd <project-directory>

2. Install Dependencies

Install the project dependencies using npm:

npm install

3. Configure Environment Variables

Create a .env file in the root directory of the project and add the following configuration:

PORT=5000
MONGO_URI=mongodb://localhost:27017/your-database-name
JWT_SECRET=your-secret-key
Replace your-database-name with the name of your MongoDB database and your-secret-key with a secret key for JWT.

4. Start the MongoDB Server

Ensure your MongoDB server is running. If you are using a local MongoDB instance, you can start it with:

mongod

5. Run the API Server

Start the API server with:

npm run dev

The server should now be running on http://localhost:5000 (or any other port specified in the .env file).

## API Endpoints
You can test the following endpoints using Postman:

## User Endpoints:-

1. Register User:-

Method: POST
URL: http://localhost:5000/api/auth/register
Body (JSON):

{
  "username": "exampleUser",
  "email": "user@example.com",
  "password": "yourpassword"
}

2. Login User:-

Method: POST

URL: http://localhost:5000/api/auth/login

Body (JSON):

{
  "email": "user@example.com",
  "password": "yourpassword"
}
Response (JSON):

{
  "code": 200,
  "status": "Success",
  "message": "Login successful",
  "data": {
    "user": {
      "username": "exampleUser",
      "email": "user@example.com",
      "password": "hashedpassword",
      "_id": "user-id"
    },
    "token": "jwt-token"
  }
}


## Task Endpoints
1. Create Task:- 

Method: POST
URL: http://localhost:5000/api/tasks
Headers:
Authorization: Bearer <jwt-token>
Body (JSON):

{
  "title": "New Task",
  "description": "Task description"
}

2. Get All Tasks:- 

Method: GET
URL: http://localhost:5000/api/tasks
Headers:
Authorization: Bearer <jwt-token>

3. Update Task:-

Method: PUT
URL: http://localhost:5000/api/tasks/:id
Headers:
Authorization: Bearer <jwt-token>
Body (JSON):

{
  "title": "Updated Task",
  "description": "Updated description",
  "status": "completed"
}

4. Delete Task:-

Method: DELETE
URL: http://localhost:5000/api/tasks/:id
Headers:
Authorization: Bearer <jwt-token>

## Testing
You can use Postman to test the API endpoints by:

1. Opening Postman.
2. Creating a new request for each endpoint.
3. Setting the appropriate HTTP method (GET, POST, PUT, DELETE).
4. Adding the URL and request body (if applicable).
5. Adding the Authorization header with the Bearer token for authenticated endpoints.
6. Sending the request and reviewing the response.

## Troubleshooting
1. Ensure that MongoDB is running and accessible at the specified MONGO_URI.
2. Verify that the .env file is properly configured with the correct values.
3. Check the console output for any errors and review the logs for additional details.

## License
This project is licensed under the MIT License. See the LICENSE file for details.