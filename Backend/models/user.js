const db = require('../util/database');

module.exports = class User {
    constructor(id, email, password,isAdmin) {
      this.id = id;
      this.email = email;
      this.password = password
      this.isAdmin = isAdmin
    }
    save() {
      return db.execute(
        'INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)',
        [ this.email, this.password, this.isAdmin]
      );
    }

    static userExist(email) {
      return db.execute(
        'SELECT * FROM users WHERE email = ?',
        [email]
      )
    }
  }