const UserModel = require('../models/Users')

module.exports = {
  read: async function (req, res) {
    const { id } = req.body
    if (req.user.roleId === 1) {
      const results = await UserModel.getAllUsers()
      const data = {
        success: false,
        data: results
      }
      res.send(data)
    } else if (id == req.user.userId) {
      const results = await UserModel.getOneUsers(id)
      const data = {
        success: true,
        data: results
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        data: 'This is not your account'
      }
      res.send(data)
    }
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
    if (req.user.userId == id) {
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
    const { id } = req.body
    if (req.user.roleId !== 1) {
      const data = {
        success: false,
        msg: 'You\'re not allowed to access this feature'
      }
      res.send(data)
    }
    const picture = (req.file && req.file.filename) || null
    const { identity, firstname, lastname, gender, email, phone, address, balance } = req.body
    // if ((idUser || picture || identity || firstname || lastname || gender || email || phone || address || balance) === '') {
    //   const data = {
    //     succes: false,
    //     msg: 'You must enter all required'
    //   }
    //   res.send(data)
    // }
    // if (req.res.userId == id) {
    const results = await UserModel.updateUserDetail(id, picture, identity, firstname, lastname, gender, email, phone, address, balance)
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
