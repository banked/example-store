<template>
  <div>
    <masthead />
    <div class="container-no-flex border rounded border-gray-200 shadow-lg px-6 py-4" role="alert">
      <p class="font-bold text-xl mb-2">
        Welcome to the Banked Example Store
      </p>
      <p class="text-gray-700">
        Experience the effortlessness of the Banked Hosted Checkout utilising account to account payments. To get started, add an item to your shopping cart and proceed to checkout
      </p>
    </div>
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
.container-no-flex {
  margin: 0 auto;
  max-width: 1200px;
  margin-bottom: 24px;
}
@media (min-width: 320px) and (max-width: 1024px) {
  .container {
    display: block;
  }
}
</style>
