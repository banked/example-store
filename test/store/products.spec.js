import { state } from '../../store/products';

describe('Products store', () => {

  it('should provide a list of dummy products in the correct schema', () => {
    const store = state();
    expect(Array.isArray(store.list)).toBeTruthy();
    expect(store.list.length).toBe(3);
    expect(store.list[0]).toEqual({
      name: 'A product name',
      description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.',
      amount: 23.2,
      image: '/images/card-top.jpg'
    })
  })

})