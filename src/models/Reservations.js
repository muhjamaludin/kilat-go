const db = require('../utils/db')

module.exports = {
  getAllReservation: function (idFrom, idTo) {
    const table = 'transactions'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT buses.bus_name, buses.class, buses.bus_seat, routes.departure, routes.destination, schedules.departure_time, 
      schedules.arrive_time, price FROM ${table} JOIN buses ON transactions.id_bus=buses.id JOIN
      routes ON transactions.id_route=routes.id JOIN schedules ON transactions.id_schedule=schedules.id
      WHERE routes.id=${idFrom}`
      db.query(sql, function (err, results, fields) {
        console.log(sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getReservation: function () {
    const table = 'transactions'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createReservation: function (idUser, idBus, idRoute, idSchedule, idPrice, seat, date) {
    const table = 'reservations'
    // roleId = roleId || 3
    const sql = `INSERT INTO ${table} (id_user, id_bus, id_route, id_schedule, id_price, seat, date) VALUES (
      ${idUser}, ${idBus}, ${idRoute}, ${idSchedule}, ${idPrice}, '${seat}', ${date})`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateReservation: function (id, idUser, idBus, idRoute, idSchedule, idPrice, seat, date) {
    const table = 'reservations'
    const sql = `UPDATE ${table} SET id_user=${idUser}, id_bus=${idBus}, id_route=${idRoute}, id_schedule=${idSchedule},
    id_price=${idPrice}, seat='${seat}', date=${date} WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  },
  deleteReservation: function (id) {
    const table = 'reservations'
    const sql = `DELETE FROM ${table} WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          if (results.affectedRows) {
            resolve(true)
          } else {
            resolve(false)
          }
        }
      })
    })
  }
}
