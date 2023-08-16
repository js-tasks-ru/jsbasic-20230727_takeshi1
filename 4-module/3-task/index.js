function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    let status = row.cells[3];
    let gender = row.cells[2];
    let age = row.cells[1];

    if (status.dataset.available === "true") {
      row.classList.add("available");
    } else if (status.dataset.available === "false") {
      row.classList.add("unavailable");
    } else {
      row.hidden = true;
    }

    if (gender.textContent === "m") {
      row.classList.add("male");
    } else {
      row.classList.add("female");
    }

    if (age.textContent < 18) {
      row.style.textDecoration = "line-through";
    }
  }
}
