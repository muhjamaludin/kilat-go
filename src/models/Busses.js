const db = require('../utils/db')

module.exports = {
  getAllBus: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'bus_name', value: '' }
    search = search || { key: 'bus_name', value: '' }
    const table = 'buses'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT bus_name, bus_seat, classBus, routes.departure, routes.destination, buses.id FROM ${table}
      JOIN routes ON buses.id_bus_route=routes.id WHERE ${search.key} LIKE '${search.value}%'
      ORDER BY bus_name ${sort.value ? 'ASC' : 'DESC'}  LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
  getBusById: function (id) {
    const table = 'buses'
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
  getTotalBus: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'bus_name', value: '' }
    const table = 'buses'
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
  createBus: function (picture, busName, busSeat, classBus, idRoute) {
    const table = 'buses'
    // roleId = roleId || 3
    // idRoute = idRoute || 1
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `INSERT INTO ${table} (picture, bus_name, bus_seat, classBus, id_bus_route) VALUES (${picture}, '${busName}', '${busSeat}', '${classBus}', ${idRoute})`
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
  updateBus: function (id, picture, busName, busSeat, classBus, idRoute) {
    const table = 'buses'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `UPDATE ${table} SET picture=${picture}, bus_name='${busName}', bus_seat='${busSeat}', classBus='${classBus}', id_bus_route=${idRoute} WHERE id=${id}`
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
  deleteBus: function (id) {
    const table = 'buses'
    const sql = `DELETE FROM ${table} WHERE id=${id}`
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
  }
}
