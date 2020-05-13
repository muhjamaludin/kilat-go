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
      const sql = `SELECT users.id, users.role_id, user_details.profile_picture, users.username, user_details.fullname, user_details.identity, user_details.gender, 
      user_details.phone, user_details.email, user_details.address, user_details.balance 
      FROM ${table} JOIN user_details ON users.id=user_details.id_user WHERE ${search.key} LIKE '${search.value}%'
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
  getUserById: function (id) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT users.id, users.role_id, user_details.profile_picture, users.username, user_details.fullname, user_details.identity, user_details.gender, 
      user_details.phone, user_details.email, user_details.address, user_details.balance 
      FROM ${table} JOIN user_details ON users.id=user_details.id_user WHERE users.id=${id}`
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
  getUserByRoleId: function (id) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT users.id, user_details.profile_picture, users.username, user_details.fullname, user_details.identity, user_details.gender, 
      user_details.phone, user_details.address, user_details.balance 
      FROM ${table} JOIN user_details ON users.id=user_details.id_user WHERE users.id=${id}`
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
  getTotalUsers: function (conditions = {}, table) {
    let { search } = conditions
    search = search || { key: 'username', value: '' }
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
  getIdByUsername: function (username) {
    const table = 'users'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE username='${username}'`
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
  createUserDetail: function (idUser, email, phone) {
    const table = 'user_details'
    const picture = 'jpg'
    const identity = 0
    const fullname = 'name'
    const gender = 'gender'
    const address = 'address'
    const balance = 0
    const sql = `INSERT INTO ${table} (id_user, profile_picture, identity, fullname, gender, email, phone, address, balance) VALUES 
    (${idUser}, '${picture}', ${identity}, '${fullname}', '${gender}', '${email}', ${phone}, '${address}', ${balance})`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log(sql)
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
  updatePassword: function (id, password) {
    const table = 'users'
    const sql = `UPDATE ${table} SET password='${password}' WHERE id=${id}`
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
  updateUserDetail: function (idUser, identity, fullname, gender, email, phone, address) {
    const table = 'user_details'
    const sql = `UPDATE ${table} SET identity=${identity}, fullname='${fullname}', gender='${gender}', email='${email}', phone=${phone}, address='${address}' WHERE id_user=${idUser}`
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
  updatePhotoUser: function (idUser, picture) {
    const table = 'user_details'
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `UPDATE ${table} SET profile_picture=${picture} WHERE id_user=${idUser}`
    return new Promise(function (resolve, reject) {
      db.query(sql, function (err, results, fields) {
        console.log(sql)
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
  deleteUser: function (id) {
    const table = 'users'
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
    const sql = `UPDATE ${table} SET balance=${balance} WHERE id_user=${id}`
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
  EditRole: function (id, RoleId) {
    const table = 'users'
    const sql = `UPDATE ${table} SET role_id=${RoleId} WHERE id=${id}`
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
