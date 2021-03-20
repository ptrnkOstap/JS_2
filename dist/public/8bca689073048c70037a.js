function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Vue.component('cart', {
  data: function data() {
    return {
      imgCart: 'https://placehold.it/50x100',
      cartUrl: '/getBasket.json',
      cartItems: [],
      isVisibleCart: false
    };
  },
  methods: {
    removeCartItem: function removeCartItem(product) {
      var _this = this;

      this.$parent.getJson("".concat(API, "/deleteFromBasket.json")).then(function (data) {
        if (data.result === 1) {
          _this.$parent.deleteJson("/api/cart/".concat(product.id_product));

          _this.cartItems.splice(_this.cartItems.indexOf(product), 1);
        }
      });
    },
    addCartItem: function addCartItem(product) {
      var _this2 = this;

      var find = this.cartItems.find(function (el) {
        return el.id_product === product.id_product;
      });

      if (find) {
        this.$parent.putJson("/api/cart/".concat(find.id_product), {
          quantity: 1
        });
        find.quantity++;
      } else {
        var prod = Object.assign({
          quantity: 1
        }, product);
        this.$parent.postJson('/api/cart', prod).then(function (data) {
          if (data.result === 1) {
            _this2.cartItems.push(prod);
          }
        });
      }
    }
  },
  computed: {
    checkCart: function checkCart() {
      return this.cartItems.length === 0;
    }
  },
  mounted: function mounted() {
    var _this3 = this;

    this.$parent.getJson('/api/cart').then(function (data) {
      var _iterator = _createForOfIteratorHelper(data.contents),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;

          _this3.cartItems.push(el);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  },
  template: "\n        <div>\n        <button @click=\"isVisibleCart=!isVisibleCart\" class=\"btn-cart\" type=\"button\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430</button>\n        <div class=\"cart_pop_up\" v-show=\"isVisibleCart\">\n            <div class=\"empty_message_wrapper\" v-show=\"checkCart\">\n                <p class=\"empty_cart_message\">\u041A\u043E\u0440\u0437\u0438\u043D\u0430 \u043F\u0443\u0441\u0442\u0430...</p><img alt=\"emptycart\"\n                                                                       class=\"empty_cart_image\" height=200\n                                                                       src=\"img/emptycart.png\"\n                                                                       width=200/>\n            </div>\n            <cart-item-component\n            class=\"cart_pop_up__line\"\n            v-for=\"item in cartItems\"\n            :key=\"item.id_product\"\n            :product=\"item\"\n            :productImg=\"imgCart\"\n            @remove=\"removeCartItem\">\n            </cart-item-component>\n           <p v-show=\"!checkCart\"><a href=\"/cart.html\">\u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</a></p>\n        </div>\n</div>\n"
});
Vue.component('cart-item-component', {
  props: {
    product: Object,
    productImg: String
  },
  template: "       <div class=\"cart_pop_up__line\">\n                        <a class=\"img-link\" href=\"#\"><img :src=\"productImg\" alt=\"\" height=\"70\" width=\"70\"></a>\n                        <p class=\"product_title\">{{product.product_name}}</p>\n                        <p class=\"product_subtotal\"> {{product.quantity}} \u0448\u0442. \u043D\u0430\n                            {{(Number(product.price * product.quantity)).toLocaleString('ru')}} &#x20bd;</p>\n                        <button @click=\"$emit('remove',product)\" class=\"remove_from_cart\">X</button>\n                    </div>"
});