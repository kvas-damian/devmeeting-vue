<template>
  <div>
    <ProductList :products="sortedProducts" />
  </div>
</template>

<script>
  import ProductList from './ProductList';
  export default {
    name: 'SortedProductList',
    components: { ProductList },
    props: {
      products: {
        type: Array
      },
      sortDirection: {
        type: Number,
        default: 1,
      }
    },
    computed: {
      sortedProducts: function() {
        const sortedProducts = this.products;
        sortedProducts.sort((a, b) => this.sortDirection * a.name.localeCompare(b.name));

        return sortedProducts;
      }
    }
  };
</script>