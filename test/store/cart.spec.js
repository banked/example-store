import isValidUUID from 'uuid-validate'
import { state, mutations } from '../../store/cart'

describe('Cart store', () => {
  it('should allow a item to be added to the cart', () => {
    const st = state()
    expect(st.list.length).toBe(0)

    mutations.add(st, {
      foo: 'bar'
    })

    expect(st.list.length).toBe(1)
    expect(st.list[0].foo).toBe('bar')
    expect(st.list[0].quantity).toBe(1)
    expect(typeof st.list[0].cartID).toBe('string')
  })

  it('should generate unique, pseudo-random cartIDs', () => {
    const st = state()
    mutations.add(st, {
      foo: 'bar'
    })
    mutations.add(st, {
      foo: 'bar'
    })

    expect(st.list.length).toBe(2)
    expect(st.list[0].cartID).not.toBe(st.list[1].cartID)
    expect(isValidUUID(st.list[0].cartID)).toBeTruthy()
  })

  it('should allow the removal of an item from the cart', () => {
    const st = state()
    mutations.add(st, {
      foo: 'bar'
    })
    expect(st.list.length).toBe(1)

    mutations.remove(st, st.list[0])

    expect(st.list.length).toBe(0)
  })

  it('should apple a discount to items in the cart', () => {
    const st = state()
    mutations.add(st, {
      foo: 'bar',
      amount: 22
    })
    mutations.add(st, {
      foo: 'bar',
      amount: 10
    })

    expect(st.list.reduce((a, b) => a + b.amount, 0)).toBe(32)

    mutations.applyDiscount(st)

    expect(st.list.reduce((a, b) => a + b.amount, 0)).toBe(0.02)
  })
})
