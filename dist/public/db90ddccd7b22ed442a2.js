function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

Vue.component('products', {
  data: function data() {
    return {
      catalogUrl: '/catalogData.json',
      filtered: [],
      products: [],
      imgCatalog: 'https://placehold.it/200x150'
    };
  },
  mounted: function mounted() {
    var _this = this;

    this.$parent.getJson('/api/products').then(function (data) {
      var _iterator = _createForOfIteratorHelper(data),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var el = _step.value;

          _this.products.push(el);

          _this.filtered.push(el);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    });
  },
  template: "\n        <div>\n            <div class=\"products\" v-if=\"filtered.length\">\n                <product \n                v-for=\"item in filtered\"\n                :product=\"item\"\n                :productImg=\"imgCatalog\"\n                :key=\"item.id_product\">                \n                </product>\n            </div>\n            <div class=\"nodata\" v-else>\n                <p class=\"nodata_message\">\u041D\u0435\u0442 \u0434\u0430\u043D\u043D\u044B\u0445</p>\n            </div>\n        </div>\n    "
});
Vue.component('product', {
  props: {
    product: Object,
    productImg: String
  },
  data: function data() {
    return {
      cartAPI: this.$root.$refs.cart
    };
  },
  template: "\n        <div class=\"product-item\">\n            <img :alt=\"product.product_name\" :src=\"productImg\" class=\"product_item_picture\" height=\"120\"\n                 width=\"180\">\n             <div class=\"description\">\n                <h3 class=\"product_item_title\">{{product.product_name}}</h3>\n                <p class=\"product_item_price\"> {{Number(product.price).toLocaleString('ru')}} &#x20bd;</p>\n                <button @click=\"cartAPI.addCartItem(product)\" class=\"by-btn\">\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0432 \u043A\u043E\u0440\u0437\u0438\u043D\u0443</button>\n            </div>\n        </div>\n    "
});