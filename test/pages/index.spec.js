import Vuex from 'vuex'
import { shallowMount, createLocalVue, mount} from '@vue/test-utils'
import Masthead from '../../components/Masthead.vue'
import Product from '../../components/Product.vue'
import Index from '../../pages/index.vue'

const localVue = createLocalVue()
localVue.use(Vuex)

const storeMock = {
  state: {
    products: {
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
    expect(Index.components.Product).toEqual(Product)
  })

  it('renders a the masthead', () => {
    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Product: "<div class='product'></div>"
      }
    })
    expect(wrapper.findAll('.masthead')).toHaveLength(1)
  })

  it('renders three products', () => {
    const wrapper = mount(Index, {
      mocks: {
        $store: storeMock
      },
      stubs: {
        Masthead: "<div class='masthead'></div>",
        Product: "<div class='product'></div>"
      }
    })
    expect(wrapper.findAll('.product')).toHaveLength(3)
  })

})