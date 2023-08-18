function initCarousel() {
  let arrowHide = (arrow) => (arrow.style.display = "none");
  let arrowShow = (arrow) => (arrow.style.display = "");
  let carouselItem = document.querySelector(".carousel");
  let carouselItemInner = document.querySelector(".carousel__inner");
  let carouselArrowRight = document.querySelector(".carousel__arrow_right");
  let carouselArrowLeft = document.querySelector(".carousel__arrow_left");
  let currentSlide = 0;
  let carouselWidth = carouselItemInner.offsetWidth;
  carouselArrowLeft.style.display = "none";

  function arrowStateChanger() {
    if (currentSlide === 0) {
      arrowHide(carouselArrowLeft);
    } else {
      arrowShow(carouselArrowLeft);
    }

    if (currentSlide === 3) {
      arrowHide(carouselArrowRight);
    } else {
      arrowShow(carouselArrowRight);
    }
  }

  carouselItem.addEventListener("click", (event) => {
    let target = event.target;

    if (carouselArrowRight.contains(target)) {
      currentSlide++;
      carouselItemInner.style.transform = `translateX(-${
        carouselWidth * currentSlide
      }px)`;
    } else if (carouselArrowLeft.contains(target)) {
      currentSlide--;
      carouselItemInner.style.transform = `translateX(-${
        carouselWidth * currentSlide
      }px)`;
    }

    arrowStateChanger();
  });
}
