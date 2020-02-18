'use strict';

module.exports = new Cart();

function Cart(){

}

Cart.prototype.addToCart = function(product = null, cart) {
  if (!this.inCart(product.id, cart)) {
    let format = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    });
    product['formattedPrice'] = format.format(product.price)
    cart.items.push(product);
    this.calculateTotals(cart);
  } else {
    cart.items.forEach(item => {
      if (item.id === product.id) {
        item.qty+=product.qty
      }
    })
  }
}

Cart.prototype.removeFromCart = function(id = 0, cart) {
  for (let i = 0; i < cart.items.length; i++) {
    let item = cart.items[i];
    if (item.id === id) {
      cart.items.splice(i, 1);
      this.calculateTotals(cart);
    }
  }

}

Cart.prototype.updateCart = function(ids = [], qtys = [], cart) {
  let map = [];
  let updated = false;

  ids.forEach((id, idIndex) => {
    qtys.forEach((qty, qtyIndex) => {
      if (idIndex === qtyIndex) {
        map.push({
          id: parseInt(id, 10),
          qty: parseInt(qty, 10)
        });
      }
    });
  });

  map.forEach(obj => {
    cart.items.forEach(item => {
      if (item.id === obj.id) {
        if(obj.qty > 0 && obj.qty !== item.qty) {
            item.qty = obj.qty;
            updated = true;
        }
      }
    });
  });
  if (updated) {
    this.calculateTotals(cart);
  }
}

Cart.prototype.inCart = function(productID = 0, cart) {
  let found = false;
  cart.items.forEach(item => {
    if (item.id === productID) {
      found = true;
    }
  });
  return found;
}


Cart.prototype.calculateTotals = function(cart) {
  cart.totals = 0.00;
  cart.items.forEach(item => {
    let price = item.price;
    let qty = item.qty;
    let amount = price * qty;

    cart.totals += amount;
  });
  this.setFormattedTotals(cart);
}

Cart.prototype.emptyCart = function(request) {

  if (request.session) {
    request.session.cart.items = [];
    request.session.cart.totals = 0.00;
    request.session.cart.formattedTotals = '';
  }
}

Cart.prototype.setFormattedTotals = function(cart) {
  let format = new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  });
  let totals = cart.totals;
  cart.formattedTotals = format.format(totals);
}

Cart.prototype.count = function(cart) {
  return cart.items.length;
}