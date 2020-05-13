const AgentsControllers = require('../controllers/Agents')
const Agents = require('express').Router()

const AuthMiddleware = require('../middleware/Auth')

const Agent = () => {
  Agents.get('/', AgentsControllers.read)
  Agents.get('/:id', AgentsControllers.getAgent)
  Agents.get('/user', AuthMiddleware.checkAuthToken, AgentsControllers.getUser)
  Agents.post('/add', AuthMiddleware.checkAuthToken, AgentsControllers.create)
  Agents.patch('/:id', AuthMiddleware.checkAuthToken, AgentsControllers.createById)
  // Agents.patch('/:id', AgentsControllers.update)
  Agents.delete('/:id', AuthMiddleware.checkAuthToken, AgentsControllers.delete)
}

Agent()

module.exports = Agents
