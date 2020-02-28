<template>
  <div class="max-w-sm w-full lg:max-w-full lg:flex item">
    <div class="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden product-image" :style="{ backgroundImage: 'url(' + item.image + ')' }" :title="item.name" />
    <div class="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
      <div class="text-gray-900 font-bold text-xl mb-2 product-name">
        {{ item.name }}
      </div>
      <p class="text-gray-700 text-base mb-2 product-description">
        {{ item.description }}
      </p>
      <p class="text-gray-700 text-base mb-2">
        <a href="#" class="text-xs underline hover:no-underline remove-product" @click="removeFromCart(item, $event)">Remove from cart</a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  },
  methods: {
    removeFromCart (item, e) {
      e.preventDefault()
      this.$store.commit('cart/remove', item)
    }
  }
}
</script>

<style>
.item {
  margin-bottom: 25px;
}
.item:last-of-type {
  margin-bottom: 0px;
}
@media (min-width: 320px) and (max-width: 1024px) {
  .item {
    max-width: 100%;
  }
}
</style>
