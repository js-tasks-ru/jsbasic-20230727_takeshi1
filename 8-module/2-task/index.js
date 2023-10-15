import createElement from "../../assets/lib/create-element.js";
import ProductCard from "../../6-module/2-task/index.js";

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
    this.renderCards();
  }

  render() {
    this.elem = createElement(`
    <div class="products-grid">
      <div class="products-grid__inner">
      </div>
    </div>`);
  }

  renderCards() {
    const productsInner = this.elem.querySelector(".products-grid__inner");
    productsInner.innerHTML = "";

    for (let product of this.products) {
      if (this.filters.noNuts && product.nuts) {
        continue;
      }
      if (this.filters.vegeterianOnly && !product.vegeterian) {
        continue;
      }
      if (
        this.filters.maxSpiciness !== undefined &&
        product.spiciness > this.filters.maxSpiciness
      ) {
        continue;
      }
      if (this.filters.category && this.filters.category != product.category) {
        continue;
      }

      const productCard = new ProductCard(product);
      productsInner.append(productCard.elem);
    }
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters);
    this.renderCards();
  }
}
