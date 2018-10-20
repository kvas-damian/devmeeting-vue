<template>
  <div id="app">
    <h2>My awesome list</h2>
    <ul>
      <li
        v-for="p in products"
        :key="p.id"
      >
        {{ p.name }}
        <button @click="remove(p.id)">Remove</button>
        <button @click="addToCart(p)">Add to cart</button>
      </li>
    </ul>
    <p v-if="!products.length">No products!</p>
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
    <ul>
      <li
        v-for="p in cart"
        :key="p.id"
      >
        {{ p.name }}
      </li>
    </ul>
    <p v-if="!cart.length">Your cart is empty!</p>

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

Validator.extend('in', (value, array=[]) => {
  return array.includes(value);
});

export default {
  name: 'App',
  data() {
    return {
      products: [{
        id: 0,
        name: 'Coffee',
      }, {
        id: 1,
        name: 'Pizza',
      }],
      cart: [],
      productName: '',
      cartProductName: '',
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validate('productName').then(result => {
        if (!result) {
          return;
        }

        this.products.push({
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
    remove(productId) {
      const productIndex = this.products.findIndex(product => productId === product.id);
      this.products.splice(productIndex, 1);
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
