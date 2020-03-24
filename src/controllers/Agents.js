const AgentsModel = require('../models/Agents')

module.exports = {
  read: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const results = await AgentsModel.getAllAgent()

    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { idUser, name } = req.body
    // insert data into database with model
    const results = await AgentsModel.createAgents(idUser, name)

    const data = {
      success: true,
      msg: `Agent ${name} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const { id } = req.params
    const { idUser, name } = req.body
    const results = await AgentsModel.updateAgents(id, idUser, name)
    delete req.body.password
    if (results) {
      const data = {
        success: true,
        msg: `Agents ${name} has been updated!`,
        data: { id, ...req.body }
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be updated'
      }
      res.send(data)
    }
  },
  delete: async function (req, res) {
    const { id } = req.params
    const results = await AgentsModel.deleteAgents(id)
    if (results) {
      const data = {
        success: true,
        msg: `Agent with id ${id} has been deleted!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted'
      }
      res.send(data)
    }
  }
}
