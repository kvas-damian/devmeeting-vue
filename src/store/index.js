import Vue from 'vue';
import axios from 'axios';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

// const store = {
//   state: {
//     products: [],
//   },
//   async fetchProducts(query = '') {
//     ({ data: this.state.products } = await axios.get(`http://localhost:3000/products?q=${encodeURIComponent(query)}`));
//   },
//   addProduct(product) {
//     this.state.products.push(product);
//     return axios.post('http://localhost:3000/products', product);
//   },
//   updateProduct(id, name) {
//     axios.put(`http://localhost:3000/products/${encodeURIComponent(id)}`, {
//       name
//     });
//   }
// };
//
// export default store;

export default new Vuex.Store({
  state: {
    products: []
  },
  mutations: {
    setProducts(state, products) {
      state.products = products;
    },
    addProduct(state, product) {
      state.products.push(product);
    },
    updateProduct(state, product) {
      state.products.find(p => p.id === product.id).name = product.name;
    }
  },
  actions: {
    async fetchProducts(store, query = '') {
      const { data: products } = await axios.get(`http://localhost:3000/products?q=${encodeURIComponent(query)}`);
      store.commit('setProducts', products);
    },
    addProduct(store, product) {
      store.commit('addProduct', product);
      return axios.post('http://localhost:3000/products', product);
    },
    updateProduct(store, product) {
      axios.put(`http://localhost:3000/products/${encodeURIComponent(product.id)}`, {
        name: product.name
      });
      store.commit('updateProduct', product);
    }
  },
  plugins: [createLogger()],
});