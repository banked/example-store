<template>
  <div class="max-w-sm rounded overflow-hidden shadow-lg sm:flex-grow product">
    <img class="w-full product-image" :src="product.image" :alt="product.name">
    <div class="px-6 py-4">
      <div class="font-bold text-xl mb-2 product-name">
        {{ product.name }}
      </div>
      <p class="text-gray-700 text-base product-description">
        {{ product.description }}
      </p>
      <p class="text-gray-700 text-2xl product-price">
        {{ product.amount.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) }}
      </p>
    </div>
    <div class="px-6 py-4">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="addToCart(product)">
        Add to cart
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  methods: {
    addToCart (product) {
      this.$store.commit('cart/add', product)
    }
  }
}
</script>

<style>
.product {
    margin-right: 24px
}
.product:last-of-type {
    margin-right: 0px;
}
@media (min-width: 320px) and (max-width: 1024px) {
  .product {
    margin: 0 20px 20px;
    max-width: 100%;
  }
  .product:last-of-type {
    margin-right: 20px;
  }
}
</style>
