document.getElementById("expenseForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const amount = parseFloat(document.getElementById("amount").value);
    const category = document.getElementById("category").value;
    const description = document.getElementById("description").value;
    const timestamp = document.getElementById("timestamp").value || new Date().toISOString();

    if (!amount || !category || isNaN(amount)) {
        alert("Please enter valid data.");
        return;
    }

    const newExpense = { amount, category, description, timestamp };

	fetch("/api/expenses", {
	  method: "POST",
	  headers: { "Content-Type": "application/json" },
	  body: JSON.stringify(newExpense)
	})

    .then(response => response.json())
    .then(data => {
        expenses.push(data);
        updateCharts();
        e.target.reset();
    })
    .catch(error => {
        console.error("Failed to save expense:", error);
        alert("Something went wrong while saving the expense.");
    });
});

function loadExpensesFromBackend() {
	fetch("/api/expenses")
        .then(response => response.json())
        .then(data => {
            data.forEach(exp => expenses.push(exp));
            updateCharts();
        })
        .catch(error => console.error("Failed to load expenses:", error));
}

window.addEventListener("DOMContentLoaded", () => {
    initCharts();
    loadExpensesFromBackend();
});
