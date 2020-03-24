const AgentsControllers = require('../controllers/Agents')
const Agents = require('express').Router()

const Agent = () => {
  Agents.get('/', AgentsControllers.read)
  Agents.post('/', AgentsControllers.create)
  Agents.patch('/:id', AgentsControllers.update)
  Agents.delete('/:id', AgentsControllers.delete)
}

Agent()

module.exports = Agents
