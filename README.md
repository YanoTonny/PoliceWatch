# PoliceWatch
Police Accountability Web Application.

This project is a web application aimed at providing a platform for users to report incidents related to police accountability. The application allows users to register, log in, submit reports, and view reports. The backend is built using Node.js and Express, and it uses MongoDB as the database.

#Table of Contents

Features
Installation
Configuration
Usage
Routes
Technologies Used
Contributing
License

#Features
User registration and login
Submit reports with description, location, and file uploads
View a list of submitted reports
Delete reports (only by the user who submitted them)
Call ambulance service functionality

#Installation
Clone the repository:

git clone https://github.com/yourusername/police-accountability-app.git
cd police-accountability-app

Install dependencies:

npm install

Set up MongoDB:

Sign up for MongoDB Atlas (if you haven't already) and create a new cluster.
In the cluster, create a new database and a collection.
Obtain the MongoDB connection string.

Configure environment variables:

Create a .env file in the root directory and add the following variables:
makefile

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000

#Configuration
Multer: Multer is used for handling file uploads.
JWT: JSON Web Tokens are used for authentication.
Bcrypt: Bcrypt is used for hashing passwords.

#Usage
Start the server:

npm start
Open the frontend:

Open index.html in your browser or use a live server extension in VSCode to serve the HTML file.

#Routes
Authentication
POST /auth/register: Register a new user

Request body: { "username": "your_username", "password": "your_password" }
Response: { "id": "user_id", "token": "jwt_token" }
POST /auth/login: Log in an existing user

Request body: { "username": "your_username", "password": "your_password" }
Response: { "id": "user_id", "token": "jwt_token" }
Reports
POST /report: Submit a new report

Request body: FormData with description, location, file, and userId
Response: Report submitted
GET /reports: Get all reports

Response: Array of report objects
DELETE /report/:id: Delete a report by ID

Response: Report deleted


#Technologies Used

Frontend: HTML, CSS, JavaScript
Backend: Node.js, Express
Database: MongoDB (using Mongoose)
Authentication: JWT
File Uploads: Multer


#Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

#License

This project is licensed under the MIT License. See the LICENSE file for more details.
