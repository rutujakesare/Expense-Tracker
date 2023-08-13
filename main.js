document.addEventListener("DOMContentLoaded", () => {
    const expenseForm = document.getElementById("expense-form");
    const expenseList = document.getElementById("expense-list");

    expenseForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const description = document.getElementById("description").value;
        const category = document.getElementById("category").value;

        if (isNaN(amount)) {
            alert("Please enter a valid amount.");
            return;
        }

        const expense = {
            amount: amount,
            description: description,
            category: category,
            timestamp: new Date().toISOString();
        };

        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.push(expense);
        localStorage.setItem("expenses", JSON.stringify(expenses));

        updateExpenseList();
        expenseForm.reset();
    });

    expenseList.addEventListener("click", function (e) {
        if (e.target && e.target.classList.contains("delete-btn")) {
            const index = parseInt(e.target.getAttribute("data-index"));
            deleteExpense(index);
        }
    });

    function updateExpenseList() {
        expenseList.innerHTML = "";
        const expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        
        expenses.forEach((expense, index) => {
            const listItem = document.createElement("li");
            listItem.className = "list-group-item";
            listItem.innerHTML = `
                <strong>${expense.description}</strong> - ${expense.amount} (${expense.category})
                <button type="button" class="btn btn-danger btn-sm float-end delete-btn" data-index="${index}">Delete Expense</button>
                <button type="button" class="btn btn-primary btn-sm float-end edit-btn" data-index="${index}">Edit Expense</button>
            `;
            expenseList.appendChild(listItem);
        });
    }

    function editExpense(index) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        const editedExpense = expenses[index];
        const newAmount = parseFloat(prompt("Enter new amount:", editedExpense.amount));
        if (!isNaN(newAmount)) {
            editedExpense.amount = newAmount;
            localStorage.setItem("expenses", JSON.stringify(expenses));
            updateExpenseList();
        }
    }
    
    function deleteExpense(index) {
        let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
        expenses.splice(index, 1);
        localStorage.setItem("expenses", JSON.stringify(expenses));
        updateExpenseList();
    }

    updateExpenseList();
});



    
