const db = require('../utils/db')

module.exports = {
  getAllSchedule: function () {
    const table = 'schedules'
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
  createSchedule: function (departure, arrive) {
    const table = 'schedules'
    // roleId = roleId || 3
    const sql = `INSERT INTO ${table} (departure_time, arrive_time) VALUES ('${departure}', '${arrive}')`
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
  updateSchedule: function (id, departure, arrive) {
    const table = 'schedules'
    const sql = `UPDATE ${table} SET departure_time='${departure}', arrive_time='${arrive}' WHERE id=${id}`
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
  deleteSchedule: function (id) {
    const table = 'schedules'
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
