const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');

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

function cartItemClickListener(event) {
  event.target.remove();
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

const appendResult = async (result) => {
  const res = await result;
  res.forEach((item) => {
   const results = createProductItemElement(
    { sku: item.id, name: item.title, image: item.thumbnail },
    );
    items.appendChild(results);
  });
};

const addToCart = async (info) => {
  const cartItem = createCartItemElement(
    { sku: info.id, name: info.title, salePrice: info.price },
    );
    
    cart.appendChild(cartItem);
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

cart.addEventListener('click', cartItemClickListener);
window.onload = async () => {
  await appendResult(getResultArr());
  selectFromList();
};
