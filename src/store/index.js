import axios from 'axios';

const store = {
  state: {
    products: [],
  },
  async fetchProducts(query = '') {
    ({ data: this.state.products } = await axios.get(`http://localhost:3000/products?q=${encodeURIComponent(query)}`));
  },
  addProduct(product) {
    this.state.products.push(product);
    return axios.post('http://localhost:3000/products', product);
  }
};

export default store;