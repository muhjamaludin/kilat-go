const db = require('../utils/db')

module.exports = {
  getAllAgent: function () {
    const table = 'agents'
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
  createAgents: function (idUser, name) {
    const table = 'agents'
    // roleId = roleId || 3
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
  updateAgents: function (id, idUser, name) {
    const table = 'agents'
    const sql = `UPDATE ${table} SET id_user='${idUser}', name='${name}' WHERE id=${id}`
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
