import {
  Stack,
  TextField,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material'
import React from 'react'
import { useState, useEffect } from 'react'

function TimePicker({ timeLeftInSeconds, setTimeLeftInSeconds }) {
  const [deadline, setDeadline] = useState(
    JSON.parse(window.localStorage.getItem('ONE_THING_DEADLINE'))
      ? new Date(JSON.parse(window.localStorage.getItem('ONE_THING_DEADLINE')))
      : new Date()
  )

  // set localStorage
  useEffect(() => {
    window.localStorage.setItem('ONE_THING_DEADLINE', JSON.stringify(deadline))
  }, [deadline])

  // states
  const [targetHour, setTargetHour] = useState('00')
  const [targetMinute, setTargetMinute] = useState('00')
  const [AMPM, setAMPM] = useState('AM')
  const [timeLeftString, setTimeLeftString] = useState('')

  function secondsToHms(d) {
    d = Number(d)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)

    var hDisplay = h > 0 ? h + (h === 1 ? ' hour, ' : ' hours ') : ''
    var mDisplay = m > 0 ? m + (m === 1 ? ' minute, ' : ' minutes ') : ''
    var sDisplay = s > 0 ? s + (s === 1 ? ' second' : ' seconds') : ''
    return 'finish in: ' + hDisplay + mDisplay
  }

  // set deadline
  useEffect(() => {
    const today = new Date()
    today.setHours(targetHour, targetMinute, 0)
    setDeadline(today)
  }, [targetHour, targetMinute])

  // calculate time left until deadline
  useEffect(() => {
    const nowInMiliseconds = new Date().getTime()
    const deadlineInMiliseconds = deadline.getTime()

    setTimeLeftInSeconds((deadlineInMiliseconds - nowInMiliseconds) / 1000)
  }, [deadline])

  // display time left until deadline
  useEffect(() => {
    if (timeLeftInSeconds > 0) {
      setTimeLeftString(secondsToHms(timeLeftInSeconds))
    } else {
      setTimeLeftString('deadline must be later than now')
    }
  }, [timeLeftInSeconds])

  // Input handlers
  const handleHourInput = (e) => {
    if (
      // only digits regex
      /^[0-9]*$/.test(e.target.value) &&
      e.target.value.length <= 2 &&
      e.target.value <= 24 &&
      e.target.value >= 0
    )
      setTargetHour(e.target.value)
  }
  const handleMinuteInput = (e) => {
    // if hour === 24, only accept 0.

    // if hour !== 24, only accept values between 0 and 59
    if (targetHour == 24) {
      console.log('he1')
      if (e.target.value == 0 && e.target.value.length <= 2)
        setTargetMinute(e.target.value)
    } else if (
      /^[0-9]*$/.test(e.target.value) &&
      e.target.value.length <= 2 &&
      e.target.value <= 59 &&
      e.target.value >= 0
    ) {
      console.log('he2')
      setTargetMinute(e.target.value)
    }
  }

  const handleAMPM = (e) => {
    setAMPM(e.target.value)
  }

  return (
    <Stack spacing={2}>
      <Stack flexDirection='row' justifyContent='center' alignItems='center'>
        <TextField
          onChange={handleHourInput}
          value={targetHour}
          variant='outlined'
          // type='number'
          inputProps={{ inputMode: 'numeric' }}
          sx={{
            width: 100,
            mr: 2,
            input: {
              textAlign: 'center',
              fontSize: '3vw',
            },
          }}
        />
        <Typography>:</Typography>

        <TextField
          onChange={handleMinuteInput}
          value={targetMinute}
          variant='outlined'
          inputProps={{ inputMode: 'numeric' }}
          sx={{
            width: 100,
            mx: 2,
            input: {
              textAlign: 'center',
              fontSize: '3vw',
            },
          }}
        />

        {/* <ToggleButtonGroup
          value={AMPM}
          exclusive
          onChange={handleAMPM}
          sx={{
            height: 56,
          }}
        >
          <ToggleButton value={'AM'}>AM</ToggleButton>
          <ToggleButton value={'PM'}>PM</ToggleButton>
        </ToggleButtonGroup> */}
      </Stack>

      <Typography color='tomato' variant='caption'>
        {timeLeftString}
      </Typography>
    </Stack>
  )
}

export default TimePicker
