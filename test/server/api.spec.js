const request = require('supertest')
const axios = require('axios')
const testServer = require('./test-server')

jest.mock('axios')

const getCartContents = (quantity = 1) => {
  return Array.from(Array(quantity).keys()).map(() => {
    return {
      name: 'Some cart item',
      amount: 22.2,
      description: 'A cart item description',
      quantity: 1
    }
  })
}

describe('API', () => {
  beforeEach(() => {
    process.env.BANKED_PUBLISHABLE_API_KEY = 'BANKED_API_KEY'
    process.env.BASE_URL = 'https://someurl.com'
    process.env.PAYEE_NAME = 'Example Store Ltd.'
    process.env.ACCOUNT_NUMBER = '00000000'
    process.env.SORT_CODE = '00-00-00'
  })

  afterEach(() => {
    delete process.env.BANKED_PUBLISHABLE_API_KEY
    delete process.env.BASE_URL
    delete process.env.PAYEE_NAME
    delete process.env.ACCOUNT_NUMBER
    delete process.env.SORT_CODE
  })

  it('should return a checkout URL on successful Banked initialisation', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      url: 'https://checkout.banked.com/6a7fe1fd-3292-4472-b6fd-2d8ad127ff4f/'
    }))
    const res = await request(testServer).post('/api/v1/checkout').send(getCartContents(3)).set('Accept', 'application/json')
    expect(res.statusCode).toBe(200)
    expect(res.body.url).toBe('https://checkout.banked.com/6a7fe1fd-3292-4472-b6fd-2d8ad127ff4f/')
  })

  it('should pass the correct data to Banked when initialising a payment session', async () => {
    axios.post.mockImplementationOnce(() => Promise.resolve({
      url: 'https://checkout.banked.com/6a7fe1fd-3292-4472-b6fd-2d8ad127ff4f/'
    }))
    const res = await request(testServer).post('/api/v1/checkout').send(getCartContents(1)).set('Accept', 'application/json')
    expect(res.statusCode).toBe(200)
    expect(axios.post).toHaveBeenCalledWith('https://banked.me/api/v2/payment_sessions', {
      reference: 'Banked Demo Payment',
      success_url: 'https://someurl.com/cart/success',
      error_url: 'https://someurl.com/cart/error',
      line_items: [{
        name: 'Some cart item',
        amount: 22.2,
        currency: 'GBP',
        description: 'A cart item description',
        quantity: 1
      }],
      payee: {
        name: 'Example Store Ltd.',
        account_number: '00000000',
        sort_code: '00-00-00'
      }
    }, {
      headers: {
        PUBLISHABLE_API_KEY: 'BANKED_API_KEY'
      }
    })
  })

  it('should return a 500 if Banked returns an error', async () => {
    axios.post.mockImplementationOnce(() => Promise.reject(new Error('Roh roh Shaggy!')))
    const res = await request(testServer).post('/api/v1/checkout').send(getCartContents(3)).set('Accept', 'application/json')
    expect(res.statusCode).toBe(500)
  })
})
