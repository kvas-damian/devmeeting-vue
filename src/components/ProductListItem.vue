<template>
  <li>
    <input v-model="name" /><button @click="save()">Save</button>
  </li>
</template>

<script>
  import store from '../store';

  export default {
    name: 'ProductListItem',
    props: {
      product: {
        type: Object
      }
    },
    data() {
      return {
        name: this.product.name,
      }
    },
    methods: {
      save() {
        store.updateProduct(this.product.id, this.name);
      }
    }
  };
</script>