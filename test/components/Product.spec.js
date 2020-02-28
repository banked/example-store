import Vuex from 'vuex'
import { shallowMount, createLocalVue } from '@vue/test-utils'
import Product from '../../components/Product.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('Product', () => {
  let store
  let mutations

  beforeEach(() => {
    mutations = {
      'cart/add': jest.fn()
    }
    store = new Vuex.Store({
      mutations
    })
  })

  it('has the correct props set', () => {
    expect(typeof Product.props.product).toBe('object')
    expect(Product.props.product.type).toBe(Object)
    expect(Product.props.product.required).toBe(true)
  })

  it('renders the product properties', () => {
    const wrapper = shallowMount(Product, {
      propsData: {
        product: {
          name: 'Foobar Product',
          description: 'Lorem lipsum product description',
          amount: 33.35,
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

    const productPrice = wrapper.find('.product-price')
    expect(productPrice.text()).toBe('£33.35')

    const productImage = wrapper.find('.product-image')
    expect(productImage.attributes().src).toBe('https://example.com/image.png')
    expect(productImage.attributes().alt).toBe('Foobar Product')
  })

  it('adds the product to the cart when button is clicked', () => {
    const wrapper = shallowMount(Product, {
      propsData: {
        product: {
          name: 'Foobar Product',
          description: 'Lorem lipsum product description',
          amount: 33.35,
          image: 'https://example.com/image.png'
        }
      },
      store,
      localVue
    })
    wrapper.find('button').trigger('click')
    expect(mutations['cart/add'].mock.calls).toHaveLength(1)
    expect(mutations['cart/add'].mock.calls[0][1]).toEqual({
      name: 'Foobar Product',
      description: 'Lorem lipsum product description',
      amount: 33.35,
      image: 'https://example.com/image.png'
    })
  })
})
