let showSalary = (users, age) =>
  users
    .filter((el) => el.age <= age)
    .map((user) => `${user.name}, ${user.balance}`)
    .join("\n");
