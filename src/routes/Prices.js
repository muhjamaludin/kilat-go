const PricesControllers = require('../controllers/Prices')
const Prices = require('express').Router()

const AuthMiddleware = require('../middleware/Auth')

const Price = () => {
  Prices.get('/', PricesControllers.read)
  Prices.get('/:id', PricesControllers.getPrices)
  Prices.post('/', AuthMiddleware.checkAuthToken, PricesControllers.create)
  Prices.patch('/:id', AuthMiddleware.checkAuthToken, PricesControllers.update)
  Prices.delete('/:id', AuthMiddleware.checkAuthToken, PricesControllers.delete)
}

Price()

module.exports = Prices
