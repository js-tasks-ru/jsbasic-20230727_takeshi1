export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product === undefined || product === null) {
      return false;
    }

    const cartItem = this.cartItems.find(
      (item) => item.product.id === product.id
    );

    if (!cartItem) {
      this.cartItems.push({
        product,
        count: 1,
      });
    } else {
      cartItem.count++;
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    const cartItem = this.cartItems.find(
      (item) => item.product.id === productId
    );

    cartItem.count += amount;

    if (cartItem.count === 0) {
      this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    if (this.cartItems.length === 0) {
      return true;
    } else {
      return false;
    }
  }

  getTotalCount() {
    return this.cartItems.reduce(
      (total, cartItem) => (total += cartItem.count),
      0
    );
  }

  getTotalPrice() {
    return this.cartItems.reduce(
      (total, cartItem) => (total += cartItem.product.price * cartItem.count),
      0
    );
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}
