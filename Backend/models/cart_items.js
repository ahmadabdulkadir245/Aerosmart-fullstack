const db = require('../util/database');

module.exports = class Cart {
  constructor(cartId, productId,  customerId) {
    this.cartId = cartId;
    this.productId = productId;
    this.customerId = customerId;
  }

  save() {
    return db.execute(
      'INSERT INTO cart (productId, customerId) VALUES (?, ?, ?)',
      [this.productId, this.customerId]
    );
  }

  static deleteById(id) {}

  static fetchAll() {
    return db.execute('SELECT * FROM cart');
  }

  static findById(id) {
    return db.execute('SELECT * FROM cart WHERE cart.id = ?', [id]);
  }
};
