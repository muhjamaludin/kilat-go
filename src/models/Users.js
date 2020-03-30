const db = require('../utils/db')

module.exports = {
  getAllUsers: function (conditions = {}) {
    let { page, perPage, sort, search } = conditions
    page = page || 1
    perPage = perPage || 5
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'username', value: '' }
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE username LIKE '${search.value}%'
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
  getUserById: function (id) {
    const table = 'users'
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
  getTotalUsers: function (conditions = {}) {
    let { search } = conditions
    search = search || { key: 'username', value: '' }
    const table = 'users'
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
  getOneUsers: function (id) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE id=${id}`
      console.log(sql)
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getAllUserDetail: function () {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} `
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  getOneUserDetail: function (id) {
    const table = 'user_details'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE id=${id}`
      db.query(sql, function (err, results, fields) {
        if (err) {
          reject(err)
        } else {
          resolve(results)
        }
      })
    })
  },
  createUser: function (username, password, roleId) {
    const table = 'users'
    roleId = roleId || 3
    const sql = `INSERT INTO ${table} (username, password, role_id) VALUES ('${username}', '${password}', ${roleId})`
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
  createUserDetail: function (picture, identity, firstname, lastname, gender, email, phone, address, balance) {
    const table = 'user_details'
    // picture = picture || null
    // identity = identity || 0
    // firstname = firstname || 'your firstname'
    // lastname = lastname || 'your lastname'
    // gender = gender || 'men'
    // address = address || 'your address'
    // balance = balance || 0
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `INSERT INTO ${table} (profile_picture, identity, firstname, lastname, gender, email, phone, address, balance) VALUES 
    (${picture}, ${identity}, '${firstname}', '${lastname}', '${gender}', '${email}', ${phone}, '${address}', ${balance})`
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
  updateUser: function (id, username, password) {
    const table = 'users'
    const sql = `UPDATE ${table} SET username='${username}', password='${password}' WHERE id=${id}`
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
  updateUserDetail: function (id, picture, identity, firstname, lastname, gender, email, phone, address, balance) {
    const table = 'user_details'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `UPDATE ${table} SET profile_picture=${picture}, identity=${identity}, firstname='${firstname}', lastname='${lastname}', 
    gender='${gender}', email='${email}', phone=${phone}, address='${address}', balance=${balance} WHERE id=${id}`
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
  deleteUser: function (id) {
    const table = 'users'
    const sql = `UPDATE ${table} SET id=0 WHERE id=${id}`
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
  deleteUserDetail: function (id) {
    const table = 'user_details'
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
  },
  topup: function (id, balance) {
    const table = 'user_details'
    const sql = `UPDATE ${table} SET balance=${balance} WHERE id=${id}`
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
