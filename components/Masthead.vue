<template>
  <header class="clearfix">
    <nuxt-link to="/" class="float-left">
      Example Store
    </nuxt-link>
    <nuxt-link to="/cart" class="float-right cart-total">
      Cart ({{ cartValue.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) }})
    </nuxt-link>
  </header>
</template>

<script>

export default {
  computed: {
    cartValue () {
      return this.$store.state.cart.list.reduce((a, b) => a + b.amount, 0)
    }
  }
}
</script>

<style>
header {
  margin: 50px auto;
  max-width: 1200px;
}
@media (min-width: 320px) and (max-width: 1024px) {
  header {
    padding: 0 20px;
    margin: 30px auto;
  }
}
</style>
