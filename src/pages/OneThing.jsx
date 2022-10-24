import React, { useState } from 'react'
import { TextField, Typography, Stack, Button, Menu } from '@mui/material'
import useLocalStorage from '../hooks/useLocalStorage'
import { Box } from '@mui/system'
import DeadlineDiaglog from '../components/DeadlineDiaglog'
import PaymentErrorDialog from '../components/PaymentErrorDialog'
import Timer from '../components/Timer'
import CongratulationsMessage from '../components/CongratulationsMessage'
import FailedMessage from '../components/FailedMessage'
import OneThingButton from '../components/OneThingButton'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function OneThing() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)
  const [progress, setProgress] = useLocalStorage(
    'ONE_THING_PROGRESS',
    'NOT_STARTED'
  )
  const [oneThing, setOneThing] = useLocalStorage('ONE_THING_TEXT', '')
  const [openDeadlineDialog, setOpenDeadlineDialog] = useState(false)
  const [openPaymentErrorDialog, setOpenPaymentErrorDialog] = useState(false)
  const [deadline, setDeadline] = useLocalStorage('ONE_THING_DEADLINE', {})
  const [unchargedOneThing, setUnchargedOneThing] = useState(null)

  const navigate = useNavigate()

  // possible states: not started, started, done, failed,

  // when clicks start,
  // 1. check if the user is logged in
  // 2. and check if the user has any unpayed charges.
  const handleStart = async () => {
    if (!user) {
      navigate('/login')
    } else {
      // get onethings by id
      const res = await axios.get(
        process.env.REACT_APP_SERVER_URL + `/onethings/${user._id}`
      )

      const oneThings = res.data

      let unchargedOneThing
      // check for unpayed charges: paymentError && charged == false
      oneThings.forEach((elem) => {
        if (elem.paymentError && elem.charged === false)
          unchargedOneThing = elem
      })

      // if there is uncharged onething, set up a dialogue
      if (unchargedOneThing) {
        setUnchargedOneThing(unchargedOneThing)
        setOpenPaymentErrorDialog(true)
      } else {
        // open the time setting dialogue
        setOpenDeadlineDialog(true)
      }
    }
  }

  return (
    <Stack height='80%' width='100%' spacing={0} alignItems='center'>
      <Box height='33%'>
        {progress === 'STARTED' && (
          <Timer setProgress={setProgress} deadline={deadline} />
        )}
        {progress === 'DONE' && <CongratulationsMessage />}
        {progress === 'FAILED' && <FailedMessage />}
      </Box>
      <Stack height='33%' width='100%' spacing={1} justifyContent='center'>
        <div>
          <Typography fontSize='1.5vw' fontWeight={900}>
            THE ONE THING
          </Typography>
          <TextField
            value={oneThing}
            onChange={(e) => setOneThing(e.target.value)}
            variant='standard'
            fullWidth
            multiline
            placeholder='What is your one thing?'
            maxRows={2}
            sx={{
              textarea: {
                textAlign: 'center',
                fontSize: '7vw',
                fontWeight: '900',
                lineHeight: '7vw',
                '&::placeholder': {
                  fontSize: '3vw',
                },
              },
            }}
            InputProps={{ disableUnderline: progress === 'STARTED' }}
          />
        </div>
      </Stack>
      <Stack height='33%' justifyContent='center'>
        <OneThingButton
          setProgress={setProgress}
          progress={progress}
          setOneThing={setOneThing}
          oneThing={oneThing}
          handleStart={handleStart}
        />
      </Stack>

      {progress === 'NOT_STARTED' && (
        <DeadlineDiaglog
          oneThing={oneThing}
          openDeadlineDialog={openDeadlineDialog}
          setOpenDeadlineDialog={setOpenDeadlineDialog}
          setProgress={setProgress}
          deadline={deadline}
          setDeadline={setDeadline}
        />
      )}
      {openPaymentErrorDialog && (
        <PaymentErrorDialog
          openPaymentErrorDialog={openPaymentErrorDialog}
          setOpenPaymentErrorDialog={setOpenPaymentErrorDialog}
          unchargedOneThing={unchargedOneThing}
        />
      )}
    </Stack>
  )
}

export default OneThing
