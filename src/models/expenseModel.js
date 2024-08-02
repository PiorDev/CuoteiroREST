class ExpenseModel {
    constructor() {
        this.expenses = [];
    }

    addExpense(description, amount, installments, startMonth) {
        const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        const startIndex = months.indexOf(startMonth);
        const amountPerMonth = (amount / installments).toFixed(2);

        const monthlyAmounts = new Array(12).fill(0);
        for (let i = 0; i < installments; i++) {
            const monthIndex = (startIndex + i) % 12;
            monthlyAmounts[monthIndex] = parseFloat(amountPerMonth);
        }

        this.expenses.push({ description, monthlyAmounts });
        return this.expenses;
    }

    getExpenses() {
        return this.expenses;
    }
}

module.exports = new ExpenseModel();
