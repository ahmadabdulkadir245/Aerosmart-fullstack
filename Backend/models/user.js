const db = require('../util/database');

module.exports = class User {
    constructor(id, email, first_name, last_name, is_admin) {
      this.id = id;
      this.email = email;
      this.first_name = first_name;
      this.last_name = last_name;
      this.is_admin = is_admin
    }
  }