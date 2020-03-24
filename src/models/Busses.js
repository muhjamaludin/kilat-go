const db = require('../utils/db')

module.exports = {
  getAllBus: function (conditions = {}) {
    let { sort, search } = conditions
    sort = sort || { key: 'id', value: '' }
    search = search || { key: 'bus_name', value: '' }
    console.log(search)
    const table = 'buses'
    return new Promise(function (resolve, reject) {
      const sql = `SELECT * FROM ${table} WHERE ${search.key} LIKE '${search.value}%'
      ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'}`
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
  // getAllUsers: function (conditions = {}) {
  //   let { page, perPage, sort, search } = conditions
  //   page = page || 1
  //   perPage = perPage || 5
  //   sort = sort || { key: 'id', value: 1 }
  //   search = search || { key: 'username', value: '' }
  //   const table = 'users'
  //   return new Promise(function (resolve, reject) {
  //     const sql = `
  //     SELECT * FROM ${table}
  //     WHERE ${search.key} LIKE '${search.value}%'
  //     ORDER BY ${sort.key} ${sort.value ? 'ASC' : 'DESC'}
  //     LIMIT ${perPage} OFFSET ${(page - 1) * perPage}`
  //     console.log(sql)
  //     db.query(sql, function (err, results, fields) {
  //       if (err) {
  //         reject(err)
  //       } else {
  //         resolve(results)
  //       }
  //     })
  //   })
  // },
  createBus: function (picture, busName, busSeat, classBus, idRoute) {
    const table = 'buses'
    // roleId = roleId || 3
    // idRoute = idRoute || 1
    picture = (typeof picture === 'string' ? `'${picture}'` : picture)
    const sql = `INSERT INTO ${table} (picture, bus_name, bus_seat, class, id_bus_route) VALUES (${picture}, '${busName}', '${busSeat}', '${classBus}', ${idRoute})`
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
    const sql = `UPDATE ${table} SET picture=${picture}, bus_name='${busName}', bus_seat='${busSeat}', class='${classBus}', id_bus_route=${idRoute} WHERE id=${id}`
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
