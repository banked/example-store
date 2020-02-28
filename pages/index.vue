<template>
  <div>
    <masthead />
    <div class="container">
      <product v-for="product in products" :key="product.name" :product="product" />
    </div>
  </div>
</template>

<script>
import Masthead from '~/components/Masthead.vue'
import Product from '~/components/Product.vue'

export default {
  components: {
    Masthead,
    Product
  },
  computed: {
    products () {
      return this.$store.state.products.list
    }
  }
}
</script>

<style>
.container {
  margin: 0 auto;
  display: flex;
  max-width: 1200px;
}
@media (min-width: 320px) and (max-width: 1024px) {
  .container {
    display: block;
  }
}
</style>
