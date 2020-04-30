const express = require('express')
const bodyParser = require('body-parser')
require('dotenv').config()
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

const AuthMiddleware = require('./src/middleware/Auth')

app.get('/migrate', function (req, res) {
  require('./src/migrations/Users')
  require('./src/migrations/Busses')
  require('./src/migrations/Routes')
  require('./src/migrations/Schedules')
  require('./src/migrations/Transactions')
  require('./src/migrations/Reservations')
  require('./src/migrations/Agent')
  const data = {
    success: true,
    msg: 'Data has been migrated'
  }
  res.send(data)
})

const AuthRoutes = require('./src/routes/Auth')
// const root = require('./src/routes/Reservations')
const UserRoutes = require('./src/routes/Users')
const BusRoutes = require('./src/routes/Busses')
const RouteRoutes = require('./src/routes/Routes')
const ScheduleRoutes = require('./src/routes/Schedules')
const TransactionsRoutes = require('./src/routes/Transactions')
const AgentsRoutes = require('./src/routes/Agents')
const Reservations = require('./src/routes/Reservations')

app.use('/auth', AuthRoutes)
// app.use('/', root)
app.use('/users', AuthMiddleware.checkAuthToken, UserRoutes)
app.use('/bus', BusRoutes)
app.use('/route', RouteRoutes)
app.use('/schedule', ScheduleRoutes)
app.use('/transaction', TransactionsRoutes)
app.use('/agents', AgentsRoutes)
app.use('/reserve', Reservations)

app.listen(process.env.APP_PORT, function () {
  console.log(`App Listen on Port ${process.env.APP_PORT}`)
})
