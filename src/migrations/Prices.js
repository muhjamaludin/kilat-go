const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(`
  CREATE TABLE IF NOT EXISTS prices(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_bus INT,
    price INT(6) NOT NULL,
    CONSTRAINT idBus FOREIGN KEY (id_bus) REFERENCES buses(id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
