import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.#render();
    this.#addProduct();
    this.#slideChanger();
  }

  #render() {
    this.elem = createElement(
      `
    <div class="carousel">
      <div class="carousel__arrow carousel__arrow_right">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
        <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>
      <div class="carousel__inner">
        ${this.slides
          .map(
            (product) =>
              `
          <div class="carousel__slide" data-id="${product.id}">
          <img src="/assets/images/carousel/${
            product.image
          }" class="carousel__img" alt="slide">
          <div class="carousel__caption">
            <span class="carousel__price">€${product.price.toFixed(2)}</span>
            <div class="carousel__title">${product.name}</div>
            <button type="button" class="carousel__button">
              <img src="/assets/images/icons/plus-icon.svg" alt="icon">
            </button>
          </div>
        </div>
        `
          )
          .join("")}
      </div>
    </div>
    `
    );
  }

  #addProduct() {
    const buttons = this.elem.querySelectorAll(".carousel__button");
    for (let button of buttons) {
      button.addEventListener("click", (event) => {
        const id = event.target.closest(".carousel__slide").dataset.id;
        this.elem.dispatchEvent(
          new CustomEvent("product-add", {
            detail: id,
            bubbles: true,
          })
        );
      });
    }
  }

  #slideChanger() {
    const arrowHide = (arrow) => (arrow.style.display = "none");
    const arrowShow = (arrow) => (arrow.style.display = "");
    const carouselItemInner = this.elem.querySelector(".carousel__inner");
    const carouselSlides = this.elem.querySelectorAll(".carousel__slide");
    const carouselArrowRight = this.elem.querySelector(
      ".carousel__arrow_right"
    );
    const carouselArrowLeft = this.elem.querySelector(".carousel__arrow_left");
    const slidesNumber = this.slides.length;
    let currentSlide = 0;
    let lastSlide = slidesNumber - 1;
    carouselArrowLeft.style.display = "none";

    function arrowStateChanger() {
      if (currentSlide === 0) {
        arrowHide(carouselArrowLeft);
      } else {
        arrowShow(carouselArrowLeft);
      }

      if (currentSlide === lastSlide) {
        arrowHide(carouselArrowRight);
      } else {
        arrowShow(carouselArrowRight);
      }
    }

    this.elem.addEventListener("click", (event) => {
      const target = event.target;
      const slidewidth = carouselSlides[0].offsetWidth;
      if (carouselArrowRight.contains(target)) {
        currentSlide++;
        carouselItemInner.style.transform = `translateX(-${
          slidewidth * currentSlide
        }px)`;
      } else if (carouselArrowLeft.contains(target)) {
        currentSlide--;
        carouselItemInner.style.transform = `translateX(-${
          slidewidth * currentSlide
        }px)`;
      }
      arrowStateChanger();
    });
  }
}
