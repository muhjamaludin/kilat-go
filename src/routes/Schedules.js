const ScheduleControllers = require('../controllers/Schedules')
const Schedules = require('express').Router()

const AuthMiddleware = require('../middleware/Auth')

const Schedule = () => {
  Schedules.get('/', ScheduleControllers.read)
  Schedules.get('/:id', ScheduleControllers.getSchedule)
  Schedules.post('/add', AuthMiddleware.checkAuthToken, ScheduleControllers.create)
  Schedules.patch('/:id', AuthMiddleware.checkAuthToken, ScheduleControllers.update)
  Schedules.delete('/:id', AuthMiddleware.checkAuthToken, ScheduleControllers.delete)
}

Schedule()

module.exports = Schedules
