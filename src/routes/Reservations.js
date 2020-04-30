const ReservationsControllers = require('../controllers/Reservations')
const Reservation = require('express').Router()
const AuthMiddleware = require('../middleware/Auth')

Reservation.get('/', ReservationsControllers.read)
Reservation.get('/:id', ReservationsControllers.getReservation)
Reservation.post('/', AuthMiddleware.checkAuthToken, ReservationsControllers.create)
Reservation.patch('/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.update)
Reservation.delete('/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.delete)

module.exports = Reservation
