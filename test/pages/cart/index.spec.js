import { mount} from '@vue/test-utils'
import Masthead from '../../../components/Masthead.vue'
import Item from '../../../components/Item.vue'
import Index from '../../../pages/cart/index.vue'
import axios from 'axios';

jest.mock('axios');

const storeMock = {
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
};

describe('Index', () => {

  it('includes the correct sub-components', () => {
    expect(Index.components.Masthead).toEqual(Masthead)
    expect(Index.components.Item).toEqual(Item)
  })

  it('renders a the masthead', () => {
    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='Item'></div>"
      }
    })
    expect(wrapper.findAll('.masthead')).toHaveLength(1)
  })

  it('renders three cart items', () => {
    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      }
    })
    expect(wrapper.findAll('.item')).toHaveLength(3)
  })

  it('renders the cart total', () => {
    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      }
    })
    expect(wrapper.find('.cart-total').text().trim()).toEqual('£33.50')
  })

  it('redirect to checkout when button is clicked', async (done) => {
    delete global.location;
    global.location = { replace: jest.fn() };
    axios.post.mockResolvedValue({ url: 'https://example.com/checkout/' })

    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      }
    })

    wrapper.find('button').trigger('click')

    wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(global.location.replace.mock.calls.length).toBe(1)
        expect(global.location.replace.mock.calls[0][0]).toBe('https://example.com/checkout/')
        done()
      }, 1)
    })
  })

  it('should show an error when checkout request fails', async (done) => {
    axios.post.mockRejectedValue(new Error('Roh roh shaggy'))
    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      }
    })

    wrapper.find('button').trigger('click')

    wrapper.vm.$nextTick(() => {
      setTimeout(() => {
        expect(wrapper.find('.checkout-error').isVisible()).toBeTruthy()
        done()
      }, 1)
    })
  })

  it('should show a message when a user has an empty cart', () => {
    const wrapper = mount(Index, {
      mocks: {
        $store: {
          state: {
            cart: {
              list: []
            }
          }
        }
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Item: "<div class='item'></div>"
      }
    })

      expect(wrapper.find('.empty-cart').isVisible()).toBeTruthy()
  })

})