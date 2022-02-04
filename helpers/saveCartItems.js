const saveCartItems = (item) => {
  localStorage.setItem('cartItems', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
/*   console.log(item);
  const getID = item.innerHTML.substr(5, 13);
  arr.push(getID); */