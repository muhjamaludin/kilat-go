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
Users.post('/', UserControllers.create)
Users.patch('/:id', UserControllers.update)
Users.delete('/:id', UserControllers.delete)
Users.post('/topup', UserControllers.topup)

Users.get('/userdetail', UserControllers.readUser)
Users.post('/userdetail/', upload.any('picture'), UserControllers.createUser)
Users.patch('/userdetail/:id', upload.any('picture'), UserControllers.updateUser)

module.exports = Users
