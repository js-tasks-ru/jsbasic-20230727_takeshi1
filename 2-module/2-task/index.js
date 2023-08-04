function isEmpty(obj) {
  for (key in obj) {
    return false;
  }
  return true;
}

// Второе решение через Object(keys, values, entries)
// function isEmpty(obj) {
//   return Object.keys(obj).length === 0;
// }
