const TransactionsModel = require('../models/Transactions')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'price', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await TransactionsModel.getAllPrice(conditions)
    conditions.totalData = await TransactionsModel.getTotalPrice(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`transaction?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`transaction?page=${page - 1}`))
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
  getTransactions: async function (req, res) {
    const data = {
      success: true,
      data: await TransactionsModel.getPriceById(req.params.id)
    }
    res.send(data)
  },
  create: async function (req, res) {
    // get username and password from req.body object
    const { idRoute, idBus, idSchedule, price } = req.body

    // insert data into database with model
    const results = await TransactionsModel.createPrice(idRoute, idBus, idSchedule, price)

    // delete password from req.body object
    // delete req.body.password
    const data = {
      success: true,
      msg: `Price ${price} with bus id bus ${idBus}  has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const { id } = req.params
    const { idRoute, idBus, idSchedule, price } = req.body
    const results = await TransactionsModel.updatePrice(id, idRoute, idBus, idSchedule, price)
    if (results) {
      const data = {
        success: true,
        msg: `Price with id route ${idRoute} and id bus ${idBus} has been updated!`,
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
    const results = await TransactionsModel.deletePrice(id)
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
