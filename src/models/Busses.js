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
      const sql = `SELECT * FROM ${table} WHERE ${search.key} LIKE '${search.value}%'
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
  createBus: function (idAgent, idBusRoute, idBusSchedule, picture, busName, classBus) {
    const table = 'buses'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `INSERT INTO ${table} (id_agents, id_bus_route, id_bus_schedule, picture, bus_name, class_bus, bus_seat) VALUES 
    (${idAgent}, ${idBusRoute}, ${idBusSchedule}, ${picture}, '${busName}', '${classBus}')`
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
  updateBus: function (id, idAgent, idBusRoute, idBusSchedule, picture, busName, classBus) {
    const table = 'buses'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `UPDATE ${table} SET id_agents=${idAgent}, id_bus_route=${idBusRoute}, id_bus_schedule=${idBusSchedule}, 
    picture=${picture}, bus_name='${busName}', class_bus='${classBus}' WHERE id=${id}`
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
