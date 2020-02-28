import { mount} from '@vue/test-utils'
import Err from '../../../pages/cart/error.vue'

describe('Error', () => {

  it('should show a message to the user', () => {
    const wrapper = mount(Err, {
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
        Masthead: "<div class='masthead'></div>"
      }
    })
    expect(wrapper.find('.error-message').isVisible()).toBeTruthy()
  })

})
