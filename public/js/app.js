document.getElementById('expenseForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Obtener los valores del formulario
    const description = document.getElementById('description').value;
    const amount = parseFloat(document.getElementById('amount').value);
    const installments = parseInt(document.getElementById('installments').value, 10);
    const startMonth = document.getElementById('startMonth').value;

    // Llamar al controlador para manejar el negocio
    fetch('/api/expenses', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description, amount, installments, startMonth })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        updateExpensesTable(data);
    })
    .catch(error => console.error('Error:', error));
});

function updateExpensesTable(expenses) {
    const summaryTable = document.getElementById('expensesTable');
    summaryTable.querySelector('tbody').innerHTML = '';

    expenses.forEach(expense => {
        const row = document.createElement('tr');
        row.dataset.description = expense.description;

        let cell = document.createElement('td');
        cell.textContent = expense.description;
        row.appendChild(cell);

        expense.monthlyAmounts.forEach(amount => {
            cell = document.createElement('td');
            cell.textContent = amount.toFixed(2);
            row.appendChild(cell);
        });

        summaryTable.querySelector('tbody').appendChild(row);
    });

    updateMonthlyTotals(expenses);
}

function updateMonthlyTotals(expenses) {
    const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const totals = new Array(12).fill(0);

    expenses.forEach(expense => {
        expense.monthlyAmounts.forEach((amount, index) => {
            totals[index] += amount;
        });
    });

    const totalsTable = document.getElementById('monthlyTotals');
    totalsTable.querySelector('tbody').innerHTML = '';

    totals.forEach((total, index) => {
        const row = document.createElement('tr');
        const monthCell = document.createElement('td');
        monthCell.textContent = months[index];
        const totalCell = document.createElement('td');
        totalCell.textContent = total.toFixed(2);
        row.appendChild(monthCell);
        row.appendChild(totalCell);
        totalsTable.querySelector('tbody').appendChild(row);
    });
}
