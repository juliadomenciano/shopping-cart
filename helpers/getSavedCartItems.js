const getSavedCartItems = () => {
  const loadCart = JSON.parse(localStorage.getItem('cartItems'));
  loadCart.forEach(async (item) => {
    const info = await fetchItem(item);
    addToCart(info);
  });
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
