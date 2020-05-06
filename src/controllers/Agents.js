const AgentsModel = require('../models/Agents')
const UserModel = require('../models/Users')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'name', value: '' }
    let table = 'users'
    switch (search.key) {
      case 'name':
        table = 'agents'
        break;
      default:
        table = 'users'
        break;
    }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'agents.id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await AgentsModel.getAllAgents(conditions)
    conditions.totalData = await AgentsModel.getTotalAgents(conditions, table)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`agents?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`agents?page=${page - 1}`))
    delete conditions.search
    delete conditions.sort
    delete conditions.limit

    const data = {
      success: true,
      data: results,
      pageInfo: conditions
    }
    res.send(data)
  },
  getAgent: async function (req, res) {
    const data = {
      success: true,
      data: await AgentsModel.getAgentById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Access not allowed'
      }
      res.send(data)
    } else {
      const { username, name } = req.body
      const userId = await AgentsModel.getIdUserByUsername(username)
      const idUser = userId[0].id
      const results = await AgentsModel.createAgents(idUser, name)
      await UserModel.EditRole(idUser, 2)
      const data = {
        success: true,
        msg: `Agent ${name} has been created`,
        data: { id: results, ...req.body }
      }
      res.send(data)
    }
  },
  createById: async function (req, res) {
    if (req.user.roleId === 3) {
      const data = {
        success: false,
        msg: 'Access not allowed'
      }
      res.send(data)
    } else {
      const { id } = req.params
      const { username, name } = req.body
      const results = await AgentsModel.updateAgentById(id, name)
      if (results) {
        const data = {
          success: true,
          msg: `Agent ${name} has been created`,
          data: { id: results, ...req.body }
        }
        res.send(data)
      } else {
        const data = {
          success: false,
          msg: 'Wrong input id'
        }
        res.send(data)
      }
    }
  },
  // update: async function (req, res) {
  //   const { id } = req.params
  //   const { idUser, name } = req.body
  //   const results = await AgentsModel.updateAgents(id, idUser, name)
  //   delete req.body.password
  //   if (results) {
  //     const data = {
  //       success: true,
  //       msg: `Agents ${name} has been updated!`,
  //       data: { id, ...req.body }
  //     }
  //     res.send(data)
  //   } else {
  //     const data = {
  //       success: false,
  //       msg: 'There is no data can be updated'
  //     }
  //     res.send(data)
  //   }
  // },
  delete: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'Acces not allowed'
      }
      res.send(data)
    } else {
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
}
