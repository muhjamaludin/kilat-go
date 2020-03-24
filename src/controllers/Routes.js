const RouteModel = require('../models/Routes')

module.exports = {
  read: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const results = await RouteModel.getAllRoute()

    const data = {
      success: true,
      data: results
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
