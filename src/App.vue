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
    <button @click="removeLast()">Remove last item</button>
    <input
      v-model="productName"
      name="productName"
      placeholder="Product name"
    >
    <button @click="add()">Add item</button>
  </div>
</template>

<script>
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
    removeLast() {
      this.products.pop();
    },
    add() {
      this.products.push({
        id: Math.round(Math.random() * 10000),
        name: this.productName,
      });
      this.productName = '';
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
