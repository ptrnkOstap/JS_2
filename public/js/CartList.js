

Vue.component('cartlist', {
    data() {
        return {
            cartItems: [],
            imgCart: 'https://placehold.it/50x100',
        };
    },

    computed: {
        checkCart() {
            return this.cartItems.length === 0;
        }
    },
    mounted() {
        this.$parent.getJson('/api/cart')
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });

    },
    methods:{
        removeCartItem(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.$parent.deleteJson(`/api/cart/${product.id_product}`);
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    }
                })
        },
    },

    template: `
        <div class="cart_list_container">
            <div class="empty_message_wrapper" v-show="checkCart">
                <p class="empty_cart_message">Корзина пуста.</p>
            </div>
            <cart-item-component
            class="cart_pop_up__line cart_list_line"
            v-for="item in cartItems"
            :key="item.id_product"
            :product="item"
            :productImg="imgCart"
            @remove="removeCartItem">
            </cart-item-component>
</div>
`
});

Vue.component('cart-item-component', {
    props: {
        product: Object,
        productImg: String
    },
    template:
        `       <div class="cart_pop_up__line">
                        <a class="img-link" href="#"><img :src="productImg" alt="" height="70" width="70"></a>
                        <p class="product_title">{{product.product_name}}</p>
                        <p class="product_subtotal"> {{product.quantity}} шт. на
                            {{(Number(product.price * product.quantity)).toLocaleString('ru')}} &#x20bd;</p>
                        <button @click="$emit('remove',product)" class="remove_from_cart">X</button>
                    </div>`
});
