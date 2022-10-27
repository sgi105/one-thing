import React from 'react'
import PaymentStatus from '../components/PaymentStatus'
import { useEffect } from 'react'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'
import { SERVER_URL } from '../utils/constants'

function PaymentResult() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)

  useEffect(() => {
    const savePaymentMethodToDb = async () => {
      // tell the server to update payment info.
      const res = await axios.get(
        SERVER_URL + `/users/updatepaymentinfo/${user.stripeCustomer.id}`
      )
    }
    savePaymentMethodToDb()
  }, [])

  return (
    <div>
      <PaymentStatus />
    </div>
  )
}

export default PaymentResult
