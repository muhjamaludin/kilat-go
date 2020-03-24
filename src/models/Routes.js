const db = require('../utils/db')

module.exports = {
  getAllRoute: function () {
    const table = 'routes'
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
  createRoute: function (departure, destination) {
    const table = 'routes'
    // roleId = roleId || 3
    const sql = `INSERT INTO ${table} (departure, destination) VALUES ('${departure}', '${destination}')`
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
  updateRoute: function (id, departure, destination) {
    const table = 'routes'
    const sql = `UPDATE ${table} SET departure='${departure}', destination='${destination}' WHERE id=${id}`
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
  deleteRoute: function (id) {
    const table = 'routes'
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
