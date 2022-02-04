const saveCartItems = (item, arr) => {
/*   console.log(item); */
  const getID = item.innerHTML.substr(5, 13);
  arr.push(getID);
  localStorage.setItem('cartItems', JSON.stringify(arr));
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
