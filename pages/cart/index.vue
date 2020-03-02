<template>
  <div>
    <masthead />
    <div class="cart-container">
      <div class="w-3/5">
        <div v-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-8 checkout-error" role="alert">
          <strong class="font-bold">Something went wrong!</strong>
          <span class="block sm:inline">Something went wrong checking you out, please try again</span>
        </div>

        <div v-if="!cart.length" class="flex items-center bg-blue-500 text-white text-sm font-bold px-4 py-3 empty-cart" role="alert">
          <svg class="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" /></svg>
          <p>You have nothing in your cart.</p>
        </div>

        <item v-for="item in cart" :key="item.cartID" :item="item" />
      </div>
      <div class="w-2/5 pl-16">
        <p>Cart total</p>
        <p class="text-3xl cart-total">
          {{ cartValue.toLocaleString('en-GB', { style: 'currency', currency: 'GBP' }) }}
        </p>
        <p>
          <input v-model="discountApplied" type="checkbox" name="discount" class="discount"> Apply discount
        </p>
        <button class="btn btn-banked mt-4" @click="checkout(cart, $event)">
          Checkout with Banked :
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Masthead from '~/components/Masthead.vue'
import Item from '~/components/Item.vue'

export default {
  components: {
    Masthead,
    Item
  },
  data () {
    return {
      error: null,
      discountApplied: false
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart.list
    },
    cartValue () {
      return this.$store.state.cart.list.reduce((a, b) => a + b.amount, 0)
    }
  },
  watch: {
    discountApplied (applyDiscount) {
      if (applyDiscount === true) {
        this.$store.commit('cart/applyDiscount')
      } else {
        this.$store.commit('cart/removeDiscount')
      }
    }
  },
  methods: {
    async checkout (cart, e) {
      e.preventDefault()
      try {
        const res = await axios.post('/api/v1/checkout', cart, {
          timeout: 1000
        })
        global.location.replace(res.data.url)
      } catch (e) {
        this.error = e
      }
    }
  }
}
</script>

<style>
.cart-container {
  margin: 0 auto;
  max-width: 1200px;
  display: flex;
}

@media (min-width: 320px) and (max-width: 1024px) {
  .cart-container {
    display: block;
  }
  .cart-container .w-3\/5 {
    width: auto;
    margin: 0 20px;
  }
  .cart-container .h-48 {
    height: 6rem;
    background-position: center;
  }
  .cart-container .w-2\/5 {
    width: auto;
    padding-left: 0;
    margin: 0 20px 50px;
  }
  .empty-cart {
    margin-bottom: 30px;
  }
}

.btn {
  @apply font-bold py-2 px-4 rounded;
}
.btn-banked {
  @apply text-white text-xl;
  background: #000;
}
.btn-banked:hover {
  background: #2d2d2d;
}

</style>
