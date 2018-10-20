<template>
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
</template>

<script>
  import uuid from 'uuid/v4';
  export default {
    name: 'AddProduct',
    data() {
      return {
        productName: '',
      };
    },
    methods: {
      onSubmit() {
        this.$validator.validate('productName').then(result => {
          if (!result) {
            return;
          }

          this.$store.dispatch('addProduct', {
            id: uuid(),
            name: this.productName,
          });
          this.productName = '';

          this.$validator.reset();
        });
      }
    }
  };
</script>