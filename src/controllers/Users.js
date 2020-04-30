const UserModel = require('../models/Users')

module.exports = {
  read: async function (req, res) {
    let { page, limit, search, sort } = req.query
    page = parseInt(page) || 1
    limit = parseInt(limit) || 5

    let key = search && Object.keys(search)[0]
    let value = search && Object.values(search)[0]
    search = (search && { key, value }) || { key: 'username', value: '' }

    key = sort && Object.keys(sort)[0]
    value = sort && Object.values(sort)[0]
    sort = (sort && { key, value }) || { key: 'id', value: 1 }
    const conditions = { page, perPage: limit, search, sort }

    const results = await UserModel.getAllUsers(conditions)
    results.forEach(function (o, i) {
      results[i].picture = process.env.APP_USER_PICTURE_URI.concat(results[i].picture)
    })
    conditions.totalData = await UserModel.getTotalUsers(conditions)
    conditions.totalPage = Math.ceil(conditions.totalData / conditions.perPage)
    conditions.nextLink = (page >= conditions.totalPage ? null : process.env.APP_URI.concat(`users?page=${page + 1}`))
    conditions.prevLink = (page <= 1 ? null : process.env.APP_URI.concat(`users?page=${page - 1}`))
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
  getUser: async function (req, res) {
    const data = {
      success: true,
      data: await UserModel.getUserById(req.params.id)
    }
    res.send(data)
  },
  readUser: async function (req, res) {
    const { id } = req.body
    if (req.user.roleId === 1) {
      const results = await UserModel.getAllUserDetail()

      const data = {
        success: true,
        data: results
      }
      res.send(data)
    }
    if (req.user.userId === id) {
      const result = await UserModel.getOneUserDetail(id)
      const data = {
        succes: true,
        data: result
      }
      res.send(data)
    } else {
      const data = {
        succes: false,
        msg: 'You in false profile'
      }
      res.send(data)
    }
  },
  create: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'You\'re not allowed to access this feature'
      }
      res.send(data)
    }
    const { username, password } = req.body
    // insert data into database with model
    const results = await UserModel.createUser(username, password)
    // delete password from req.body object
    delete req.body.password
    const data = {
      success: true,
      msg: `User ${username} has been created`,
      data: { id: results, ...req.body }
    }
    res.send(data)
  },
  createUser: async function (req, res) {
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    // if user upload a picture
    const picture = (req.file && req.file.filename) || null
    const { identity, firstname, lastname, gender, email, phone, address, balance } = req.body
    // insert data into database with model
    const results = await UserModel.createUserDetail(picture, identity, firstname, lastname, gender, email, phone, address, balance)
    if (results) {
      const data = {
        success: true,
        msg: `User ${firstname} ${lastname} has been created`,
        data: { id: results, ...req.body }
      }
      res.send(data)
    }
  },
  updateUser: async function (req, res) {
    const { idUser } = req.params
    console.log('id user', idUser)
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const { identity, fullname, gender, email, phone, address } = req.body
    const results = await UserModel.updateUserDetail(idUser, identity, fullname, gender, email, phone, address)
    if (results) {
      const data = {
        success: true,
        msg: `User with id ${idUser} has been updated!`,
        data: { idUser, ...req.body }
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
  updatePhoto: async function (req, res) {
    const { idUser } = req.params
    // if (req.user.roleId !== 1) {
    //   const data = {
    //     success: false,
    //     msg: 'You\'re not allowed to access this feature'
    //   }
    //   res.send(data)
    // }
    const photo = (req.file && req.file.filename) || null
    console.log(req.file)
    const results = await UserModel.updatePhotoUser(idUser, photo)
    if (results) {
      const data = {
        success: true,
        msg: `Photo with id ${idUser} has been updated!`,
        data: { idUser, ...req.body }
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
  update: async function (req, res) {
    const { id } = req.params
    const { username, password } = req.body
    const results = await UserModel.updateUser(id, username, password)
    delete req.body.password
    if (results) {
      const data = {
        success: true,
        msg: `User with id ${id} has been updated!`,
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
    // const results = await UserModel.deleteUser(id)
    const resultDetails = await UserModel.deleteUserDetail(id)
    if (resultDetails) {
      const data = {
        success: true,
        msg: `Users with id ${id} has been deleted!`
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'There is no data can be deleted'
      }
      res.send(data)
    }
  },
  topup: async function (req, res) {
    const { id, balance } = req.body
    const result = await UserModel.topup(id, balance)
    if (result) {
      const data = {
        succes: true,
        msg: `You balance has been added with ${balance} rupiah`
      }
      res.send(data)
    } else {
      const data = {
        succes: false,
        msg: 'failed topup'
      }
      res.send(data)
    }
  }
}
