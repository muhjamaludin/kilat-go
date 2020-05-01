const db = require('../utils/db')

module.exports = {
  getAllRoute: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'departure', value: '' }
    const table = 'routes'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE departure LIKE '${search.value}%'
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
  getRouteById: function (id) {
    const table = 'routes'
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
  getTotalRoute: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'routes', value: '' }
    const table = 'routes'
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
  createRoute: function (departure, destination) {
    const table = 'routes'
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
