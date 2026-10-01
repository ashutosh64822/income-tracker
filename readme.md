# 💰 Expense Tracker

A simple and responsive **Expense Tracker Web Application** built with **HTML, CSS, and JavaScript**.

This project helps users keep track of their daily expenses, calculate total spending, filter expenses by category, and store data in the browser using **LocalStorage**.

---

## 🚀 Live Demo

🔗 **Live Demo:** `Add your live demo link here`

---

## 📸 Preview

> Add your project screenshot here.

```text
![Expense Tracker Preview](./assets/preview.png)
```

---

## ✨ Features

* ➕ Add new expenses
* 📝 Expense name and amount input
* 📂 Categorize expenses
* 💰 Calculate total expenses automatically
* 🗑️ Delete individual expenses
* 🔍 Filter expenses by category
* 💾 Save expenses using LocalStorage
* 🔄 Data remains after refreshing the browser
* 📱 Responsive design
* 🌙 Dark/Light mode *(optional)*

---

## 🛠️ Technologies Used

* **HTML5**
* **CSS3**
* **JavaScript (Vanilla JS)**
* **LocalStorage**
* **DOM Manipulation**

---

## 📂 Project Structure

```text
expense-tracker/
│
├── index.html
├── style.css
├── script.js
│
├── assets/
│   └── preview.png
│
└── README.md
```

---

## 🎯 How It Works

### 1. Add Expense

The user enters:

* Expense name
* Amount
* Category

Then clicks the **Add Expense** button.

Example:

```text
Expense: Burger
Amount: 250
Category: Food
```

---

### 2. Expense List

All added expenses are displayed dynamically on the webpage.

Example:

```text
Food
Burger
৳250
Delete
```

---

### 3. Total Expense

The application automatically calculates the total amount of all expenses.

```text
Total Expense

৳2,450
```

Whenever an expense is added or deleted, the total amount updates automatically.

---

### 4. Filter Expenses

Users can filter expenses by category.

```text
All | Food | Transport | Shopping | Others
```

---

### 5. LocalStorage

The project uses browser **LocalStorage** to save expense data.

Therefore, refreshing the page will not remove the saved expenses.

---

## 🧠 JavaScript Concepts Practiced

This project is designed to practice important JavaScript fundamentals.

* Variables
* Data Types
* Arrays
* Objects
* Functions
* Conditional Statements
* Loops
* DOM Manipulation
* Event Listeners
* `input.value`
* `createElement()`
* `classList`
* Array methods
* LocalStorage
* `JSON.stringify()`
* `JSON.parse()`

---

## 📋 Example Expense Object

Each expense can be stored as an object:

```javascript
{
    id: 1,
    name: "Burger",
    amount: 250,
    category: "Food"
}
```

Multiple expenses can be stored inside an array:

```javascript
const expenses = [
    {
        id: 1,
        name: "Burger",
        amount: 250,
        category: "Food"
    },
    {
        id: 2,
        name: "Bus Ticket",
        amount: 50,
        category: "Transport"
    }
];
```

---

## 💾 LocalStorage Example

The expenses can be saved in LocalStorage:

```javascript
localStorage.setItem(
    "expenses",
    JSON.stringify(expenses)
);
```

And retrieved later:

```javascript
const expenses = JSON.parse(
    localStorage.getItem("expenses")
);
```

---

## 🔮 Future Improvements

The project can be improved by adding:

* ✏️ Edit Expense
* 🔍 Search Expense
* 📅 Filter by date
* 📊 Expense statistics
* 💸 Highest Expense
* 📈 Monthly expense report
* 🧮 Today's total expense
* 🔢 Total expense count
* ⚠️ Delete confirmation
* 🌙 Dark/Light mode
* 📱 Better mobile responsiveness

---

## 🎓 Purpose of This Project

The main purpose of this project is to improve practical knowledge of **HTML, CSS, and JavaScript** by building a real-world application.

It focuses especially on:

> **DOM Manipulation + Events + Arrays + Objects + LocalStorage**

---

## 👨‍💻 Author

**Ashutosh**

### Skills

* HTML
* CSS
* JavaScript
* Responsive Web Design

---

## ⭐ Support

If you find this project useful, consider giving the repository a ⭐ on GitHub.

---

### 📌 Note

This project is created for **learning and practice purposes**.
