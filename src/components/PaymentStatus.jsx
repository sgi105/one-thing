// PaymentStatus.jsx

import React, { useState, useEffect } from 'react'
import { useStripe } from '@stripe/react-stripe-js'
import { Typography } from '@mui/material'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'
import { SERVER_URL } from '../utils/constants'

const PaymentStatus = ({ setInputMode, setLoading }) => {
  const stripe = useStripe()
  const [message, setMessage] = useState(null)
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)

  useEffect(() => {
    const updatePaymentStatus = async () => {
      if (!stripe) {
        console.log('returning')
        return
      }

      // Retrieve the "setup_intent_client_secret" query parameter appended to
      // your return_url by Stripe.js
      const clientSecret = new URLSearchParams(window.location.search).get(
        'setup_intent_client_secret'
      )

      if (!clientSecret) return

      // hide payment input form
      setInputMode(false)
      // Retrieve the SetupIntent
      stripe.retrieveSetupIntent(clientSecret).then(async ({ setupIntent }) => {
        // Inspect the SetupIntent `status` to indicate the status of the payment
        // to your customer.
        //
        // Some payment methods will [immediately succeed or fail][0] upon
        // confirmation, while others will first enter a `processing` state.
        //
        // [0]: https://stripe.com/docs/payments/payment-methods#payment-notification
        switch (setupIntent.status) {
          case 'succeeded':
            setMessage('Success! Your payment method has been saved.')
            // tell the server to update payment info.
            const res = await axios.get(
              SERVER_URL + `/users/updatepaymentinfo/${user.stripeCustomer.id}`
            )

            setUser(res.data.user)
            break

          case 'processing':
            setMessage(
              "Processing payment details. We'll update you when processing is complete."
            )
            break

          case 'requires_payment_method':
            // Redirect your user back to your payment page to attempt collecting
            // payment again
            setMessage(
              'Failed to process payment details. Please try another payment method.'
            )
            break
        }
      })
    }
    updatePaymentStatus()
  }, [stripe])

  return (
    <>
      <Typography>{message}</Typography>
    </>
  )
}

export default PaymentStatus
