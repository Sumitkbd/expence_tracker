// app.js

const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');

// Function to get expenses from localStorage
function getExpenses() {
  return JSON.parse(localStorage.getItem('expenses')) || [];
}

// Function to save expenses to localStorage
function saveExpenses(expenses) {
  localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Function to display expenses
function displayExpenses() {
  expenseList.innerHTML = '';
  const expenses = getExpenses();

  expenses.forEach((expense, index) => {
    const div = document.createElement('div');
    div.classList.add('expense-item');
    div.innerHTML = `
            <span>${expense.category}</span>
            <span>$${expense.amount}</span>
            <button onclick="deleteExpense(${index})">Delete</button>
        `;
    expenseList.appendChild(div);
  });
}

// Function to add new expense
function addExpense(amount, category) {
  const expense = {
    amount: parseFloat(amount),
    category: category.trim()
  };

  const expenses = getExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
  displayExpenses();
}

// Function to delete expense
function deleteExpense(index) {
  const expenses = getExpenses();
  expenses.splice(index, 1);
  saveExpenses(expenses);
  displayExpenses();
}

// Event listener for form submission
expenseForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  addExpense(amount, category);
  expenseForm.reset();
});

// Initial display of expenses
displayExpenses();
