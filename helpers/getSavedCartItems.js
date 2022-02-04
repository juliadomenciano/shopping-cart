const getSavedCartItems = () => {
  const loadCart = JSON.parse(localStorage.getItem('cartItems'));
  return loadCart;
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
