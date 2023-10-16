import createElement from "../../assets/lib/create-element.js";

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.value = value;
    this.#render();
    this.sliderSteps = this.elem.querySelector(".slider__steps");
    this.sliderThumb = this.elem.querySelector(".slider__thumb");
    this.sliderProgress = this.elem.querySelector(".slider__progress");
    this.sliderValue = this.elem.querySelector(".slider__value");
    this.#renderSliderSteps();
    this.sliderStepsElements = this.sliderSteps.querySelectorAll("span");
    this.#sliderClick();
    this.#sliderDragEvents();
  }

  #render() {
    this.elem = createElement(`
    <div class="slider">
      <div class="slider__thumb" style="left: 75%">
        <span class="slider__value">${this.value}</span>
      </div>
      <div class="slider__progress" style="width: 75%"></div>
      <div class="slider__steps"></div>
    </div>
    `);
  }

  #renderSliderSteps() {
    for (let i = 0; i < this.steps; i++) {
      const sliderSpan = document.createElement("span");

      if (i === this.value) {
        sliderSpan.classList.add("slider__step-active");
      }

      this.sliderSteps.append(sliderSpan);
    }
  }

  #sliderClick() {
    this.elem.addEventListener("click", (event) => {
      const sliderSegments = this.steps - 1;
      const sliderLeft = event.clientX - this.elem.getBoundingClientRect().left;
      const sliderLeftRelative = sliderLeft / this.elem.offsetWidth;
      const sliderApproximateValue = sliderLeftRelative * sliderSegments;
      const sliderValueRound = Math.abs(Math.round(sliderApproximateValue));
      const sliderValuePercent = (sliderValueRound / sliderSegments) * 100;
      this.sliderThumb.style.left = `${sliderValuePercent}%`;
      this.sliderProgress.style.width = `${sliderValuePercent}%`;
      this.sliderValue.textContent = sliderValueRound;

      this.sliderStepsElements.forEach((item, index) => {
        item.classList.remove("slider__step-active");

        if (index === sliderValueRound) {
          item.classList.add("slider__step-active");
        }
      });

      this.elem.dispatchEvent(
        new CustomEvent("slider-change", {
          detail: sliderValueRound,
          bubbles: true,
        })
      );
    });
  }

  sliderPointermove = (event) => {
    const sliderLeft = event.clientX - this.elem.getBoundingClientRect().left;
    let sliderLeftRelative = sliderLeft / this.elem.offsetWidth;

    if (sliderLeftRelative < 0) {
      sliderLeftRelative = 0;
    } else if (sliderLeftRelative > 1) {
      sliderLeftRelative = 1;
    }

    const sliderLeftPercents = sliderLeftRelative * 100;
    this.sliderThumb.style.left = `${sliderLeftPercents}%`;
    this.sliderProgress.style.width = `${sliderLeftPercents}%`;
    const sliderSegments = this.steps - 1;
    const sliderApproximateValue = sliderLeftRelative * sliderSegments;
    const sliderValueRound = Math.abs(Math.round(sliderApproximateValue));
    this.value = sliderValueRound;
    this.sliderValue.textContent = sliderValueRound;

    this.sliderStepsElements.forEach((item, index) => {
      item.classList.remove("slider__step-active");

      if (index === this.value) {
        item.classList.add("slider__step-active");
      }
    });
  };

  #sliderPointerdown() {
    this.elem.classList.add("slider_dragging");
    document.addEventListener("pointermove", this.sliderPointermove);
    document.addEventListener("pointerup", () => this.#sliderPointerup());
  }

  #sliderPointerup() {
    this.elem.classList.remove("slider_dragging");
    document.removeEventListener("pointermove", this.sliderPointermove);
    document.removeEventListener("pointerup", () => this.#sliderPointerup());

    this.elem.dispatchEvent(
      new CustomEvent("slider-change", {
        detail: this.value,
        bubbles: true,
      })
    );
  }

  #sliderDragEvents() {
    this.sliderThumb.ondragstart = () => false;
    this.sliderThumb.addEventListener("pointerdown", () =>
      this.#sliderPointerdown()
    );
  }
}
