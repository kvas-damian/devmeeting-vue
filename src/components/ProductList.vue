<template>
  <div>
    <ul>
      <ProductListItem
        v-for="p in products"
        :key="p.id"
        :product="p"
      />
    </ul>
    <p v-if="!products.length">No products!</p>
  </div>
</template>

<script>
  import ProductListItem from './ProductListItem';
  export default {
    name: 'ProductList',
    components: { ProductListItem },
    props: {
      products: {
        type: Array
      }
    }
  };
</script>