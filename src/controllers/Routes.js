const RouteModel = require('../models/Routes')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'departure', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await RouteModel.getAllRoute(conditions)
    conditions.totalData = await RouteModel.getTotalRoute(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`route?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`route?page=${page - 1}`))
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
  getRoute: async function (req, res) {
    const data = {
      success: true,
      data: await RouteModel.getRouteById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const { departure, destination } = req.body
    // insert data into database with model
    const results = await RouteModel.createRoute(departure, destination)

    const data = {
      success: true,
      msg: `Route from ${departure} to ${destination} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const { id } = req.params
    const { departure, destination } = req.body
    const results = await RouteModel.updateRoute(id, departure, destination)
    delete req.body.password
    if (results) {
      const data = {
        success: true,
        msg: `Bus with id ${id} has been updated!`,
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
    const results = await RouteModel.deleteRoute(id)
    if (results) {
      const data = {
        success: true,
        msg: `Bus with id ${id} has been deleted!`
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
