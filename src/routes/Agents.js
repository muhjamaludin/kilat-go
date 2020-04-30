const AgentsControllers = require('../controllers/Agents')
const Agents = require('express').Router()

const AuthMiddleware = require('../middleware/Auth')

const Agent = () => {
  Agents.get('/', AgentsControllers.read)
  Agents.get('/:id', AgentsControllers.getAgent)
  Agents.post('/add', AuthMiddleware.checkAuthToken, AgentsControllers.create)
  Agents.patch('/:id', AgentsControllers.update)
  Agents.delete('/:id', AgentsControllers.delete)
}

Agent()

module.exports = Agents
