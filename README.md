# 💰 Expense Tracker API

A secure and scalable **REST API for personal expense management**, built with **Node.js, Express.js, MongoDB, and JWT authentication**.

The API lets users create accounts, authenticate securely, manage income and expense transactions, and retrieve dashboard-level financial insights such as total income, total expenses, balance, category breakdown, monthly summaries, and recent transactions.

> 🚧 **Current scope:** This repository contains the backend/API. A frontend can consume the REST endpoints exposed by this server.

---

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login
- JWT-based authentication
- Protected API routes using authentication middleware
- Password hashing with `bcrypt`
- User profile endpoint
- Request validation for authentication inputs

### 💸 Expense & Income Management
- Create income or expense transactions
- Fetch all transactions
- Fetch a transaction by ID
- Delete a transaction
- Categorize transactions
- Track payment methods such as Cash, UPI, Card, Bank Transfer, and Other
- Optional transaction notes and dates

### 📊 Dashboard Analytics
The dashboard API calculates:
- Total income
- Total expenses
- Current balance
- Expense breakdown by category
- Monthly income/expense summary
- Five most recent transactions

MongoDB aggregation pipelines are used for the analytical calculations.

### 🧱 Backend Architecture
The project follows a modular Express structure with:
- Routes
- Controllers
- Models
- Middleware
- Validators
- Utility functions
- Database configuration

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **Node.js** | JavaScript runtime |
| **Express.js** | REST API framework |
| **MongoDB** | Database |
| **Mongoose** | MongoDB ODM |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **express-validator** | Request validation in auth routes |
| **dotenv** | Environment configuration |
| **CORS** | Cross-origin API access |
| **Nodemon** | Development server reload |

---

## 📁 Project Structure

```text
expense-tracker/
│
├── config/
│   └── db.js                 # MongoDB connection
│
├── controllers/
│   ├── authController.js
│   ├── dashboardController.js
│   └── expenseController.js
│
├── middleware/
│   └── authMiddleware.js     # JWT verification
│
├── models/
│   ├── User.js
│   └── Expense.js
│
├── routes/
│   ├── authRoutes.js
│   ├── dashboardRoutes.js
│   └── expenseRoutes.js
│
├── utils/
│   └── jwt.js                # JWT utilities
│
├── validators/
│   └── authValidator.js
│
├── server.js                 # Application entry point
├── package.json
└── package-lock.json
```

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/ralon-1/expense-tracker.git
cd expense-tracker
```

### 2. Install dependencies

```bash
npm install
```

> **Note:** The current source imports `express-validator`, but that package is not yet declared in `package.json`. If your installation reports `Cannot find package 'express-validator'`, install it with:

```bash
npm install express-validator
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Use a strong, private value for `JWT_SECRET` and do not commit your `.env` file.

### 4. Start the development server

```bash
npm start
```

The API will run on:

```text
http://localhost:3000
```

You should see:

```text
Server running on 3000
Connected to MongoDB
```

---

# 🔌 API Endpoints

## Authentication

### Register

```http
POST /api/auth/register
```

Example request:

```json
{
  "name": "Pravesh",
  "email": "pravesh@example.com",
  "password": "yourpassword"
}
```

### Login

```http
POST /api/auth/login
```

Example request:

```json
{
  "email": "pravesh@example.com",
  "password": "yourpassword"
}
```

The login response provides a JWT that should be sent with protected requests.

### Get Profile

```http
GET /api/auth/profile
Authorization: Bearer <JWT_TOKEN>
```

---

## Transactions

All transaction endpoints require authentication.

### Create Transaction

```http
POST /api/expense
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

Example:

```json
{
  "title": "Monthly Salary",
  "amount": 50000,
  "type": "income",
  "category": "Salary",
  "note": "August salary"
}
```

For an expense:

```json
{
  "title": "Dinner",
  "amount": 450,
  "type": "expense",
  "category": "Food",
  "note": "Dinner with friends"
}
```

### Get All Transactions

```http
GET /api/expense
Authorization: Bearer <JWT_TOKEN>
```

### Get Transaction by ID

```http
GET /api/expense/:id
Authorization: Bearer <JWT_TOKEN>
```

### Delete Transaction

```http
DELETE /api/expense/:id
Authorization: Bearer <JWT_TOKEN>
```

---

## 📊 Dashboard

### Get Dashboard Data

```http
GET /api/dashboard
Authorization: Bearer <JWT_TOKEN>
```

Example response structure:

```json
{
  "success": true,
  "data": {
    "totalIncome": 50000,
    "totalExpense": 12000,
    "balance": 38000,
    "categoryBreakdown": [],
    "monthlySummary": [],
    "recentTransactions": []
  }
}
```

---

# 🔒 Authentication Flow

```text
Client
  │
  ├── Register/Login
  │
  ▼
Auth Controller
  │
  ├── Validate request
  ├── Hash/compare password
  └── Generate JWT
  │
  ▼
JWT Token
  │
  ▼
Client sends:
Authorization: Bearer <token>
  │
  ▼
Auth Middleware
  │
  ├── Verify token
  └── Attach user information to request
  │
  ▼
Protected Controller
```

---

# 🗄️ Data Models

## User

A user contains:

- `name`
- `email`
- `password`
- `currency`
- `profilePicture`
- timestamps

Passwords are hashed using `bcrypt` before being stored.

## Expense

Each transaction contains:

- `user`
- `title`
- `amount`
- `type` — `income` or `expense`
- `category`
- `paymentMethod`
- `date`
- `note`
- timestamps

Supported payment methods:

```text
Cash
UPI
Card
Bank Transfer
Other
```

---

# 📈 Dashboard Logic

The dashboard derives financial metrics directly from transaction data:

```text
Balance = Total Income - Total Expense
```

It also groups expenses by category and transactions by month/type to provide analytical data for a frontend dashboard.

---

# 🧪 Testing the API

You can test the API using tools such as:

- **Postman**
- **Insomnia**
- **Thunder Client**
- **cURL**

Typical flow:

```text
1. Register
      ↓
2. Login
      ↓
3. Copy JWT token
      ↓
4. Add "Authorization: Bearer <token>"
      ↓
5. Create transactions
      ↓
6. Fetch transactions
      ↓
7. Fetch dashboard analytics
```

---

# 🔮 Future Improvements

Planned improvements that would make the backend more production-ready:

- [ ] Update transaction endpoint
- [ ] User-specific filtering for transaction queries
- [ ] Pagination for large transaction lists
- [ ] Date-range filtering
- [ ] Budget management
- [ ] Spending limits and alerts
- [ ] Recurring transactions
- [ ] Better category management
- [ ] Refresh-token authentication
- [ ] Rate limiting
- [ ] API documentation with Swagger/OpenAPI
- [ ] Automated unit and integration tests
- [ ] Docker support
- [ ] Production deployment configuration
- [ ] Frontend integration

---

# ⚠️ Current Implementation Notes

This README describes the current codebase, including a few areas that are still under development:

- Transaction update (`PUT`) is currently commented out.
- Some transaction queries currently use direct MongoDB lookups and should be further restricted to the authenticated user's ID before production use.
- Add stronger production hardening such as rate limiting, centralized error handling, stricter CORS configuration, request schemas, and automated tests.
- `express-validator` is used by the source code but is not currently declared in `package.json`.

---

# 🧑‍💻 Development

### Run with Nodemon

```bash
npm start
```

### Environment

Make sure MongoDB is accessible and the required environment variables are configured before starting the application.

---

# 🤝 Contributing

Contributions are welcome.

```bash
git checkout -b feature/your-feature
git add .
git commit -m "Add your feature"
git push origin feature/your-feature
```

Then open a pull request.

---

# 📄 License

This project currently does not specify a license.

---

## 👨‍💻 Author

**Pravesh Kumar**

GitHub: [@ralon-1](https://github.com/ralon-1)

---

## ⭐ Support

If this project helped you or you found it useful, consider giving the repository a ⭐ on GitHub.

[![GitHub](https://img.shields.io/badge/GitHub-ralon--1-181717?style=for-the-badge&logo=github)](https://github.com/ralon-1)

[![Node.js](https://img.shields.io/badge/Node.js-JavaScript_Runtime-339933?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/Express.js-REST_API-000000?style=for-the-badge&logo=express)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![JWT](https://img.shields.io/badge/JWT-Auth-000000?style=for-the-badge&logo=jsonwebtokens)](https://jwt.io/)
