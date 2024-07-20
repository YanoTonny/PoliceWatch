---

PoliceWatch

Overview

**PoliceWatch** is a web application designed to enhance police accountability by providing a platform for users to report incidents related to police conduct. The application features user registration, login, incident reporting with file uploads, viewing submitted reports, and deleting reports. Built with Node.js, Express, and MongoDB, PoliceWatch aims to foster transparency and improve community safety.

** Table of Contents**

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [Routes](#routes)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

**Features**

- **User Authentication:** Register and log in users.
- **Report Incidents:** Submit reports with description, location, and file uploads (e.g., images or videos).
- **View Reports:** Access a list of all submitted reports.
- **Delete Reports:** Users can delete their own reports.
- **Call Ambulance:** Button functionality to call an ambulance service (to be implemented).

**Installation**

1. **Clone the Repository:**

   ```bash
   git clone git@github.com:YanoTonny/PoliceWatch.git
   ```

2. **Install Dependencies:**

   Navigate to the project directory and install the necessary packages:

   ```bash
   npm install
   ```

3. **Set Up MongoDB:**

   - Sign up for [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (if you haven’t already).
   - Create a new cluster, a new database, and a collection.
   - Obtain the MongoDB connection string.

4. **Configure Environment Variables:**

   Create a `.env` file in the root directory and add the following variables:

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   PORT=3000
   ```

 **Configuration**

- **Multer:** Handles file uploads (e.g., images, videos).
- **JWT (JSON Web Tokens):** Used for user authentication and authorization.
- **Bcrypt:** Used for securely hashing user passwords.

**Usage**

1. **Start the Server:**

   ```bash
   npm start
   ```

2. **Open the Frontend:**

   Open `index.html` in your browser or use a live server extension in VSCode to serve the HTML file.

**Routes**

**Authentication**

- **POST /auth/register**
  
  Register a new user.

  **Request Body:**

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

  **Response:**

  ```json
  {
    "id": "user_id",
    "token": "jwt_token"
  }
  ```

- **POST /auth/login**
  
  Log in an existing user.

  **Request Body:**

  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```

  **Response:**

  ```json
  {
    "id": "user_id",
    "token": "jwt_token"
  }
  ```

**Reports**

- **POST /report**

  Submit a new report.

  **Request Body:**

  FormData containing `description`, `location`, `file`, and `userId`.

  **Response:**

  `Report submitted`

- **GET /reports**

  Get all reports.

  **Response:**

  An array of report objects with fields including `description`, `location`, `file`, `userId`, `createdAt`, and `updatedAt`.

- **DELETE /report/:id**

  Delete a report by ID.

  **Response:**

  `Report deleted`

**Technologies Used**

- **Frontend:** HTML, CSS, JavaScript
- **Backend:** Node.js, Express
- **Database:** MongoDB (using Mongoose)
- **Authentication:** JWT (JSON Web Tokens)
- **File Uploads:** Multer

**Contributing**

Contributions are welcome! To contribute:

1. Open an issue or submit a pull request with your improvements or bug fixes.
2. Follow the project's coding standards and best practices.

**License**

This project is licensed under the [MIT License](LICENSE). See the LICENSE file for more details.

---
