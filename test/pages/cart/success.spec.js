import { mount} from '@vue/test-utils'
import Success from '../../../pages/cart/Success.vue'

describe('Success', () => {

  it('should show a message to the user', () => {
    const wrapper = mount(Success, {
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
    expect(wrapper.find('.success-message').isVisible()).toBeTruthy()
  })

})
