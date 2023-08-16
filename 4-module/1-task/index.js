function makeFriendsList(friends) {
  let list = document.createElement("ul");
  list.insertAdjacentHTML(
    "afterbegin",
    friends
      .map((user) => "<li>" + `${user.firstName} ${user.lastName}` + "</li>")
      .join("")
  );
  return list;
}
