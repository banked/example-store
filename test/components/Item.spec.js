import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Item from '../../components/Item.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Item', () => {
  let store
  let mutations

  beforeEach(() => {
    mutations = {
      'cart/remove': jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
  })

  it('has the correct props set', () => {
    expect(typeof Item.props.item).toBe('object')
    expect(Item.props.item.type).toBe(Object)
    expect(Item.props.item.required).toBe(true)
  })

  it('renders the item properties', () => {
    const wrapper = shallowMount(Item, {
      propsData: {
        item: {
          name: 'Foobar Product',
          description: 'Lorem lipsum product description',
          image: 'https://example.com/image.png'
        }
      },
      store,
      localVue
    })

    const productName = wrapper.find('.product-name')
    expect(productName.text()).toBe('Foobar Product')

    const productDescription = wrapper.find('.product-description')
    expect(productDescription.text()).toBe('Lorem lipsum product description')

    const productImage = wrapper.find('.product-image')
    expect(productImage.attributes().style).toMatch(/image.png/)
    expect(productImage.attributes().title).toBe('Foobar Product')
  })

  it('adds removes the item from the cart when the link is clicked', () => {
    const wrapper = shallowMount(Item, {
      propsData: {
        item: {
          name: 'Foobar Product',
          description: 'Lorem lipsum product description',
          image: 'https://example.com/image.png'
        }
      },
      store,
      localVue
    })
    wrapper.find('.remove-product').trigger('click')
    expect(mutations['cart/remove'].mock.calls).toHaveLength(1)
    expect(mutations['cart/remove'].mock.calls[0][1]).toEqual({
      name: 'Foobar Product',
      description: 'Lorem lipsum product description',
      image: 'https://example.com/image.png'
    })
  })
})
