const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(`
  CREATE TABLE IF NOT EXISTS transactions(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_route INT,
    id_bus INT,
    id_schedule INT,
    price INT(6) NOT NULL,
    FOREIGN KEY (id_route) REFERENCES routes(id),
    FOREIGN KEY (id_bus) REFERENCES buses(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
