const db = require('../utils/db')

module.exports = {
  getAllPrice: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'price', value: '' }
    search = search || { key: 'price', value: '' }
    const table = 'prices'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT prices.id, buses.bus_name, buses.class_bus, routes.departure, routes.destination, schedules.departure_time, schedules.arrive_time, prices.price
      FROM buses JOIN routes ON routes.id=buses.id_bus_route JOIN schedules ON schedules.id=buses.id_bus_schedule JOIN ${table} ON buses.id=${table}.id_bus 
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
    const table = 'prices'
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
    const table = 'prices'
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
  createPrice: function (idBus, price) {
    const table = 'prices'
    const sql = `INSERT INTO ${table} (id_bus, price) VALUES (${idBus}, ${price})`
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
  updatePrice: function (id, idBus, price) {
    const table = 'prices'
    const sql = `UPDATE ${table} SET id_bus='${idBus}', price=${price} WHERE id=${id}`
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
    const table = 'prices'
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
