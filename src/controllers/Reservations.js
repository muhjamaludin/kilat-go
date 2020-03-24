const ReservationModel = require('../models/Reservations')

module.exports = {
  read: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    // const { from, to } = req.params
    const { idFrom, idTo } = req.body

    const results = await ReservationModel.getAllReservation(idFrom, idTo)

    const data = {
      success: true,
      data: results
    }
    res.send(data)
  },
  readReservation: async function (req, res) {
    const results = await ReservationModel.getReservation()
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
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const { idUser, idBus, idRoute, idSchedule, idPrice, seat, date } = req.body
    // insert data into database with model
    const results = await ReservationModel.createReservation(idUser, idBus, idRoute, idSchedule, idPrice, seat, date)

    const data = {
      success: true,
      msg: `Reservation from id ${idUser} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const { id } = req.params
    const { idUser, idBus, idRoute, idSchedule, idPrice, seat, date } = req.body
    const results = await ReservationModel.updateReservation(id, idUser, idBus, idRoute, idSchedule, idPrice, seat, date)

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
    const results = await ReservationModel.deleteReservation(id)
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
