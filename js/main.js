const products = [
    {id: 1, title: 'Notebook', price: 20000, img: 'notebook.jpg'},
    {id: 2, title: 'Mouse', price: 1500, img: 'mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 5000},
    {id: 4, title: 'Gamepad', price: 4500, img: 'gamepad.png'},
];
const renderSettings = {
    galleryPath: 'img/'
}
const renderProduct = (title, price, img = null) => {
    const prodPicture = img ?? 'empty.png';
    return `<div class="product-item">
                <img class="product_item_picture" src="${(renderSettings.galleryPath + prodPicture)}" width="70" height="70" alt="${prodPicture}">
                <h3 class="product_item_title">${title}</h3>
                <p class="product_item_price" > ${'\u20BD'} ${Number(price).toLocaleString('ru')}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
};

const renderProducts = (list) => {
    let productList = '';
    list.forEach(product => productList += renderProduct(product.title, product.price, product.img));
    document.querySelector('.products').insertAdjacentHTML("afterbegin", productList);
};

renderProducts(products);
