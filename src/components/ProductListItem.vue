<template>
  <li>
    <input v-model="name" /><button @click="save()">Save</button>
  </li>
</template>

<script>
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
        this.$store.dispatch('updateProduct', { id: this.product.id, name: this.name });
      }
    }
  };
</script>