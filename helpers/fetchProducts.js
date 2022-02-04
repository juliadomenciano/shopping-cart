const fetchProducts = async (produto, removeLoading) => {
  try {
    const url = `https://api.mercadolibre.com/sites/MLB/search?q=${produto}`;
    const getUrl = await fetch(url);
    const data = await getUrl.json();
    removeLoading();
    return data;
  } catch (error) {
    return error;
  } 
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
