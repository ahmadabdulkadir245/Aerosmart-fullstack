const db = require('../util/database');

const Cart = require('./cart');

module.exports = class Product {
  constructor(id, title, imageUrl, description, price, category, quantity, userId) {
    this.id = id;
    this.title = title;
    this.imageUrl = imageUrl;
    this.description = description;
    this.price = price;
    this.category = category
    this.quantity = quantity
    this.userId = userId;
  }

  save() {
    return db.execute(
      'INSERT INTO products (title, price, imageUrl, description,category, quantity, userId) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [this.title, this.price, this.imageUrl, this.description, this.category, this.quantity, this.userId]
    );
  }

  static deleteById(id) {
    return db.execute('DELETE FROM products WHERE products.id=?', [id])
  }

  static fetchAll() {
    return db.execute('SELECT * FROM products');
  }

  static findAndCountAll(limit, offset) {
    return db.execute(`SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`)
  }

  static findById(id) {
    return db.execute('SELECT * FROM products WHERE products.id = ?', [id]);
  }

  updateById(id) {
    return db.execute(
      'UPDATE products SET title=?, price=?, imageUrl=?, description=?, category=?, quantity=?, userId=? WHERE id = ?',
      [this.title, this.price, this.imageUrl, this.description, this.category, this.quantity, this.userId, id]
    );
  }
};
