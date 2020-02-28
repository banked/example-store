function uuidv4 () {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

export const state = () => ({
  list: []
})

export const mutations = {
  add (state, product) {
    product.cartID = uuidv4()
    product.quantity = 1
    state.list.push({ ...product })
  },
  remove (state, product) {
    state.list = state.list.filter(item => item.cartID !== product.cartID)
  }
}
