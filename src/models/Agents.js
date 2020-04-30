const db = require('../utils/db')

module.exports = {
  getAllAgents: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'name', value: '' }
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE name LIKE '${search.value}%'
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
  getAgentById: function (id) {
    const table = 'agents'
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
  getTotalAgents: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'name', value: '' }
    const table = 'agents'
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
  createAgents: function (idUser, name) {
    const table = 'agents'
    const sql = `INSERT INTO ${table} (id_user, name) VALUES ('${idUser}', '${name}')`
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
  updateAgentById: function (id, name) {
    const table = 'agents'
    const sql = `UPDATE ${table} SET name='${name}' WHERE id=${id}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results.affectedRows)
        }
      })
    })
  },
  // updateAgents: function (id, idUser, name) {
  //   const table = 'agents'
  //   const sql = `UPDATE ${table} SET id_user='${idUser}', name='${name}' WHERE id=${id}`
  //   return new Promise(function (resolve, reject) {
  //     db.query(sql, function (err, results, fields) {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         if (results.affectedRows) {
  //           resolve(true)
  //         } else {
  //           resolve(false)
  //         }
  //       }
  //     })
  //   })
  // },
  deleteAgents: function (id) {
    const table = 'agents'
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
