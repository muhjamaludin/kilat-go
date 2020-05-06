const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(`
  CREATE TABLE IF NOT EXISTS boards(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_price INT,
    schedule DATE,
    seat VARCHAR(4),
    FOREIGN KEY (id_price) REFERENCES prices(id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
  CREATE TABLE IF NOT EXISTS reservations(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_price INT,
    id_board INT,
    seat VARCHAR(4),
    status VARCHAR(10),
    FOREIGN KEY (id_user) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (id_price) REFERENCES prices(id) ON DELETE CASCADE,
    FOREIGN KEY (id_board) REFERENCES boards(id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
