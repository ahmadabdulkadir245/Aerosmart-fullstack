const db = require('../util/database');

module.exports = class Banner {
  constructor(id,  category,imageUrl, userId) {
    this.id = id;
    this.category = category;
    this.imageUrl = imageUrl;
    this.userId = userId;
  }

  save() {
    return db.execute(
      'INSERT INTO banners ( category, imageUrl, userId) VALUES (?, ?, ?)',
      [  this.category, this.imageUrl, this.userId]
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
