const BusControllers = require('../controllers/Busses')
const Busses = require('express').Router()
const multer = require('multer')
const storage = multer.diskStorage({
  destination: 'files/bus/',
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}-${file.originalname}`)
  }
})
const upload = multer({
  storage: storage,
  limits: { fileSize: 100000 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === '.jpg') {
      return cb(new Error('Wrong file type'))
    }
    cb(null, true)
  }
})

const AuthMiddleware = require('../middleware/Auth')

const busses = () => {
  Busses.get('/', BusControllers.read)
  Busses.get('/:id', BusControllers.getBus)
  Busses.post('/add', AuthMiddleware.checkAuthToken, upload.single('picture'), BusControllers.create)
  Busses.patch('/:id', AuthMiddleware.checkAuthToken, upload.single('picture'), BusControllers.update)
  Busses.delete('/:id', AuthMiddleware.checkAuthToken, BusControllers.delete)
}

busses()

module.exports = Busses
