const express = require('express')
const router = express.Router()
const axios = require('axios')
const consola = require('consola')

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

/* GET image */
router.post('/v1/checkout', async function (req, res) {
  console.log(req)
  try {
    const bankedResponse = await axios.post('https://banked.me/api/v2/payment_sessions', hydrateRequest(req.body), {
      auth: {
        username: process.env.BANKED_API_KEY,
        password: process.env.BANKED_API_SECRET
      }
    })
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

module.exports = router
