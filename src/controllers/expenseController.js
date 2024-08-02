const expenseModel = require('../models/expenseModel');

exports.addExpense = (req, res) => {
    const { description, amount, installments, startMonth } = req.body;
    const expenses = expenseModel.addExpense(description, amount, installments, startMonth);
    res.status(201).json(expenses);  // Cambiar a 201 Created
};

exports.getExpenses = (req, res) => {
    const expenses = expenseModel.getExpenses();
    res.status(200).json(expenses);  // Asegurar código 200 OK
};
