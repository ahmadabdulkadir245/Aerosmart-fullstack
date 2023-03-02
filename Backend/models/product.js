const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price, category,userId) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.category = category
    this.userId = userId;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description, userId) VALUES (?, ?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description, this.userId]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }
};
