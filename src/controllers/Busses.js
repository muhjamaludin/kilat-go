const BusModel = require('../models/Busses')

module.exports = {
  read: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    let { search, sort } = req.query
    console.log(search)
    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'id', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { search, sort }
    const results = await BusModel.getAllBus(conditions)
    results.forEach(function (o, i) {
      results[i].picture = process.env.APP_USER_PICTURE_URI.concat(results[i].picture)
    })
    conditions.totalData = await BusModel.getAllBus(conditions)
    delete conditions.search
    delete conditions.sort

    const data = {
      success: true,
      data: results,
      pageinfo: conditions
    }
    res.send(data)
  },
  create: async function (req, res) {
    // if user upload a picture
    const picture = (req.file && req.file.filename) || null
    const { busName, busSeat, classBus, idRoute } = req.body

    const results = await BusModel.createBus(picture, busName, busSeat, classBus, idRoute)

    const data = {
      success: true,
      msg: `Bus ${busName} with ${busSeat} and class ${classBus} seat has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  update: async function (req, res) {
    const picture = (req.file && req.file.filename) || null
    const { id } = req.params
    const { busName, busSeat, classBus, idRoute } = req.body
    const results = await BusModel.updateBus(id, picture, busName, busSeat, classBus, idRoute)
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
