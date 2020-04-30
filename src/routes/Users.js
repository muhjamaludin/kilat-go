const UserControllers = require('../controllers/Users')
const Users = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'files/propil/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

Users.get('/', UserControllers.read)
Users.get('/:id', UserControllers.getUser)
Users.get('/userdetail', UserControllers.readUser)
Users.patch('/userdetail/:id', upload.any('picture'), UserControllers.updateUser)
Users.patch('/userdetail/picture/:id', upload.any('picture'), UserControllers.updateUser)
Users.delete('/:id', UserControllers.delete)

Users.post('/topup', UserControllers.topup)

module.exports = Users
