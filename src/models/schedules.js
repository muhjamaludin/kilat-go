const db = require('../utils/db')

module.exports = {
  getAllSchedule: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'departure_time', value: '' }
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE departure_time LIKE '${search.value}%'
      ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'} LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
  getScheduleById: function (id) {
    const table = 'schedules'
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
  getTotalSchedule: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'departure_time', value: '' }
    const table = 'schedules'
    return new Promise(function (resolve, reject) {
      const sql = `
      SELECT COUNT (*) AS total FROM ${table}
      WHERE departure_time LIKE '${search.value}%'`
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
        console.log(sql)
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
