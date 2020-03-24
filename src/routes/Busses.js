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
  limits: { fileSize: 100 },
  fileFilter: function (req, file, cb) {
    if (file.mimetype === '.jpg') {
      return cb(new Error('Wrong file type'))
    }
    cb(null, true)
  }
})

const busses = () => {
  Busses.get('/', BusControllers.read)
  Busses.post('/', upload.single('picture'), BusControllers.create)
  Busses.patch('/:id', upload.single('picture'), BusControllers.update)
  Busses.delete('/:id', BusControllers.delete)
}

busses()

module.exports = Busses
