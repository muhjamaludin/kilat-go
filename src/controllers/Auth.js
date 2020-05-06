const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const uuid = require('uuid').v4
const AuthModel = require('../models/Auth')
const UserModel = require('../models/Users')

module.exports = {
  login: async function (req, res) {
    const { username, password } = await req.body
    const checkUser = await AuthModel.checkUsername(username)
    console.log(username)
    console.log(password)
    if (!checkUser) {
      const data = {
        success: false,
        msg: 'Wrong Username or Password',
        username: `${username}`
      }
      res.send(data)
    } else {
      const info = await AuthModel.getUserByUsername(username)
      const checkPassword = bcrypt.compareSync(password, info.password)
      if (checkPassword) {
        if (await AuthModel.checkVerifiedUser(info.id)) {
          if (await AuthModel.checkActivatedUser(info.id)) {
            const payload = { username, roleId: info.role_id, userId: info.id }
            const roleId = payload.roleId
            const options = { expiresIn: '30h' }
            const key = process.env.APP_KEY
            const token = jwt.sign(payload, key, options)
            const data = {
              success: true,
              token,
              roleId
            }
            res.send(data)
          } else {
            const data = {
              success: false,
              msg: 'User has been deactivated!'
            }
            res.send(data)
          }
        } else {
          const data = {
            success: false,
            msg: 'User is not verified!'
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Wrong Username or Password'
        }
        res.send(data)
      }
    }
  },
  register: async function (req, res) {
    const { username, password, email, phone } = await req.body
    const checkUser = await AuthModel.checkUsername(username)
    if (checkUser !== 0) {
      const data = {
        success: false,
        msg: 'Username already used'
      }
      res.send(data)
    } else {
      const encryptedPassword = await bcrypt.hashSync(password)
      const results = await UserModel.createUser(username, encryptedPassword)
      const info = await UserModel.getIdByUsername(username)
      console.log(info[0].id)
      await UserModel.createUserDetail(info[0].id, email, phone)
      if (results) {
        if (await AuthModel.createVerificationCode(results, uuid())) {
          const data = {
            success: true,
            msg: 'Register Successfully',
            id_user: `${results}`
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: "Verification code couldn't be generated"
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Register Failed'
        }
        res.send(data)
      }
    }
  },
  verify: async function (req, res) {
    const { username, code } = req.query
    if (await AuthModel.verifyUser(username, code)) {
      const data = {
        success: true,
        msg: 'User verified successfully'
      }
      res.send(data)
    } else {
      const data = {
        success: false,
        msg: 'Failed to verify user'
      }
      res.send(data)
    }
  },
  forgotPassword: async function (req, res) {
    const { username, password } = req.body
    const { change } = req.query
    console.log(change)
    if (!change) {
      const user = await AuthModel.checkUsername(username)
      if (user) {
        const info = await AuthModel.getUserByUsername(username)
        const generate = await AuthModel.createVerificationCode(info.id, uuid())
        if (generate) {
          const data = {
            success: true,
            msg: 'Verification code has been sent to Email'
          }
          res.send(data)
        } else {
          const data = {
            success: false,
            msg: 'Failed to generate verification code'
          }
          res.send(data)
        }
      } else {
        const data = {
          success: false,
          msg: 'Username not found'
        }
        res.send(data)
      }
    } else {
      if (password === req.body.confirm_password) {
        const encryptedPassword = bcrypt.hashSync(password)
        if (await AuthModel.forgotPassword(change, encryptedPassword)) {
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
      } else {
        const data = {
          success: false,
          msg: "Confirm password doesn't match"
        }
        res.send(data)
      }
    }
  }
}
