import { state } from '../../store/products';

describe('Products store', () => {

  it('should provide a list of dummy products in the correct schema', () => {
    const store = state();
    expect(Array.isArray(store.list)).toBeTruthy();
    expect(store.list.length).toBe(3);
    expect(store.list[0]).toEqual({
      name: 'Nike Free Flynit',
      description: 'Ideal for runs up to 3 miles, the Nike Free RN Flyknit 3.0 delivers a lace-free design so you can slip in and hit your stride.',
      amount: 110,
      image: '/images/product-1.jpg'
    })
  })

})