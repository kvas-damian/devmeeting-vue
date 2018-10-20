<template>
  <li>
    {{ product.name }}
  </li>
</template>

<script>
  export default {
    name: 'ProductListItem',
    props: {
      product: {
        type: Object
      }
    }
  };
</script>