const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';
const app = new Vue({
    el: '#app',
    // data: {
    //     searchLine: '',
    // },
    // mounted() {
    //
    //     this.getJson(`${API + this.catalogUrl}`)
    //         .then(data => {
    //             for (let el of data) {
    //                 this.products.push(el);
    //                 this.filtered.push(el);
    //             }
    //         });
    //
    // },
    methods: {
        getJson(url) {
            return fetch(url)
                .then(result => result.json())
                .catch(error => console.log(error));
        },

        // addCartItem(product) {
        //     let find = this.cartItems.find(pr => pr.id_product === product.id_product);
        //     if (find) {
        //         find.quantity++;
        //     } else {
        //         let prod = Object.assign({quantity: 1}, product);
        //         this.cartItems.push(prod);
        //     }
        // },
        // filterGoods() {
        //     let regexp = new RegExp(this.searchLine, 'i');
        //     this.filtered = this.products.filter(prod => regexp.test(prod.product_name))
        // },
    },


});