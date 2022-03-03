//_______________Переделать getRequest на промисы_____________________________________
const apiLink = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
let getRequest = (url) => {
    return new Promise((resolve, reject) => {
        if (url) {
            let xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200) {
                        resolve(xhr.statusText);
                    } else {
                        resolve(JSON.parse(xhr.responseText));
                    }
                }
            };
            xhr.send();
        } else reject('something went wrong');
    });
}

getRequest(apiLink).then(data => {
    let result = [...data];
}).catch((error) => console.log(error));

//____________________________конец первого задания

class ProductList {
    _products;
    _cart;

    constructor(container = '.products', cartPopTag = '.cart_pop_up') {
        this.container = container;
        this.cartPopTag = cartPopTag;
        this._products = [];
        this._cart = [];
        this._getProducts().then(data => {

            this._products = [...data];
            this._renderProducts();
            this._renderCartPopUp();
        });
        document.querySelector(container).addEventListener('click', event => {
            const clickTarget=event.target;
            if(clickTarget.className==='by-btn'){
                this._addToCart(clickTarget.dataset.productid);
                this._renderCartPopUp();
            }
        });
        document.querySelector(cartPopTag).addEventListener('click',event=>{
           if(event.target.className==='remove_from_cart') {
               this._removeFromCart(event.target.dataset.productid);
               this._renderCartPopUp();
           }
        });
        // this._renderProducts();
    }

    _getProducts() {
        // this._products = [
        //     {id: 1, title: 'Notebook', price: 20000, img: 'notebook.jpg'},
        //     {id: 2, title: 'Mouse', price: 1500, img: 'mouse.jpg'},
        //     {id: 3, title: 'Keyboard', price: 5000},
        //     {id: 4, title: 'Gamepad', price: 4500, img: 'gamepad.png'},
        // ];
        return fetch(apiLink).then(response => response.json()).catch(error => console.log(error));
    }

    _renderProducts() {
        const htmlBlock = document.querySelector(this.container);

        let productsHtml = '';
        this._products.forEach(product => {
            const prodObject = new Product(product);
            // this._cart.push(prodObject);
            productsHtml += prodObject.renderProduct();
        })
        htmlBlock.insertAdjacentHTML('beforeend', productsHtml);
    }

    _renderCartPopUp() {
        const cartPop = document.querySelector(this.cartPopTag);
        cartPop.innerHTML='';
        let cartPopHtml = '';
        if(this._cart.length===0){
            cartPopHtml='<p class="empty_cart_message">Корзина пуста...</p><img class="empty_cart_image" src="img/emptycart.png" width=200 height=200 alt="emptycart"/>';
            cartPop.insertAdjacentHTML('beforeend',cartPopHtml);
            return;
        }
        this._cart.forEach(x => {
            cartPopHtml += `<div class="cart_pop_up__line">
                <a href="#" class="img-link"><img src=${x.prodPicture} width="70" height="70" alt=""></a>
                <p class="product_title">${x.productTitle}</p>
                <p class="product_subtotal"> ${x.productQuantity} шт. на 
                ${Number(x.productPrice * x.productQuantity).toLocaleString('ru')} ${'\u20BD'} </p>
                <button class="remove_from_cart" data-productid=${x.productID}>X</button>
            </div>`;
        });
        const popUpSummary = `<div class="cart_pop_up_summary">Итого на ${Number(this._countTotalPrice()).toLocaleString('ru')} ${'\u20BD'}</div>`;
        cartPopHtml += popUpSummary;
        cartPop.insertAdjacentHTML('beforeend', cartPopHtml);
    }

    _countTotalPrice() {
        return this._cart.reduce(((sum, product) => sum += product.productPrice * product.productQuantity), 0);
    }

    _countCartItems() {
        return this._cart.reduce(((sum, prod) => sum += prod.productQuantity), 0);
    }

    _addToCart(productID, quantity=1) {

        const prodIndex = this._cart.findIndex(product => product.productID === +productID);
        if (prodIndex !== -1) {
            this._cart[prodIndex].productQuantity += quantity;
        }
        if (prodIndex === -1) {
            this._products.forEach(pr => {
                if (pr.id_product === +productID) {
                    const prodObject = new Product(pr, quantity);
                    this._cart.push(prodObject);
                }
            })

        }
    }

    _removeFromCart(productID) {
        const prodIndex = this._cart.findIndex(product => product.productID === +productID);
        if (prodIndex !== -1) {
            this._cart.splice(prodIndex, 1);
            this._renderCartPopUp();
        }
    }
}

class Product {
    galleryPath = 'img/';

    constructor(product, quantity = 1) {
        this.productID = product.id_product;
        this.productTitle = product.product_name;
        this.productPrice = product.price;
        this.prodPicture = product.img ?? (this.galleryPath + 'empty.png');
        this.productQuantity = quantity;
    }

    renderProduct() {
        return `<div class="product-item">
                <img class="product_item_picture" src="${(this.prodPicture)}" width="70" height="70" alt="${this.prodPicture}">
                <h3 class="product_item_title">${this.productTitle}</h3>
              <p class="product_item_price" > ${'\u20BD'} ${Number(this.productPrice).toLocaleString('ru')}</p>
                <button class="by-btn" data-productID=${this.productID}>Добавить в корзину</button>
              </div>`;
    }
}

const productList = new ProductList();