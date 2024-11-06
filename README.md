![Project Cover](/frontend/src/assets/cover.svg)

# UniHelper

[unihelper.com](https://uni-helper-five.vercel.app/)

## University Student's Management System.

<div style="text-align: justify;">
    UniHelper is a university management web application which I built as a personal project to improve on an existing university site. Inspired by the need for better functionality, UniHelper provides a dynamic experience tailored for different user (Admins, Students, and Teachers) with different, role-specific capabilities.
</div>

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
  - [Admin Features](#admin-features)
  - [Student Features](#student-features)
  - [Teacher Features](#teacher-features)
  - [General Features](#general-features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)

## Introduction

<div style="text-align: justify;">
    UniHelper offers an well decorated, role-based experience with a user friendly interface. It is designed to streamline common activities like advising, course management, consultation requests, and more. With a more modern and responsive approach, UniHelper significantly improves user specific needs.
</div>

## Features

#### Admin Features

- Full control over all system functionality.
- Ability to add departments, courses, and manage user roles and access.
- Oversee and modify student course advising and enrollment.

#### Student Features

- **Course Advising**: Students can select courses for the next semester based on an open credit system.
- **Consultation Requests**: Request consultation with teachers and view responses.
- **Payments**: View payment status, download payment slips, and proceed with online payments.
- **Grades**: View and download grade sheets.
- **Classroom Interaction**: Join classrooms, view content, create posts and make comments to engage in discussions.

#### Teacher Features

- **Classroom Management**: Create classrooms and add enrolled students based on their section.
- **Consultations**: Accept or reject consultation requests with proper reason.
- **Course Content**: Post materials, assignments, or announcements for enrolled students.

#### General Features

- **Course Availability**: All users can view available courses and seat statuses.
- **Forgot Password**: Secure password reset functionality for all users.

## Tech Stack

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express" />
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
  <img src="https://img.shields.io/badge/Cloudinary-F8E71C?style=for-the-badge&logo=cloudinary&logoColor=000" alt="Cloudinary" />
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios" />
</p>

## Getting Started

Just in case you want to set up and run UniHelper locally follow these steps:

### Prerequisites

Ensure you have these installed:

- <span style="color:#339933;">Node.js</span>
- <span style="color:#F8E71C;">MongoDB</span>

## Installation

1.  **Clone the repository**:

    ```bash
    git clone https://github.com/jobairalsarkar1/UniHelper.git
    ```

2.  **Environment Variables**:

    To run the UniHelper project, you need to set up several environment variables. Create a `.env` file in the root of your backend directory and add the following variables:

    ```bash
    PORT=5000
    MONGO_URI='your_mongodb_connection_string'  # Replace with your MongoDB connection string
    JWT_SECRET='your_jwt_secret'                  # Replace with your JWT secret

    CLOUDINARY_CLOUD_NAME='your_cloudinary_cloud_name'   # Replace with your Cloudinary cloud name
    CLOUDINARY_API_KEY='your_cloudinary_api_key'         # Replace with your Cloudinary API key
    CLOUDINARY_API_SECRET='your_cloudinary_api_secret'   # Replace with your Cloudinary API secret

    GOOGLE_API_TOKEN='your_google_api_token'              # Replace with your Google API token

    EMAIL='your_email@example.com'                        # Replace with your email address

    CLIENT_ID='your_google_client_id'                     # Replace with your Google Client ID
    CLIENT_SECRET='your_google_client_secret'             # Replace with your Google Client Secret
    REFRESH_TOKEN='your_google_refresh_token'             # Replace with your Google Refresh

    ```

3.  **Save the `.env` file** and ensure it is not tracked by Git by adding it to your `.gitignore` file. If you are using a Unix-based system (like macOS or Linux), you can use:

    ```bash
    echo ".env" >> .gitignore
    ```

    For Windows users, you can manually add `.env` to your `.gitignore` file using a text editor.

4.  **Run the application**:
    After setting up the environment variables, you can run the servers:

    - **Backend**:
      Navigate to the backend directory and run:

      ```bash
      cd backend
      npm start
      ```

    - **Frontend**:
      Navigate to the frontend directory and run:
      ```bash
      cd ../frontend
      npm run dev
      ```

## 🚨 Important

After cloning the repository, you'll need to update the API URLs and replace with your local address:

```javascript
//Example
const res = await axios.get(
  "https://unihelper.onrender.com/api/users/profile", // Change this URL if needed
);
//Replace the
"https://unihelper.onrender.com" with "http://localhost:5000"
```
