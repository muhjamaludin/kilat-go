const BoardsModel = require('../models/Boards')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'seat', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }
    let table = 'boards'
    switch (search.key) {
      case 'name':
        table = 'agents'
        break;
      case 'bus_name':
      case 'class_bus':
        table = 'buses'
        break;
      case 'departure':
      case 'destination':
        table = 'routes'
        break;
      case 'departure_time':
      case 'arrive_time':
        table = 'schedules'
        break;
      case 'price':
        table = 'prices'
        break;
      default:
        table = 'boards'
        break;
    }
    console.log('isi value', sort)
    const results = await BoardsModel.getAllBoards(conditions)
    conditions.totalData = await BoardsModel.getTotalBoard(conditions, table)
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
  getReservation: async function (req, res) {
    const data = {
      success: true,
      data: await BoardsModel.getBoardById(req.params.id)
    }
    res.send(data)
  },
  readReservation: async function (req, res) {
    const results = await BoardsModel.getReservation()
    if (results) {
      const data = {
        success: true,
        data: results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        data: 'You can\'t see reservation'
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    const { idPrice, schedule, seat } = req.body
    const results = await BoardsModel.createBoard(idPrice, schedule, seat)
    const data = {
      success: true,
      msg: `Board from idPrice ${idPrice} and schedule ${schedule} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const { id } = req.params
    const { idPrice, schedule, seat } = req.body
    const results = await BoardsModel.updateBoard(id, idPrice, schedule, seat)

    if (results) {
      const data = {
        success: true,
        msg: `Board with idPrice ${idPrice} schedule ${schedule} has been updated!`,
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
    const results = await BoardsModel.deleteBoard(id)
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
