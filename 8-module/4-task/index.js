import createElement from "../../assets/lib/create-element.js";
import escapeHtml from "../../assets/lib/escape-html.js";

import Modal from "../../7-module/2-task/index.js";

export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
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

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${product.id}">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {
    this.modalWindow = new Modal();
    this.modalWindow.setTitle("Your order");
    this.modalBody = document.createElement("div");

    for (let cartItem of this.cartItems) {
      this.modalBody.append(
        this.renderProduct(cartItem.product, cartItem.count)
      );
    }

    this.modalBody.append(this.renderOrderForm());
    this.modalWindow.setBody(this.modalBody);
    this.modalWindow.open();

    this.modalBody.addEventListener("click", (event) => {
      const target = event.target;
      const button = target.closest(".cart-counter__button");

      if (!button) {
        return;
      }

      const productId = button.closest(".cart-product").dataset.productId;
      const amount = button.classList.contains("cart-counter__button_plus")
        ? 1
        : -1;

      this.updateProductCount(productId, amount);
    });

    const modalForm = this.modalBody.querySelector(".cart-form");
    modalForm.addEventListener("submit", (event) => {
      this.onSubmit(event);
    });
  }

  onProductUpdate(cartItem) {
    this.cartIcon.update(this);

    const isModalOpened = document.body.classList.contains("is-modal-open");
    if (!isModalOpened) {
      return false;
    }

    const product = cartItem.product;
    const productId = product.id;
    const productCount = this.modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-counter__count`
    );
    const productPrice = this.modalBody.querySelector(
      `[data-product-id="${productId}"] .cart-product__price`
    );
    const infoPrice = this.modalBody.querySelector(`.cart-buttons__info-price`);

    if (this.getTotalCount() === 0) {
      this.modalWindow.close();
      return;
    }

    if (cartItem.count === 0) {
      this.modalBody.querySelector(`[data-product-id="${productId}"]`).remove();
    }

    productCount.innerHTML = cartItem.count;
    productPrice.innerHTML = `€${(product.price * cartItem.count).toFixed(2)}`;
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`;
  }

  onSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.classList.add("is-loading");

    fetch("https://httpbin.org/post", {
      method: "POST",
      body: new FormData(form),
    }).then(() => {
      this.cartItems = [];
      this.cartIcon.update(this);
      this.modalWindow.setTitle("Success!");
      this.modalWindow.setBody(
        createElement(`
      <div class="modal__body-inner">
        <p>
          Order successful! Your order is being cooked :) <br>
          We’ll notify you about delivery time shortly.<br>
          <img alt="" src="/assets/images/delivery.gif">
        </p>
      </div>
      `)
      );
    });
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}
