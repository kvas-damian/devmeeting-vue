<template>
  <div id="app">
    <h2 @click="sortDirection *= -1">My awesome list</h2>
    <input v-model="search" @input="onSearchChange()" placeholder="Search">
    <SortedProductList :products="sharedState.products" :sortDirection="sortDirection" />
    <AddProduct />

    <h2>Cart</h2>
    <ProductList :products="cart" />

    <form @submit.prevent="onCartSubmit()">
      <input
        v-model="cartProductName"
        v-validate="{ required: true, in: sharedState.products.map(p => p.name) }"
        name="cartProductName"
        placeholder="Product name"
      >
      <button>Add item to cart</button>
      <div v-show="errors.has('cartProductName')">
        {{ errors.first('cartProductName') }}
      </div>
    </form>
  </div>
</template>

<script>
import uuid from 'uuid/v4';
import { Validator } from 'vee-validate';
import ProductList from './components/ProductList';
import SortedProductList from './components/SortedProductList';
import store from './store/index';
import AddProduct from './components/AddProduct';

Validator.extend('in', (value, array=[]) => {
  return array.includes(value);
});

export default {
  name: 'App',
  components: { AddProduct, ProductList, SortedProductList },
  data() {
    return {
      sharedState: store.state,
      cart: [],
      cartProductName: '',
      sortDirection: 1,
      search: ''
    };
  },
  created() {
    store.fetchProducts();
  },
  methods: {
    onCartSubmit() {
      this.$validator.validate('cartProductName').then(result => {
        if (!result) {
          return;
        }

        this.cart.push({
          id: uuid(),
          name: this.cartProductName,
        });
        this.cartProductName = '';

        this.$validator.reset();
      });
    },
    onSearchChange() {
      store.fetchProducts(this.search)
    },
  },
};
</script>

<style lang="scss">
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
