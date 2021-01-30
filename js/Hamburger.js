class Hamburger {

    size;
    filling;
    option;
    burger;

    constructor() {
        this.getSizes();
        this.getFillings();
        this.getOptions();
        this.burger = [];
    }

    compareHamburger(chosenSize = 'big', [...fillings] = ['cheese'], [...options] = []) {
        this.addBurgerOption(this.size, chosenSize);

        fillings.forEach(chosenFilling => this.addBurgerOption(this.filling, chosenFilling));
        options.forEach(chosenOption => this.addBurgerOption(this.option, chosenOption));
        console.log(this.burger);
    }

    getPriceCalories() {
        const calories = this.burger.reduce(((sum, optionCalories) => sum += optionCalories.calories), 0);
        const price = this.burger.reduce(((sum, optionPrice) => sum += optionPrice.price), 0);
        return {totalPrice: price, totalCalories: calories};
    }

    addBurgerOption(arr, name) {
        const optionIndex = arr.findIndex(x => x.type === name);
        this.burger.push(Object.assign({}, arr[optionIndex]));
    }

    getSizes() {
        this.size = [
            {type: 'big', price: 100, calories: 40},
            {type: 'small', price: 50, calories: 20}
        ]
    }

    getFillings() {
        this.filling = [
            {type: 'cheese', price: 10, calories: 20},
            {type: 'salad', price: 20, calories: 5},
            {type: 'potato', price: 15, calories: 10},
        ]
    }

    getOptions() {
        this.option = [
            {type: 'spice', price: 15, calories: 0},
            {type: 'sour', price: 20, calories: 5},
        ]
    }
}

const burger = new Hamburger();
burger.compareHamburger('big', ['cheese', 'potato']);
burger.getPriceCalories();


