<template>
  <div id="app">
    <h2 @click="sortDirection *= -1">My awesome list</h2>
    <SortedProductList :products="sharedState.products" :sortDirection="sortDirection" />
    <form @submit.prevent="onSubmit()">
      <input
        v-model="productName"
        v-validate="'required|min:3'"
        name="productName"
        placeholder="Product name"
      >
      <button>Add item</button>
      <div v-show="errors.has('productName')">
        {{ errors.first('productName') }}
      </div>
    </form>

    <h2>Cart</h2>
    <ProductList :products="cart" />

    <form @submit.prevent="onCartSubmit()">
      <input
        v-model="cartProductName"
        v-validate="{ required: true, in: products.map(p => p.name) }"
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

Validator.extend('in', (value, array=[]) => {
  return array.includes(value);
});

export default {
  name: 'App',
  components: { ProductList, SortedProductList },
  data() {
    return {
      sharedState: store.state,
      cart: [],
      productName: '',
      cartProductName: '',
      sortDirection: 1,
    };
  },
  created() {
    store.fetchProducts();
  },
  methods: {
    onSubmit() {
      this.$validator.validate('productName').then(result => {
        if (!result) {
          return;
        }

        store.addProduct({
          id: uuid(),
          name: this.productName,
        });
        this.productName = '';

        this.$validator.reset();
      });
    },
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
