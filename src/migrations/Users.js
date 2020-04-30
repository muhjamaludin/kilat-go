const db = require('../utils/db')

const check = function (err, results, fields) {
  if (err) {
    throw err
  }
  console.log(results)
  console.log(fields)
}

db.query(`
  CREATE TABLE roles(
    id INT PRIMARY KEY AUTO_INCREMENT,
    code VARCHAR(30) NOT NULL,
    name VARCHAR(40) NOT NULL,
    description TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, function () {
  db.query(`
    INSERT INTO roles (code,name,description) VALUES
    ('superadmin', 'Super Administrator', 'This is a Superuser can access all feature on the application'),
    ('admin', 'Administrator', 'This is administrator with elevated access'),
    ('user', 'General User', 'This is general user')
  `, check)
})

db.query(`
  CREATE TABLE IF NOT EXISTS users(
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(60) NOT NULL,
    password VARCHAR(60) NOT NULL,
    verification_code VARCHAR(37),
    is_active TINYINT(2) DEFAULT 0,
    is_verified TINYINT(2) DEFAULT 0,
    role_id INT DEFAULT 3,
    FOREIGN KEY (role_id) REFERENCES roles(id),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)

db.query(`
  CREATE TABLE IF NOT EXISTS user_details(
    id INT PRIMARY KEY AUTO_INCREMENT,
    id_user INT NOT NULL,
    profile_picture TEXT,
    identity INT(16) NOT NULL,
    fullname VARCHAR(15) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    email VARCHAR(20) NOT NULL,
    phone VARCHAR(16) NOT NULL,
    address VARCHAR(60) NOT NULL,
    balance INT(8) NOT NULL,
    FOREIGN KEY (id_user) REFERENCES users(id), 
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME ON UPDATE CURRENT_TIMESTAMP
  )
`, check)
