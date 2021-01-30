
class ProductList {
    _goods;
    _allGoods;

    constructor(container = '.products') {
        this.container = container;
        this._goods = [];
        this._allGoods = [];
        this._getGoods();
        this._renderGoods();
    }

    _getGoods() {
        this._goods = [
            {id: 1, title: 'Notebook', price: 20000, img: 'notebook.jpg'},
            {id: 2, title: 'Mouse', price: 1500, img: 'mouse.jpg'},
            {id: 3, title: 'Keyboard', price: 5000},
            {id: 4, title: 'Gamepad', price: 4500, img: 'gamepad.png'},
        ];
    }

    _renderGoods() {
        const htmlBlock = document.querySelector(this.container);

        let productsHtml = '';
        this._goods.forEach(product => {
            const prodObject = new Product(product);
            this._allGoods.push(prodObject);
            productsHtml += prodObject.renderProduct();
        })
        htmlBlock.insertAdjacentHTML('beforeend', productsHtml);
    }

    _countTotalPrice() {
        return this._allGoods.reduce(((sum, product) => sum += product.productPrice * product.productQuantity), 0);
    }

    _countCartItems() {
        return this._allGoods.reduce(((sum, prod) => sum += prod.productQuantity), 0);
    }

    _addToCart(productID, quantity) {
        const prodIndex = this._allGoods.findIndex(product => product.productID === productID);
        console.log(prodIndex);
        if (prodIndex !== -1) {
            this._allGoods[prodIndex].productQuantity += quantity;
        }
        if (prodIndex === -1) {
            this._goods.forEach(product => {
                if (product.id === productID) {
                    const prodObject = new Product(product, quantity);
                    this._allGoods.push(prodObject);
                }
            })

        }
    }

    _removeFromCart(productID) {
        const prodIndex = this._allGoods.findIndex(product => product.productID === productID);
        if (prodIndex !== -1) {
            this._allGoods.splice(prodIndex, 1);
        }
    }
}

class Product {
    galleryPath = 'img/';

    constructor(product, quantity = 1) {
        this.productID = product.id;
        this.productTitle = product.title;
        this.productPrice = product.price;
        this.prodPicture = product.img ?? 'empty.png';
        this.productQuantity = quantity;
    }

    renderProduct() {
        return `<div class="product-item">
                <img class="product_item_picture" src="${(this.galleryPath + this.prodPicture)}" width="70" height="70" alt="${this.prodPicture}">
                <h3 class="product_item_title">${this.productTitle}</h3>
              <p class="product_item_price" > ${'\u20BD'} ${Number(this.productPrice).toLocaleString('ru')}</p>
                <button class="by-btn">Добавить в корзину</button>
              </div>`;
    }
}

const productList = new ProductList();