const ReservationsControllers = require('../controllers/Reservations')
const BoardsControllers = require('../controllers/Boards')
const Reservation = require('express').Router()
const AuthMiddleware = require('../middleware/Auth')

Reservation.get('/board/', BoardsControllers.read)
Reservation.get('/board/:id', BoardsControllers.getReservation)
Reservation.post('/board/', AuthMiddleware.checkAuthToken, BoardsControllers.create)
Reservation.patch('/board/:id', AuthMiddleware.checkAuthToken, BoardsControllers.update)
Reservation.delete('/board/:id', AuthMiddleware.checkAuthToken, BoardsControllers.delete)

Reservation.get('/', ReservationsControllers.read)
Reservation.get('/:id', ReservationsControllers.getReservation)
Reservation.post('/', AuthMiddleware.checkAuthToken, ReservationsControllers.create)
Reservation.patch('/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.update)
Reservation.delete('/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.delete)

module.exports = Reservation
