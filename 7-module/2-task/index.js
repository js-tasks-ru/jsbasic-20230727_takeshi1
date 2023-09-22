import createElement from "../../assets/lib/create-element.js";

export default class Modal {
  constructor() {
    this.#render();
    this.open();
  }

  #render() {
    this.elem = createElement(`
    <div class="modal">
      <div class="modal__overlay"></div>
      <div class="modal__inner">
        <div class="modal__header">
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>
          <h3 class="modal__title"></h3>
        </div>
        <div class="modal__body"></div>
      </div>
    </div>
    `);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add("is-modal-open");
    const closeButton = document.querySelector(".modal__close");
    closeButton.addEventListener("click", () => this.close());
    document.addEventListener("keydown", this.closeKey);
  }

  close() {
    this.elem.remove();
    document.body.classList.remove("is-modal-open");
    document.removeEventListener("keydown", this.closeKey);
  }

  closeKey = (event) => {
    if (event.code === "Escape") {
      this.close();
    }
  };

  setTitle(text) {
    const modalTitle = document.querySelector(".modal__title");
    modalTitle.textContent = text;
  }

  setBody(body) {
    const modalBody = document.querySelector(".modal__body");
    modalBody.innerHTML = "";
    modalBody.append(body);
  }
}
