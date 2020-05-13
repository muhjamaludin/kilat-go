const ReservationsControllers = require('../controllers/Reservations')
const BoardsControllers = require('../controllers/Boards')
const Reservation = require('express').Router()
const AuthMiddleware = require('../middleware/Auth')

Reservation.get('/board/', BoardsControllers.read)
Reservation.get('/board/:id', BoardsControllers.getReservation)
Reservation.post('/board/', AuthMiddleware.checkAuthToken, BoardsControllers.create)
Reservation.patch('/board/:id', AuthMiddleware.checkAuthToken, BoardsControllers.update)
Reservation.delete('/board/:id', AuthMiddleware.checkAuthToken, BoardsControllers.delete)

Reservation.get('/', AuthMiddleware.checkAuthToken, ReservationsControllers.read)
Reservation.get('/seat/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.readSeat)
// Reservation.get('/searchbus', AuthMiddleware.checkAuthToken, ReservationsControllers.readBus)
Reservation.get('/:id',  AuthMiddleware.checkAuthToken,  ReservationsControllers.getReservation)
Reservation.post('/add/:id',  AuthMiddleware.checkAuthToken, ReservationsControllers.create)
Reservation.patch('/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.update)
Reservation.delete('/:id', AuthMiddleware.checkAuthToken, ReservationsControllers.delete)

module.exports = Reservation
