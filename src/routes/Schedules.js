const ScheduleControllers = require('../controllers/Schedules')
const Schedules = require('express').Router()

const Schedule = () => {
  Schedules.get('/', ScheduleControllers.read)
  Schedules.get('/:id', ScheduleControllers.getSchedule)
  Schedules.post('/', ScheduleControllers.create)
  Schedules.patch('/:id', ScheduleControllers.update)
  Schedules.delete('/:id', ScheduleControllers.delete)
}

Schedule()

module.exports = Schedules
