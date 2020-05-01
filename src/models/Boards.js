const db = require('../utils/db')

module.exports = {
  getAllBoards: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'bus_name', value: '' }
    search = search || { key: 'bus_name', value: '' }
    const table = 'reservations'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT users.username, buses.bus_name, buses.classBus, routes.departure, routes.destination, schedules.departure_time, schedules.arrive_time, seat from 
      ${table} join users on reservations.id_user=users.id join buses on reservations.id_bus=buses.id join routes on reservations.id_route=routes.id 
      join schedules on reservations.id_schedule=schedules.id `
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
  getBoardById: function (id) {
    const table = 'reservations'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE id=${id}`
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
  getTotalBoard: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'bus_name', value: '' }
    const table = 'reservations'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT (*) AS total FROM ${table}
      WHERE ${search.key} LIKE '${search.value}%'`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results[0].total)
        }
      })
    })
  },
  createBoard: function (idPrice, schedule, seat) {
    const table = 'boards'
    const sql = `INSERT INTO ${table} (id_price, schedule, seat) VALUES (${idPrice}, '${schedule}', ${seat})`
    return new Promise(function (resolve, reject) {
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateBoard: function (id, idPrice, schedule, seat) {
    const table = 'boards'
    const sql = `UPDATE ${table} SET id_price=${idPrice}, schedule='${schedule}', seat=${seat} WHERE id=${id}`
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
  deleteBoard: function (id) {
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
