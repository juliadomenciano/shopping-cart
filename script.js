const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const totalPrice = document.querySelector('.total-price');
const emptyButton = document.querySelector('.empty-cart');
const loadText = document.createElement('h1');

let sumValues = 0;

function showLoading() {
  loadText.innerHTML = 'CARREGANDO...';
  loadText.className = 'loading';
  items.appendChild(loadText);
}

function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
}

function getSkuFromProductItem(item) {
  return item.querySelector('span.item__sku').innerText;
}
async function subPrice(event) {
  const id = event.target.innerHTML.substr(5, 13);
  const getPrice = await fetchItem(id);
  const { price } = await getPrice;
  sumValues -= price;
  totalPrice.innerHTML = parseFloat(sumValues);
}

async function cartItemClickListener(event) {
  subPrice(event);
  event.target.remove();
  const loadCart = JSON.parse(localStorage.getItem('cartItems'));
  const getID = event.target.innerHTML.substr(5, 13);
  const filterStorage = loadCart.filter((item) => item !== getID);
  localStorage.setItem('cartItems', JSON.stringify(filterStorage));
}

function createCartItemElement({ sku, name, salePrice }) {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
}

const getResultArr = async () => {
  const products = await fetchProducts('computer');
  return products.results;
};

function savingCart(cartItem) {
  saveCartItems(cartItem);
}

const appendResult = async (result) => {
  const res = await result;
  res.forEach((item) => {
   const results = createProductItemElement(
    { sku: item.id, name: item.title, image: item.thumbnail },
    );
    items.appendChild(results);
  });
  loadText.remove();
};

const addToCart = async (info) => {
  const cartItem = createCartItemElement(
    { sku: info.id, name: info.title, salePrice: info.price },
    );
    cart.appendChild(cartItem);
/*     console.log(cart); */
    savingCart(cartItem.innerHTML);
    sumValues += info.price;
    const total = parseFloat(sumValues);
    totalPrice.innerText = total;
};

const clearShoppingCart = () => {
  cart.innerHTML = '';
  
  localStorage.removeItem('cartItems');
  arr = [];
};

const selectFromList = async () => {
  const selectedItems = document.querySelectorAll('.item');
  selectedItems.forEach((item) => {
    const sku = getSkuFromProductItem(item);
    const button = item.querySelector('button');
    button.addEventListener('click', async () => {
      const info = await fetchItem(sku);
      addToCart(info);
    });
  });
};

emptyButton.addEventListener('click', clearShoppingCart);

window.onload = async () => {
  showLoading();
  await appendResult(getResultArr());
  selectFromList();
  getSavedCartItems();
};

/* [...cart.children].forEach((item) => console.log(item)) */