const db = require('../utils/db')

module.exports = {
  getAllPrice: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'price', value: '' }
    search = search || { key: 'price', value: '' }
    const table = 'transactions'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT buses.bus_name, buses.classBus, routes.departure, routes.destination, schedules.departure_time, schedules.arrive_time, price, transactions.id 
      FROM transactions JOIN buses ON transactions.id_bus=buses.id JOIN routes ON transactions.id_route=routes.id JOIN schedules ON transactions.id_schedule=schedules.id 
      WHERE ${search.key} LIKE '${search.value}%' ORDER BY price ${sort.value ? 'ASC' : 'DESC'} LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
  getPriceById: function (id) {
    const table = 'transactions'
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
  getTotalPrice: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'price', value: '' }
    const table = 'transactions'
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
