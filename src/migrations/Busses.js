const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(`
  CREATE TABLE IF NOT EXISTS buses (
    id INT PRIMARY KEY AUTO_INCREMENT,
    picture TEXT,
    bus_name VARCHAR(20) NOT NULL,
    bus_seat INT(2) NOT NULL,
    class VARCHAR(9) NOT NULL,
    id_bus_route INT,
    CONSTRAINT routeBus FOREIGN KEY (id_bus_route) REFERENCES routes(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
