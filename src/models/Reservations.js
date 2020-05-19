const db = require('../utils/db')

module.exports = {
  getAllReservations: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'bus_name', value: '' }
    search = search || { key: 'bus_name', value: '' }
    const table = 'reservations'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT reservations.id, users.username AS username, user_details.fullname AS fullname, buses.bus_name AS busName, buses.class_bus AS classBus, 
      reservations.seat AS seat, routes.departure AS departure, routes.destination AS destination, prices.price AS price, reservations.status AS statusBoard 
      FROM ${table} JOIN users ON reservations.id_user=users.id JOIN prices ON prices.id=reservations.id_price JOIN user_details ON users.id=user_details.id_user 
      JOIN buses ON buses.id=prices.id_bus JOIN boards ON boards.id=reservations.id_board JOIN routes ON routes.id=buses.id_bus_route 
      WHERE ${search.key} LIKE '${search.value}%'
      ORDER BY ${sort.key} ${parseInt(sort.value) ? 'ASC' : 'DESC'} LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
  getAllBus: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'bus_name', value: '' }
    search = search || { key: 'bus_name', value: '' }
    const table = 'reservations'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT reservations.id, users.username AS username, user_details.fullname AS fullname, buses.bus_name AS busName, buses.class_bus AS classBus, 
      reservations.seat AS seat, routes.departure AS departure, routes.destination AS destination, prices.price AS price, reservations.status AS statusBoard 
      FROM ${table} JOIN users ON reservations.id_user=users.id JOIN prices ON prices.id=reservations.id_price JOIN user_details ON users.id=user_details.id_user 
      JOIN buses ON buses.id=prices.id_bus JOIN boards ON boards.id=reservations.id_board JOIN routes ON routes.id=buses.id_bus_route`
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
  getReservationById: function (id) {
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
  getTotalReservation: function (conditions = {}, table) {
    let { search } = conditions
    search = search || { key: 'bus_name', value: '' }
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
  getReservationSeat: function (id) {
    const table = 'reservations'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT seat FROM ${table} WHERE id_board=${id}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getIdPrice: function (id) {
    const table = 'boards'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT id_price FROM ${table} WHERE id=${id}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createReservation: function (idUser, idPrice, id, seat, status) {
    const table = 'reservations'
    const sql = `INSERT INTO ${table} (id_user, id_price, id_board, seat, status) VALUES (
      ${idUser}, ${idPrice}, ${id}, ${seat}, '${status}')`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log('sql', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results.insertId)
        }
      })
    })
  },
  updateSeatBoard: function (idBoard) {
    const table = 'boards'
    const sql = `UPDATE ${table} SET seat= seat - 1 WHERE id=${idBoard}`
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
  updateReservation: function (id, idUser, idPrice, idBoard, seat, status) {
    const table = 'reservations'
    const sql = `UPDATE ${table} SET id_user=${idUser}, id_price=${idPrice}, id_board=${idBoard}, seat='${seat}', status='${status}' WHERE id=${id}`
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
  deleteReservation: function (id) {
    const table = 'reservations'
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
