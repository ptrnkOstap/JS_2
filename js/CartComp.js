Vue.component('cart', {
    data() {
        return {
            imgCart: 'https://placehold.it/50x100',
            cartUrl: '/getBasket.json',
            cartItems: [],
            isVisibleCart: false,
        }
    },
    methods: {
        removeCartItem(product) {
            this.$parent.getJson(`${API}/deleteFromBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        this.cartItems.splice(this.cartItems.indexOf(product), 1);
                    }
                })
        },
        addCartItem(product) {
            this.$parent.getJson(`${API}/addToBasket.json`)
                .then(data => {
                    if (data.result === 1) {
                        let find = this.cartItems.find(prod => prod.id_product === product.id_product);
                        if (find) {
                            find.quantity++;
                        } else {
                            let prod = Object.assign({quantity: 1}, product);
                            this.cartItems.push(prod);
                        }
                    }
                })
        }
    },
    computed: {
        checkCart() {
            return this.cartItems.length === 0;
        }
    },
    mounted() {
        this.$parent.getJson(`${API + this.cartUrl}`)
            .then(data => {
                for (let el of data.contents) {
                    this.cartItems.push(el);
                }
            });
    },
    template: `
        <div>
        <button @click="isVisibleCart=!isVisibleCart" class="btn-cart" type="button">Корзина</button>
        <div class="cart_pop_up" v-show="isVisibleCart">
            <div class="empty_message_wrapper" v-show="checkCart">
                <p class="empty_cart_message">Корзина пуста...</p><img alt="emptycart"
                                                                       class="empty_cart_image" height=200
                                                                       src="img/emptycart.png"
                                                                       width=200/>
            </div>
            <cart-item-component
            class="cart_pop_up__line"
            v-for="item in cartItems"
            :key="item.id_product"
            :product="item"
            :productImg="imgCart"
            @remove="removeCartItem">
            </cart-item-component>
        </div>
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