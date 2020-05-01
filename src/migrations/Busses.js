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
    id_agents INT NOT NULL,
    id_bus_route INT,
    id_bus_schedule INT,
    picture TEXT,
    bus_name VARCHAR(30) NOT NULL,
    class_bus VARCHAR(15) NOT NULL,
    CONSTRAINT idAgent FOREIGN KEY (id_agents) REFERENCES agents(id) ON DELETE CASCADE,
    CONSTRAINT routeBus FOREIGN KEY (id_bus_route) REFERENCES routes(id) ON DELETE CASCADE,
    CONSTRAINT scheduleBus FOREIGN KEY (id_bus_schedule) REFERENCES schedules(id) ON DELETE CASCADE,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
