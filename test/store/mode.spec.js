import { state, mutations } from '../../store/mode'

describe('Mode store', () => {
  it('should set a default mode', () => {
    const st = state()
    expect(st.brand).toEqual('default')
  })
  it('should allow a item to be added to the cart', () => {
    const st = state()

    mutations.update(st, 'foo')

    expect(st.brand).toEqual('foo')
  })
})
