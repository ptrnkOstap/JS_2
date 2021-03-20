Vue.component('search', {
  data: function data() {
    return {
      searchLine: ''
    };
  },
  methods: {
    filterGoods: function filterGoods() {
      var regex = new RegExp(this.searchLine, 'i');
      this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(function (el) {
        return regex.test(el.product_name);
      });
    }
  },
  template: "\n            <form @submit.prevent=\"filterGoods\" action=\"#\" class=\"search\">\n                <input class=\"search_input\" type=\"text\" v-model=\"searchLine\">\n                <button class=\"search_btn\" href=\"#\" type=\"submit\"><i class=\"fas fa-search\"></i></button>\n            </form>\n    "
});