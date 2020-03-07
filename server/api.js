const express = require('express')
const app = express()
const consola = require('consola')
const Banked = require('@banked/node')

app.use(express.json())

const banked = new Banked({
  api_key: process.env.BANKED_API_KEY,
  secret_key: process.env.BANKED_API_SECRET
})

const hydrateRequest = (body) => {
  return {
    reference: 'Banked Demo',
    success_url: `${process.env.BASE_URL}/cart/success`,
    error_url: `${process.env.BASE_URL}/cart/error`,
    line_items: body.map((item) => {
      return {
        name: item.name,
        amount: item.amount * 100, // Amount is sent in whole pennies/cents
        currency: 'GBP',
        description: item.description,
        quantity: item.quantity
      }
    }),
    payee: {
      name: process.env.PAYEE_NAME,
      account_number: process.env.ACCOUNT_NUMBER,
      sort_code: process.env.SORT_CODE
    }
  }
}

app.post('/', async function (req, res) {
  try {
    const bankedResponse = await banked.payments.create(hydrateRequest(req.body))
    res.send({
      url: bankedResponse.data.url
    })
  } catch (e) {
    /* istanbul ignore next */
    if (process.env.NODE_ENV !== 'test') {
      consola.error(e)
    }
    res.sendStatus(500)
  }
})

export default {
  path: '/api/v1/checkout',
  handler: app
}
