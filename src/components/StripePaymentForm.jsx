import React from 'react'
import { useState } from 'react'
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js'
import { Button } from '@mui/material'
import axios from 'axios'
import { Stack } from '@mui/system'
import useLocalStorage from '../hooks/useLocalStorage'

function StripePaymentForm() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)
  const stripe = useStripe()
  const elements = useElements()
  const [errorMessage, setErrorMessage] = useState(null)

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    event.preventDefault()
    console.log('handling submission')

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return
    }

    const { error } = await stripe.confirmSetup({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: 'http://localhost:3000/cardregister/',
      },
    })

    if (error) {
      // This point will only be reached if there is an immediate error when
      // confirming the payment. Show error to your customer (for example, payment
      // details incomplete)
      setErrorMessage(error.message)
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing={2}>
        <PaymentElement />
        <Button
          sx={{
            // height: '3rem',
            color: 'black',
            background: 'white',
            borderColor: 'white',
          }}
          variant='contained'
          fullWidth
          disabled={!stripe}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        {/* Show error message to your customers */}
        {errorMessage && <div>{errorMessage}</div>}
      </Stack>
    </form>
  )
}

export default StripePaymentForm
