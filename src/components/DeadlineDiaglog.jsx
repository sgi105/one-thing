import {
  Typography,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  FormControl,
  MenuItem,
  InputLabel,
  Select,
  ListItemText,
} from '@mui/material'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import {
  convert12HourTo24HourFormat,
  convert24HourTo12HourFormat,
} from '../utils/utils'
import axios from 'axios'
import { LocalConvenienceStoreOutlined } from '@mui/icons-material'

function DeadlineDiaglog({
  openDeadlineDialogue,
  setOpenDeadlineDialogue,
  setProgress,
  deadline,
  setDeadline,
  oneThing,
}) {
  const [hour, setHour] = useState(0)
  const [minute, setMinute] = useState(0)
  const [AMPM, setAMPM] = useState('')
  // const [deadline, setDeadline] = useLocalStorage('ONE_THING_DEADLINE', {})
  const [timeLeftText, setTimeLeftText] = useState('')
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)

  // set default values for hour, min, AMPM
  useEffect(() => {
    const now = new Date()
    let minute = Math.ceil(now.getMinutes() / 5) * 5
    now.setMinutes(minute)
    minute = now.getMinutes()
    let hour = now.getHours()

    const timeIn12HourFormat = convert24HourTo12HourFormat(hour, minute)

    setHour(timeIn12HourFormat.hour)
    setMinute(timeIn12HourFormat.minute)
    setAMPM(timeIn12HourFormat.AMPM)
  }, [openDeadlineDialogue])

  // set deadline
  useEffect(() => {
    const now = new Date()
    const today = new Date()
    const timeIn24HourFormat = convert12HourTo24HourFormat(hour, minute, AMPM)
    let deadline = new Date(
      today.setHours(timeIn24HourFormat.hour, timeIn24HourFormat.minute, 0)
    )

    // if deadline time is before now, add one day to deadline
    if (deadline.getTime() < now.getTime()) {
      deadline = new Date(deadline.getTime() + 1000 * 24 * 60 * 60)
    }

    setDeadline(deadline)
  }, [hour, minute, AMPM])

  // display time left
  useEffect(() => {
    const nowInMiliseconds = new Date().getTime()
    const deadlineInMiliseconds = new Date(deadline).getTime()

    const timeLeftInSeconds = (deadlineInMiliseconds - nowInMiliseconds) / 1000

    let h = Math.floor(timeLeftInSeconds / 3600)
    let m = Math.floor((timeLeftInSeconds % 3600) / 60)
    let s = Math.floor((timeLeftInSeconds % 3600) % 60)

    h = h < 10 ? '0' + h + 'h' : h + 'h'
    m = m < 10 ? '0' + m + 'm' : m + 'm'

    const text = h + ' ' + m + ' remaining'
    setTimeLeftText(text)
  }, [deadline])

  const handleClose = () => {
    setOpenDeadlineDialogue(false)
  }

  const minuteSelectionArray = []
  for (let i = 0; i <= 59; i += 5) {
    let text = i >= 10 ? i : '0' + i
    minuteSelectionArray.push(
      <MenuItem key={i + 'm'} value={i}>
        {text}
      </MenuItem>
    )
  }

  const HourSelectionArray = []
  for (let i = 1; i <= 12; i += 1) {
    let text = i >= 10 ? i : '0' + i
    HourSelectionArray.push(
      <MenuItem key={i + 'h'} value={i}>
        {text}
      </MenuItem>
    )
  }

  const handleStart = async () => {
    setProgress('STARTED')
    setOpenDeadlineDialogue(false)
    // when starting, send server current user, start time, deadline

    const res = await axios.post(
      process.env.REACT_APP_SERVER_URL + '/onething',
      {
        userId: user._id,
        stripeCustomer: user.stripeCustomer,
        cardInfo: user.cardInfo,
        startTime: new Date(),
        deadline,
        chargeAmount: 500,
        content: oneThing,
      }
    )
  }

  return (
    <Dialog open={openDeadlineDialogue} onClose={handleClose}>
      <Stack
        sx={{
          p: 5,
        }}
        alignItems='center'
        spacing={3}
      >
        <Typography>SET DEADLINE</Typography>
        <Stack flexDirection={'row'} alignItems='center' gap={1}>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Hour</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={hour}
              label='Age'
              onChange={(e) => setHour(e.target.value)}
            >
              {HourSelectionArray}
            </Select>
          </FormControl>
          <FormControl>
            <InputLabel id='demo-simple-select-label'>Minute</InputLabel>
            <Select
              labelId='demo-simple-select-label'
              id='demo-simple-select'
              value={minute}
              label='Age'
              onChange={(e) => setMinute(e.target.value)}
            >
              {minuteSelectionArray}
            </Select>
          </FormControl>

          <ToggleButtonGroup
            value={AMPM}
            exclusive
            onChange={(e) => setAMPM(e.target.value)}
            sx={{
              height: 56,
            }}
          >
            <ToggleButton value={'AM'}>AM</ToggleButton>
            <ToggleButton value={'PM'}>PM</ToggleButton>
          </ToggleButtonGroup>
        </Stack>
        <Typography variant='caption'>{timeLeftText}</Typography>
        <Button onClick={handleStart}>Start</Button>
      </Stack>
    </Dialog>
  )
}

export default DeadlineDiaglog
