const express = require('express')
const app = express()
const axios = require('axios')

app.use(express.json())

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
    rewards: [{
      type: 'avios'
    }],
    payee: {
      name: process.env.PAYEE_NAME,
      account_number: process.env.ACCOUNT_NUMBER,
      sort_code: process.env.SORT_CODE
    }
  }
}

app.post('/', async function (req, res) {
  try {
    const bankedResponse = await axios.post('https://api.banked.com/v2/payment_sessions', hydrateRequest(req.body), {
      auth: {
        username: process.env.BANKED_API_KEY,
        password: process.env.BANKED_API_SECRET
      }
    })
    res.send({
      url: bankedResponse.data.url
    })
  } catch (e) {
    res.sendStatus(500)
  }
})

export default {
  path: '/api/v1/checkout',
  handler: app
}
