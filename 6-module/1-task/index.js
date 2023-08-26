/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  elem;
  #rows;

  constructor(rows) {
    this.#rows = rows;
    this.elem = this.#render();
  }

  #render() {
    const table = document.createElement("table");
    table.innerHTML = this.#createTable();
    table.addEventListener("click", (event) => this.#rowDeleter(event));
    return table;
  }

  #createTable() {
    return `
    <thead>
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      ${this.#createTableInner()}
    </tbody>
  `;
  }

  #createTableInner() {
    return this.#rows
      .map((row) => {
        return `
      <tr>
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      </tr>
    `;
      })
      .join("");
  }

  #rowDeleter(event) {
    const target = event.target;
    if (target.closest("button")) {
      target.closest("tr").remove();
    }
  }
}
