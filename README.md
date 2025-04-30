# Project Title

Creating a Sports management Application to manage community facilities (SD Assignment)

## Table of Contents
- [About](#about)
- [Technologies](#technologies)
- [Client](#client)
  - [Prerequisites](#client-prerequisites)
  - [Installation](#client-installation)
  - [Running the Client](#running-the-client)
  - [Client Rules & Instructions](#client-rules--instructions)
- [Server](#server)
  - [Prerequisites](#server-prerequisites)
  - [Installation](#server-installation)
  - [Starting the Server](#starting-the-server)
  - [Server Rules & Instructions](#server-rules--instructions)
-[Toast High vulnerabilty error fix](#high-severity-vulnerabilities)
  -[run this in terminal](#run-npm)


---

## About

This project is an assignment that we have for SD and we must undergo sprint methodologies to build and deploy a succesful running application.

## Technologies

List the major frameworks, libraries, and tools used in this project.

- **Client:** React, Javascript, Clerk, Vite
- **Server:** Node.js, Express, MongoDB, Mongoose, Cors

---

## Client

### Client Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- npm run dev (to run the application on local host)

### Client Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/your-org/your-repo.git
   cd your-repo/client
  - write the things in which you installed on the application e.g
  - npm install cors express mongoose
  - npm i react-toastify
  - These are for the dashboard things to install(npm install @mui/material@^5.17.1 @emotion/react @emotion/styled @mui/icons-material@^5.11.0 @mui/x-data-grid react-router-dom@6 react-pro-sidebar formik yup
)
  - 
## Server

### Server Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- Express installed and mongoose and mongodb
- The server must always ru if you want to use the application then press the plus button to run the app normally as is .

- npm start

### Server Installation

1. cd server :
  -npm start , you should see server is connected listening to port 3000 and Mongodb is connected.
  - write the things in which you installed on the application ,if the terminal is crying and stuff e.g
  - npm install cors express mongoose

## Toast High vulnerabilty error fix
### run this in terminal
npm audit fix
