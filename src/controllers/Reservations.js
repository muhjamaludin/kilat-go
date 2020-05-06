const ReservationModel = require('../models/Reservations')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'status', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await ReservationModel.getAllReservations(conditions)
    conditions.totalData = await ReservationModel.getTotalReservation(conditions)
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
      data: await ReservationModel.getReservationById(req.params.id)
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
    const { idUser, idPrice, idBoard, seat, status } = req.body
    const results = await ReservationModel.createReservation(idUser, idPrice, idBoard, seat, status)
    const board = await ReservationModel.updateSeatBoard(idBoard, seat)
    console.log('alam lain', board)
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
