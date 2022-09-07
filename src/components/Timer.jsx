import { Typography } from '@mui/material'
import React, { useState, useEffect } from 'react'
import { convert24HourTo12HourFormat } from '../utils/utils'

const Timer = ({ deadline, setProgress }) => {
  const [timerDisplayText, setTimerDisplayText] = useState('')
  const [timeLeftInSeconds, setTimeLeftInSeconds] = useState(
    (new Date(deadline).getTime() - new Date().getTime()) / 1000
  )
  const [deadlineText, setDeadlineText] = useState('')

  useEffect(() => {
    const now = new Date(deadline)
    console.log(now)
    const h = now.getHours()
    const m = now.getMinutes()
    let { hour, minute, AMPM } = convert24HourTo12HourFormat(h, m)
    hour = hour >= 10 ? hour : '0' + hour
    minute = minute >= 10 ? minute : '0' + minute
    const text = `${hour}:${minute} ${AMPM}`
    setDeadlineText(text)
  }, [])

  function secondsToHms(d) {
    d = Number(d)
    var h = Math.floor(d / 3600)
    var m = Math.floor((d % 3600) / 60)
    var s = Math.floor((d % 3600) % 60)

    var hDisplay = h === 0 ? '00' : h < 10 ? '0' + h : h
    var mDisplay = m === 0 ? '00' : m < 10 ? '0' + m : m
    var sDisplay = s === 0 ? '00' : s < 10 ? '0' + s : s
    return hDisplay + ':' + mDisplay + ':' + sDisplay
  }

  useEffect(() => {
    setTimerDisplayText(secondsToHms(timeLeftInSeconds))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      const time = (new Date(deadline).getTime() - new Date().getTime()) / 1000

      if (Math.floor(time) < 1) setProgress('FAILED')
      setTimeLeftInSeconds(time)
      setTimerDisplayText(secondsToHms(time))
    }, 500)
  }, [timeLeftInSeconds])

  return (
    <>
      <Typography fontSize='2rem' fontWeight={100}>
        DUE {deadlineText}
      </Typography>
      <Typography variant='h1' fontSize='6rem' fontWeight={200}>
        {timerDisplayText}
      </Typography>
    </>
  )
}

export default Timer
