import { state, getters } from '../../store/index'

describe('Index store', () => {
  it('should expose state and getters', () => {
    expect(typeof state).toBe('function')
    expect(typeof state()).toBe('object')
    expect(typeof getters).toBe('object')
  })
})
