Vue.component('products', {
    data() {
        return {
            catalogUrl: '/catalogData.json',
            filtered: [],
            products: [],
            imgCatalog: 'https://placehold.it/200x150',
        };
    },

    mounted() {
        this.$parent.getJson(`${API + this.catalogUrl}`)
            .then(data => {
                for (let el of data) {
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
    },

    template: `
        <div>
            <div class="products" v-if="filtered.length">
                <product 
                v-for="item in filtered"
                :product="item"
                :productImg="imgCatalog"
                :key="item.id_product">                
                </product>
            </div>
            <div class="nodata" v-else>
                <p class="nodata_message">Нет данных</p>
            </div>
        </div>
    `
});
Vue.component('product', {
    props: {
        product: Object,
        productImg: String
    },
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },
    template: `
        <div class="product-item">
            <img :alt="product.product_name" :src="productImg" class="product_item_picture" height="120"
                 width="180">
             <div class="description">
                <h3 class="product_item_title">{{product.product_name}}</h3>
                <p class="product_item_price"> {{Number(product.price).toLocaleString('ru')}} &#x20bd;</p>
                <button @click="cartAPI.addCartItem(product)" class="by-btn">Добавить в корзину</button>
            </div>
        </div>
    `
})