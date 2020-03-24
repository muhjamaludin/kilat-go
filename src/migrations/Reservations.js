const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(`
  CREATE TABLE IF NOT EXISTS reservations(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT,
    id_bus INT,
    id_route INT,
    id_schedule INT,
    id_price INT,
    seat INT(1) NOT NULL,
    date DATETIME,
    FOREIGN KEY (id_user) REFERENCES user_details (id),
    FOREIGN KEY (id_bus) REFERENCES buses (id),
    FOREIGN KEY (id_route) REFERENCES routes (id),
    FOREIGN KEY (id_schedule) REFERENCES schedules (id),
    FOREIGN KEY (id_price) REFERENCES transactions (id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
