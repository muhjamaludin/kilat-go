const db = require('../utils/db')

module.exports = {
  getAllBoards: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'bus_name', value: '' }
    search = search || { key: 'bus_name', value: '' }
    const table = 'boards'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT boards.id AS id, agents.name AS agent, buses.bus_name AS busName, buses.class_bus AS classBus, routes.departure AS departure, routes.destination AS destination, 
      schedules.departure_time AS timeGo, schedules.arrive_time AS arrive, prices.price AS price, boards.seat AS seat, boards.schedule AS schedule 
      FROM buses JOIN agents ON buses.id_agents=agents.id JOIN routes ON buses.id_bus_route=routes.id JOIN schedules ON buses.id_bus_schedule=schedules.id 
      JOIN prices ON prices.id_bus=buses.id JOIN boards ON prices.id=boards.id_price 
      WHERE ${search.key} LIKE '%${search.value}%' ORDER BY ${sort.key} ${parseInt(sort.value) ? 'ASC' : 'DESC'} LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
    const table = 'boards'
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
  getTotalBoard: function (conditions = {}, table) {
    let { search } = conditions
    search = search || { key: 'bus_name', value: '' }
    // const table = 'boards'
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
    const table = 'boards'
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
