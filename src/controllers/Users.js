const UserModel = require('../models/Users')
const AuthModel = require('../models/Auth')
const bcrypt = require('bcryptjs')

module.exports = {
  read: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        succes: false,
        msg: 'You are not allowed to access this feature'
      }
      res.send(data)
    } else {
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

      let table = 'user_details'
      switch (search.key || sort.key) {
        case 'username':
          table = 'users'
          break
        default:
          table = 'user_details'
          break
      }

      const results = await UserModel.getAllUsers(conditions)
      // results.forEach(function (o, i) {
      //   results[i].picture = process.env.APP_USER_PICTURE_URI.concat(results[i].picture)
      // })
      conditions.totalData = await UserModel.getTotalUsers(conditions, table)
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
    }
  },
  getUser: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        succes: true,
        data: await UserModel.getUserByRoleId(req.params.id)
      }
      res.send(data)
    } else {
      const data = {
        success: true,
        data: await UserModel.getUserById(req.params.id)
      }
      res.send(data)
    }
  },
  updateUser: async function (req, res) {
    const { idUser } = req.params
    console.log(req.body)
    console.log('id user', idUser)
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
  updatePassword: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        succes: false,
        msg: 'You can\'t acces this feature'
      }
      res.send(data)
    } else {
      const { id } = req.params
      const { username, password } = req.body
      if (password === req.body.confirm_password) {
        const encryptedPassword = bcrypt.hashSync(password)
        delete req.body.password
        if (await UserModel.updateUser(id, username, encryptedPassword)) {
          const data = {
            success: true,
            msg: 'Your password has been reset'
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to reset password'
          }
          res.send(data)
        }
      }
    }
  },
  editPassword: async function (req, res) {
    const { id } = req.params
    const { oldPassword, newPassword } = req.body
    if (newPassword !== req.body.confirm_password) {
      const data = {
        succes: false,
        msg: 'Not match Password'
      }
      res.send(data)
    } else {
      const info = await AuthModel.getUserById(id)
      const checkPassword = bcrypt.compareSync(oldPassword, info.password)
      if (checkPassword) {
        const encryptedPassword = await bcrypt.hashSync(newPassword)
        const result = await UserModel.updatePassword(id, encryptedPassword)
        if (result) {
          const data = {
            succes: true,
            msg: `Your password in id ${id} has been update`
          }
          res.send(data)
        } else {
          const data = {
            succes: false,
            msg: 'failed Made Password'
          }
          res.send(data)
        }
      } else {
        const data = {
          succes: false,
          msg: 'wrong input password old'
        }
        res.send(data)
      }
    }
  },
  updateRoleId: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        succes: false,
        msg: 'You don\'t have authorization for this feature'
      }
      res.send(data)
    } else {
      const { id, RoleId } = req.body
      console.log(id, RoleId, req.body)
      const result = await UserModel.EditRole(id, RoleId)
      if (result) {
        const data = {
          succes: true,
          msg: `Your role id has been update to be ${RoleId}`
        }
        res.send(data)
      } else {
        const data = {
          succes: false,
          msg: 'failed edit Role Id'
        }
        res.send(data)
      }
    }
  },
  delete: async function (req, res) {
    if (req.user.roleId !== 1) {
      const data = {
        succes: false,
        msg: 'You don\'t have auhtorization for this feature'
      }
      res.send(data)
    } else {
      const { id } = req.params
      const results = await UserModel.deleteUser(id)
      if (results) {
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
    }
  },
  topup: async function (req, res) {
    const { idUser } = req.params
    const { balance } = req.body
    console.log('id', idUser, 'saldo', balance)
    const result = await UserModel.topup(idUser, balance)
    if (result) {
      const data = {
        succes: true,
        msg: `Your balance has been added with ${balance} rupiah`
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
