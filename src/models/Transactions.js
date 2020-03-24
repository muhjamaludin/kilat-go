const db = require('../utils/db')

module.exports = {
  getAllPrice: function () {
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
  createPrice: function (idRoute, idBus, idSchedule, price) {
    const table = 'transactions'
    // roleId = roleId || 3
    const sql = `INSERT INTO ${table} (id_route, id_bus, id_schedule, price) VALUES (${idRoute}, '${idBus}', '${idSchedule}', ${price})`
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
  updatePrice: function (id, idRoute, idBus, idSchedule, price) {
    const table = 'transactions'
    const sql = `UPDATE ${table} SET id_route='${idRoute}', id_bus='${idBus}', id_schedule='${idSchedule}', price=${price} WHERE id=${id}`
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
  deletePrice: function (id) {
    const table = 'transactions'
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
