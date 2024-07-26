# Food Expense Tracker

## Overview

The Food Expense Tracker is a web application designed to help users monitor and manage their food-related expenses effectively. Inspired by the personal experience of often losing track of food expenditures, this application aims to provide an intuitive and efficient way to log and review daily and monthly expenses. Users can categorize their expenses into different types, such as Mess food, Tiffin services, and Junk food, and receive summarized reports to better understand their spending patterns.



## Features

- **Add Expenses:** Users can add food expenses by specifying the date, category (Mess, Tiffin, Junk), cost, and an optional brief description.
- **Expense Summary:** View daily and monthly summaries of expenses, including breakdowns by category and total costs.
- **Data Persistence:** Expenses are stored in a MongoDB database.
- **Expense Graph:** Visual representation of monthly expenses.

## Technologies Used

- **Frontend:** React
- **Backend:** Node.js with Express
- **Database:** MongoDB
- **Styling:** CSS
- **HTTP Client:** Axios

## Getting Started

### Prerequisites

- Node.js
- MongoDB

### Installation

1. **Clone the repository:**

   ```sh
   git clone https://github.com/swarajpanmand/food-expenses-tracker.git
   cd food-expenses-tracker
   ```

2. **Install server dependencies:**

   ```sh
   cd server
   npm install
   ```

3. **Install client dependencies:**

   ```sh
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the MongoDB server:**

   Make sure MongoDB is running on your system. By default, the application connects to a MongoDB instance running at `mongodb://localhost:27017/expense-tracker`.

2. **Start the backend server:**

   ```sh
   cd server
   npm run dev
   ```

   The backend server will start on `http://localhost:3000`.

3. **Start the frontend server:**

   ```sh
   cd ../client
   npm run dev
   ```

   The frontend server will start on `http://localhost:5173`.

## Project Structure

```
food-expense-tracker/
├── client/
│   ├── public/
│   │   ├── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Type.jsx
│   │   │   ├── Summary.jsx
│   │   │   ├── MonthlyExpenseGraph.jsx
│   │   ├── styles/
│   │   │   ├── App.css
│   │   ├── App.jsx
│   │   ├── main.jsx
├── server/
│   ├── src/
│   │   ├── app.js
│   │   ├── dbConnection.js
│   │   ├── schema.js
├── .gitignore
├── README.md
├── package.json
└── package-lock.json
```

## API Endpoints

### POST /

Add a new expense.

- **Request Body:**

  ```json
  {
    "date": "2024-07-01",
    "item": "mess",
    "cost": 100,
    "itemBrief": "Lunch"
  }
  ```

- **Response:**

  ```json
  {
    "_id": "60e5f0f8d1c0a93d9b0b7a77",
    "date": "2024-07-01T00:00:00.000Z",
    "item": "mess",
    "cost": 100,
    "itemBrief": "Lunch",
    "__v": 0
  }
  ```

### GET /daily-summary

Retrieve daily expense summaries for the last 30 days.

- **Response:**

  ```json
  [
    {
      "_id": "2024-07-01",
      "totalCost": 200
    },
    ...
  ]
  ```

### GET /monthly-summary

Retrieve monthly expense summaries categorized by `Mess`, `Tiffin`, and `Junk`.

- **Response:**

  ```json
  [
    {
      "_id": "2024-07",
      "mess": {
        "totalCost": 1000
      },
      "tiffin": {
        "totalCost": 800
      },
      "junk": {
        "totalCost": 600
      },
      "totalCost": 2400
    },
    ...
  ]
  ```

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-foo`).
3. Commit your changes (`git commit -am 'Add some foo'`).
4. Push to the branch (`git push origin feature-foo`).
5. Create a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---
