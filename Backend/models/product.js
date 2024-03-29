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


  static async findByCart(cartId) {
    const query = `
      SELECT productId
      FROM cartItems
      JOIN products ON cartItems.productId = products.id
      WHERE cartItems.cartId = ?;
    `;
    const [rows] = await db.execute(query, [cartId]);
    return rows;
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

  static totalSearchProduct(searchWord) {
    return db.execute(
      `SELECT * FROM products WHERE products.category REGEXP '${searchWord}'
      `
    );
  }

  static findCategory(word) {
    return db.execute('SELECT category FROM products WHERE products.title = ?', [word]);
  }

  static search(searchWord, perPage, offset) {
    return db.execute(
      `SELECT * FROM products WHERE products.category REGEXP '${searchWord}' OR products.title REGEXP '${searchWord}' 
      LIMIT ${perPage} OFFSET ${offset}
      `
    );
  }

  static searchSuggession(searchWord) {
    return db.execute(
      `SELECT * FROM products WHERE  products.category REGEXP '${searchWord}' OR products.title REGEXP '${searchWord}' LIMIT ${10} OFFSET ${0}
      `
    );
  }
};
