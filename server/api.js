const express = require('express')
const router = express.Router()
const axios = require('axios')

const hydrateRequest = (body) => {
  return {
    reference: 'Banked Demo Payment',
    success_url: `${process.env.BASE_URL}/cart/success`,
    error_url: `${process.env.BASE_URL}/cart/error`,
    line_items: body.map((item) => {
      return {
        name: item.name,
        amount: item.amount,
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
  try {
    const bankedResponse = await axios.post('https://banked.me/api/v2/payment_sessions', hydrateRequest(req.body), {
      headers: {
        PUBLISHABLE_API_KEY: process.env.BANKED_PUBLISHABLE_API_KEY
      }
    })
    res.send({
      url: bankedResponse.url
    })
  } catch (e) {
    res.sendStatus(500)
  }
})

module.exports = router
