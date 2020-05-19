const RouteControllers = require('../controllers/Routes')
const Routes = require('express').Router()

const AuthMiddleware = require('../middleware/Auth')

const routes = () => {
  Routes.get('/', RouteControllers.read)
  Routes.get('/:id', RouteControllers.getRoute)
  Routes.post('/', AuthMiddleware.checkAuthToken, RouteControllers.create)
  Routes.patch('/:id', AuthMiddleware.checkAuthToken, RouteControllers.update)
  Routes.delete('/:id', AuthMiddleware.checkAuthToken, RouteControllers.delete)
}

routes()

module.exports = Routes
