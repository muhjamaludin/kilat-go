const TransactionsModel = require('../models/Transactions')

module.exports = {
  read: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const results = await TransactionsModel.getAllPrice()

    const data = {
      success: true,
      data: results
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
