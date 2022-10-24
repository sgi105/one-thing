import {
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  Divider,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
import { formatDateToString } from '../utils/utils'

function PaymentErrorDialog({
  openPaymentErrorDialog,
  setOpenPaymentErrorDialog,
  unchargedOneThing,
}) {
  console.log(unchargedOneThing)
  const handleClose = () => {
    setOpenPaymentErrorDialog(false)
  }

  const retryPayment = () => {
    //  create a new payment intent
  }

  const enterNewCard = () => {
    // go to card edit page
  }

  // when the payment issue is resolved, delete the payment error on DB
  return (
    <Dialog open={openPaymentErrorDialog} onClose={handleClose}>
      <Stack
        sx={{
          p: 5,
        }}
        alignItems='center'
      >
        {/* show info of the error: error type, payment amount, date */}
        <Typography variant='h6' mb={3}>
          You have a failed payment.
        </Typography>
        <Typography variant='caption'>
          ${unchargedOneThing?.chargeAmount / 100} ---{' '}
          {formatDateToString(new Date(unchargedOneThing?.deadline))}
        </Typography>
        <Typography variant='caption' color='tomato' mb={3}>
          {unchargedOneThing?.paymentError?.message}
        </Typography>
        <Stack spacing={1} direction={'row'}>
          <Button
            sx={{
              width: '50%',
            }}
            size='small'
            variant='outlined'
            onClick={retryPayment}
          >
            Retry payment
          </Button>
          <Button
            sx={{
              width: '50%',
            }}
            size='small'
            variant='outlined'
            onClick={enterNewCard}
          >
            Enter a new Card
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  )
}

export default PaymentErrorDialog
