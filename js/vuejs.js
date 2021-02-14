const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    data: {
        searchLine: '',
        cartUrl: '/getBasket.json',
        catalogUrl: '/catalogData.json',
        cartItems: [],
        filtered: [],
        products: [],
        imgCatalog: 'https://placehold.it/200x150',
        isVisibleCart: false,
    },
    mounted() {
        // this.getJson(`${API + this.cartUrl}`)
        //     .then(data => {
        //         for (let el of data.contents) {
        //             this.cartItems.push(el);
        //         }
        //     });
        this.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });

    },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },
        removeCartItem(product) {
            this.cartItems.splice(this.cartItems.indexOf(product), 1);
        },
        addCartItem(product) {
            let find = this.cartItems.find(pr => pr.id_product === product.id_product);
            if (find) {
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.cartItems.push(prod);
            }
        },
        filterGoods() {
            let regexp = new RegExp(this.searchLine, 'i');
            this.filtered = this.products.filter(prod => regexp.test(prod.product_name))
        },
    },
    computed: {
        checkCart() {
            return this.cartItems.length === 0;
        }
    },

});