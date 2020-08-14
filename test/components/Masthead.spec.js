import Vuex from 'vuex'
import { shallowMount, createLocalVue, RouterLinkStub } from '@vue/test-utils'
import Masthead from '../../components/Masthead.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Masthead', () => {
  it('renders a the cart value from the state store', () => {
    const wrapper = shallowMount(Masthead, {
      mocks: {
        $store: {
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
        }
      },
      stubs: {
        NuxtLink: RouterLinkStub
      },
      localVue
    })
    expect(wrapper.find('.cart-total').text().trim()).toEqual('Checkout (£33.50)')
  })
})
