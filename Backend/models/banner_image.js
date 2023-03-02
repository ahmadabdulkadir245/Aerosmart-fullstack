const db = require('../util/database');

module.exports = class Banner {
  constructor(id,  category,image, userId) {
    this.id = id;
    this.category = category;
    this.image = image;
    this.userId = userId;
  }

  save() {
    return db.execute(
      'INSERT INTO banners ( category, image, userId) VALUES (?, ?, ?)',
      [  this.category, this.image, this.userId]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM banners');
  }

//   static findById(id) {
//     return db.execute('SELECT * FROM banners WHERE banners.id = ?', [id]);
//   }
};
