const db = require('../utils/db')

module.exports = {
  getAllAgents: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'name', value: '' }
    search = search || { key: 'name', value: '' }
    const table = 'agents'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT agents.id AS id, users.username AS username, agents.name AS name FROM ${table} JOIN users ON agents.id_user=users.id 
      WHERE ${search.key} LIKE '${search.value}%' ORDER BY ${sort.key} ${parseInt(sort.value) ? 'ASC' : 'DESC'} LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
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
      const sql = `SELECT agents.id AS id, users.username AS username, agents.name AS name FROM ${table} JOIN users ON agents.id_user=users.id WHERE agents.id=${id}`
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
  getUserFromUsers: function () {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM users`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getTotalAgents: function (conditions = {}, table) {
    let { search } = conditions
    table = table || 'agents'
    search = search || { key: 'name', value: '' }
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
  getIdUserByUsername: function (username) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT id FROM ${table} WHERE username='${username}'`
      db.query(sql, function (err, results, fields) {
        console.log('sql username', sql)
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createAgents: function (idUser, name) {
    const table = 'agents'
    const sql = `INSERT INTO ${table} (id_user, name) VALUES (${idUser}, '${name}')`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log('cek sql', sql)
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
