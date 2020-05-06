const BusModel = require('../models/Busses')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'bus_name', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await BusModel.getAllBus(conditions)
    // results.forEach(function (o, i) {
    //   results[i].picture = process.env.APP_BUS_PICTURE_URI.concat(results[i].picture)
    // })
    conditions.totalData = await BusModel.getTotalBus(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`bus?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`bus?page=${page - 1}`))
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
  getBus: async function (req, res) {
    const data = {
      success: true,
      data: await BusModel.getBusById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    const picture = (req.file && req.file.filename) || null
    const { idAgent, idBusRoute, idBusSchedule, busName, classBus } = req.body
    console.log('id bus', req.body)
    const results = await BusModel.createBus(idAgent, idBusRoute, idBusSchedule, picture, busName, classBus)
    const data = {
      success: true,
      msg: `Bus ${busName} with class ${classBus} seat has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const picture = (req.file && req.file.filename) || null
    const { id } = req.params
    const { idAgent, idBusRoute, idBusSchedule, busName, classBus, busSeat } = req.body
    const results = await BusModel.updateBus(id, idAgent, idBusRoute, idBusSchedule, picture, busName, classBus, busSeat)
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
    const results = await BusModel.deleteBus(id)
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
