<template>
  <div id="App">
    <h2>My awesome list</h2>
    <ul>
      <li
        v-for="p in products"
        :key="p.id"
      >
        {{ p.name }}
        <button @click="remove(p.id)">Remove</button>
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
  </div>
</template>

<script>
import uuid from 'uuid/v4';

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
      productName: '',
    };
  },
  methods: {
    onSubmit() {
      this.$validator.validateAll().then(result => {
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
