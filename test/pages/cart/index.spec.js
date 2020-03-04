import Vuex from 'vuex'
import { mount, createLocalVue } from '@vue/test-utils'
import axios from 'axios'
import Masthead from '../../../components/Masthead.vue'
import Item from '../../../components/Item.vue'
import Index from '../../../pages/cart/index.vue'

jest.mock('axios')

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Index', () => {
  let store
  let mutations

  beforeEach(() => {
    mutations = {
      'cart/applyDiscount': jest.fn(),
      'cart/removeDiscount': jest.fn()
    }
    store = new Vuex.Store({
      mutations,
      state: {
        cart: {
          list: [{
            amount: 10
          }, {
            amount: 12.50
          }, {
            amount: 11
          }]
        }
      }
    })
  })

  it('includes the correct sub-components', () => {
    expect(Index.components.Masthead).toEqual(Masthead)
    expect(Index.components.Item).toEqual(Item)
  })

  it('renders the masthead', () => {
    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='Item'></div>"
      },
      store,
      localVue
    })
    expect(wrapper.findAll('.masthead')).toHaveLength(1)
  })

  it('renders three cart items', () => {
    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      },
      store,
      localVue
    })
    expect(wrapper.findAll('.item')).toHaveLength(3)
  })

  it('renders the cart total', () => {
    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      },
      store,
      localVue
    })
    expect(wrapper.find('.cart-total').text().trim()).toEqual('£33.50')
  })

  it('redirects to checkout when button is clicked', (done) => {
    delete global.location
    global.location = { replace: jest.fn() }
    axios.post.mockResolvedValue({
      data: {
        url: 'https://example.com/checkout/'
      }
    })

    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      },
      store,
      localVue
    })

    wrapper.find('.btn-banked').trigger('click')

    wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(global.location.replace.mock.calls.length).toBe(1)
        expect(global.location.replace.mock.calls[0][0]).toBe('https://example.com/checkout/')
        done()
      }, 1)
    })
  })

  it('should show an error when checkout request fails', (done) => {
    axios.post.mockRejectedValue(new Error('Roh roh shaggy'))
    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      },
      store,
      localVue
    })

    wrapper.find('.btn-banked').trigger('click')

    wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(wrapper.find('.checkout-error').isVisible()).toBeTruthy()
        done()
      }, 1)
    })
  })

  it('should show a message when a user has an empty cart', () => {
    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      },
      store: new Vuex.Store({
        mutations,
        state: {
          cart: {
            list: []
          }
        }
      }),
      localVue
    })

    expect(wrapper.find('.empty-cart').isVisible()).toBeTruthy()
  })

  it('apply and remove a discount when checkbox is clicked', (done) => {
    const wrapper = mount(Index, {
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      },
      store,
      localVue
    })
    expect(wrapper.find('.cart-total').text().trim()).toEqual('£33.50')

    const input = wrapper.find('.discount')

    input.setChecked(true)

    wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(mutations['cart/applyDiscount']).toBeCalled()
        input.setChecked(false)

        wrapper.vm.$nextTick(() => {
          setTimeout(() => {
            expect(mutations['cart/removeDiscount']).toBeCalled()
            done()
          }, 1)
        })
      }, 1)
    })
  })
})
