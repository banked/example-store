export const state = () => ({
  brand: 'default'
})

export const mutations = {
  update (state, mode) {
    state.brand = mode
  }
}
