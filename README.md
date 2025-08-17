🛒Basic E-Commerce Backend API

This is a Node.js + Express backend for an e-commerce project. It handles user authentication, product management (CRUD), and basic error handling.

🚀 Features

User Authentication (Register, Login, JWT)

Product CRUD (Create, Read, Update, Delete products)

Protected Routes (only admins can create/update/delete)

Error Handling Middleware

(Planned) Forgot Password & Reset Password

Postman Documentation

🛠️ Tech Stack

Node.js

Express.js

MongoDB + Mongoose

JSON Web Token (JWT)

bcrypt

📦 Installation

Clone the repo and install dependencies:

git clone [https://github.com/Wayles-D/Crud-App-Backend.git]
npm install


Create a .env file:

PORT=3000
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_secret_key
ADMIN_SECRET=your_admin_secret_key


Run the server:

npm run dev

🔑 Authentication Routes
Method	Endpoint	Description	Auth Required
POST	/api/users/register	Register a new user	No
POST	/api/users/login	Login and get token	No
📦 Product Routes
Method	Endpoint	Description	Auth Required	Role
GET	/api/products	Get all products	No	-
GET	/api/products/:id	Get product by ID	No	-
POST	/api/products	Create a product	Yes	Admin
PUT	/api/products/:id	Update a product	Yes	Admin
DELETE	/api/products/:id	Delete a product	Yes	Admin
⚡ Error Handling

Centralized error handler

Returns proper status codes and error messages
