const TransactionsControllers = require('../controllers/Transactions')
const Transactions = require('express').Router()

const Transaction = () => {
  Transactions.get('/', TransactionsControllers.read)
  Transactions.post('/', TransactionsControllers.create)
  Transactions.patch('/:id', TransactionsControllers.update)
  Transactions.delete('/:id', TransactionsControllers.delete)
}

Transaction()

module.exports = Transactions
