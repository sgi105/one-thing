import React from 'react'
import axios from 'axios'
import { TextField, Button, Stack } from '@mui/material'
import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import useLocalStorage from '../hooks/useLocalStorage'
import StripePaymentForm from '../components/StripePaymentForm'
import CircularProgress from '@mui/material/CircularProgress'
import PaymentStatus from '../components/PaymentStatus'
import { useNavigate } from 'react-router-dom'

// Stripe related imports
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'

import { STRIPE_KEY } from '../utils/constants'
import { SERVER_URL } from '../utils/constants'

const stripePromise = loadStripe(STRIPE_KEY)

function Payment() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)
  const [clientSecret, setClientSecret] = useState(null)
  const [loading, setLoading] = useState(false)
  const [inputMode, setInputMode] = useState(true)

  const navigate = useNavigate()

  // Stripe related code. Create SetupIntent only when the user doesn't have payment Info.

  useEffect(() => {
    const getClientSecret = async () => {
      setLoading(true)
      const res = await axios.get(SERVER_URL + '/users/secret' + `/${user._id}`)
      setClientSecret(res.data.clientSecret)

      // update user state only when it's different
      if (JSON.stringify(user) !== JSON.stringify(res.data.user))
        setUser(res.data.user)

      setLoading(false)
    }

    getClientSecret()
  }, [user])

  const options = {
    // passing the client secret obtained in step 2
    clientSecret,
    // Fully customizable with appearance API.
    appearance: {
      theme: 'night',
    },
  }

  if (loading) {
    return <CircularProgress />
  } else {
    return (
      <Stack spacing={3} alignItems='center'>
        {clientSecret && (
          <Elements stripe={stripePromise} options={options}>
            {inputMode && <StripePaymentForm />}
            <PaymentStatus
              setInputMode={setInputMode}
              setLoading={setLoading}
            />
            {!inputMode && (
              <Button
                variant='contained'
                sx={{
                  width: '150px',
                  height: '3rem',
                  backgroundColor: 'white',
                }}
                onClick={() => {
                  navigate('/')
                }}
              >
                Get started
              </Button>
            )}
          </Elements>
        )}
      </Stack>
    )
  }
}

export default Payment
