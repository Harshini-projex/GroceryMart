# GroceryMart

GroceryMart is a full-stack grocery shopping website that allows users to browse grocery products, add items to their cart, and place orders online.

## Features

- User Registration and Login
- Browse Grocery Products
- Add Products to Cart
- Place Orders
- View Order Details
- Secure User Authentication

## Technologies Used

**Frontend:**
- React.js
- Vite
- CSS

**Backend:**
- Node.js
- Express.js

**Database:**
- MongoDB

## Project Structure

```text
GroceryMart/
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── server.js
│   └── package.json
│
└── README.md
```

## Installation and Setup

### 1. Clone the Repository

```bash
git clone https://github.com/Harshini-projex/GroceryMart.git
cd GroceryMart
```

### 2. Setup Backend

```bash
cd backend
npm install
npm start
```

### 3. Setup Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## Environment Variables

Create a `.env` file inside the backend folder and add the required configuration:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Add other environment variables if required by your application.

## Deployment

The application can be deployed using Render:
- Frontend: Render Static Site
- Backend: Render Web Service
- Database: MongoDB Atlas
