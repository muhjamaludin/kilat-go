const RouteControllers = require('../controllers/Routes')
const Routes = require('express').Router()

const routes = () => {
  Routes.get('/', RouteControllers.read)
  Routes.post('/', RouteControllers.create)
  Routes.patch('/:id', RouteControllers.update)
  Routes.delete('/:id', RouteControllers.delete)
}

routes()

module.exports = Routes
