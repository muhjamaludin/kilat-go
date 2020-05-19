const UserControllers = require('../controllers/Users')
const Users = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'files/profile/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({ storage })

Users.get('/', UserControllers.read)
Users.get('/:id', UserControllers.getUser)
Users.patch('/password/:id', UserControllers.editPassword)
Users.patch('/:id', UserControllers.updatePassword)
Users.post('/role', UserControllers.updateRoleId)
Users.patch('/userdetail/:idUser', UserControllers.updateUser)
Users.patch('/userdetail/picture/:idUser', upload.single('photo'), UserControllers.updatePhoto)
Users.delete('/:id', UserControllers.delete)

Users.patch('/topup/:idUser', UserControllers.topup)

module.exports = Users
