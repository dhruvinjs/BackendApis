
# Expense Tracker API - User Manual
Project idea taken from the: https://roadmap.sh/projects/expense-tracker-api

Welcome to the Expense Tracker API! This guide will help you understand how to use the features of this API effectively. Follow the steps below to get started.
---

## **Features**

1. **User Authentication**  
   - Users must log in to perform any operations.  
   - Secure login ensures data safety.

2. **Add Expense**  
   - Add a new expense with the following details:  
     - **Description**: A short note about the expense.  
     - **Category**: Classify your expense (e.g., Lunch, Travel).  
     - **Amount**: The cost of the expense.

3. **Update Expense**  
   - Modify details of an existing expense.

4. **Remove Expense**  
   - Delete an expense from the tracker.

5. **View Expenses by Category**  
   - Filter expenses based on categories (e.g., see only Lunch expenses).

6. **View Expenses by Time Period**  
   - Retrieve expenses for specific time frames:  
     - Past week  
     - Past month  
     - Past 3 months

7. **View All Categories**  
   - Get a list of all available categories in the system.

---

## **Pre-Requisites**

1. **Authentication**  
   - Before using any feature, you must log in with valid credentials.  
   - Obtain a session token after successful login, which will be required for all API requests.

2. **Mandatory Fields for Adding an Expense**  
   - **Description**  
   - **Category**  
   - **Amount**

---

## **API Endpoints**

**User Registration**
- **Registration**  
  **POST** `/api/v1/users/registerUser`  
  **Request Body**:  
  ```json
  {
    "username": "your_username",
    "password": "your_password"
  }
  ```  
  **Response**:  
  ```json
  {
    "token": "session_token"
  }
  ```
### 1. **User Authentication**
- **Login**  
  **POST** `/api/v1/users/login`  
  **Request Body**:  
  ```json
  {
    "username": "john",
    "password": "johnwick10"
  }
  ```  
  **Response**:  
  ```json
  {
    "token": "session_token"
  }
  ```

---

### 2. **Add Expense**
- **POST** `/api/v1/expense/add`  
  **Headers**:  
  `Authorization: Bearer session_token`  
  **Request Body**:  
  ```json
  {
    "description": "Dinner at a restaurant",
    "category": "Food",
    "amount": 500
  }
  ```  
  **Response**:  
  ```json
  {
    "message": "Expense added successfully"
  }
  ```

---

### 3. **Update Expense**
- **PUT** `/api/v1/expense/update/:id`  
  **Headers**:  
  `Authorization: Bearer session_token`  
  **Request Body**:  
  ```json
  {
    "description": "Dinner with friends",
    "category": "Food",
    "amount": 600
  }
  ```  
  **Response**:  
  ```json
  {
    "message": "Expense updated successfully"
  }
  ```

---

### 4. **Remove Expense**
- **DELETE** `/api/v1/expense/delete/:id`  
  **Headers**:  
  `Authorization: Bearer session_token`  
  **Response**:  
  ```json
  {
    "message": "Expense deleted successfully"
  }
  ```

---

### 5. **View Expenses by Time Period**
- **GET** `/api/v1/expense/weeklyExp`  
  **Headers**:  
  `Authorization: Bearer session_token`  or "Can Also read token by using cookies"
  **Query Parameters**:  
  - `period=week` (options: `week`, `month`, `3months`)  
  **Response**:  
  ```json
  [
    {
      "description": "Lunch",
      "category": "Food",
      "amount": 200,
      "date": "2024-11-18"
    }
  ]
  ```
### 5. **View Expenses by Time Period**
- **GET** `/api/v1/expense/timeframe`  
  **Weekly Expense** `/api/v1/expense/weeklyExp` 
  **Monthly Expense** `/api/v1/expense/monthlyExp` 
  **Three Months Expense** `/api/v1/expense/threemonthlyExp` 
  **Headers**:  
  `Authorization: Bearer session_token`  or "Can Also read token by using cookies"
  **Query Parameters**:  
  - `period=week` (options: `week`, `month`, `3months`)  
  **Response**:  
  ```json
  [
    {
      "description": "Lunch",
      "category": "Food",
      "amount": 200,
      "date": "2024-11-18"
    }
  ]
  ```



### 6. **View Expenses by Category**
- **GET** `/api/v1/expense/category`  
  **Headers**:  
  `Authorization: Bearer session_token`  
  **Query Parameters**:  
  - `category=lunch`  
  **Response**:  
  ```json
  [
    {
      "description": "Lunch at a cafe",
      "category": "Food",
      "amount": 300,
      "date": "2024-11-17"
    }
  ]
  ```

---

### 7. **View All Categories**
- **GET** `/api/v1/expense/allCategories`  
  **Headers**:  
  `Authorization: Bearer session_token`  
  **Response**:  
  ```json
  [
    "Food",
    "Travel",
    "Entertainment"
  ]
  ```

---

## **Best Practices**
- Always ensure you are logged in before making requests.
- Keep your session token private.
- Validate your input data (e.g., non-negative amounts, valid categories).
- Use filters (category or time period) to simplify data retrieval.

---

