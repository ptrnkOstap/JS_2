Vue.component('search',{
    data(){
        return{
            searchLine: '',
        }
    },
    methods: {
        filterGoods() {
            let regex = new RegExp(this.searchLine, 'i');
            this.$root.$refs.products.filtered = this.$root.$refs.products.products.filter(el => regex.test(el.product_name))
        }
    },
    template:`
            <form @submit.prevent="filterGoods" action="#" class="search">
                <input class="search_input" type="text" v-model="searchLine">
                <button class="search_btn" href="#" type="submit"><i class="fas fa-search"></i></button>
            </form>
    `,
});