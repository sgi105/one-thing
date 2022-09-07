import React, { useState } from 'react'
import { TextField, Typography, Stack } from '@mui/material'
import useLocalStorage from '../hooks/useLocalStorage'
import { Box } from '@mui/system'
import DeadlineDiaglog from '../components/DeadlineDiaglog'
import Timer from '../components/Timer'
import CongratulationsMessage from '../components/CongratulationsMessage'
import FailedMessage from '../components/FailedMessage'
import OneThingButton from '../components/OneThingButton'

function OneThing() {
  const [progress, setProgress] = useLocalStorage(
    'ONE_THING_PROGRESS',
    'NOT_STARTED'
  )
  const [oneThing, setOneThing] = useLocalStorage('ONE_THING_TEXT', '')
  const [openDeadlineDialogue, setOpenDeadlineDialogue] = useState(false)
  const [deadline, setDeadline] = useLocalStorage('ONE_THING_DEADLINE', {})

  // possible states: not started, started, done, failed,

  const handleStart = () => {
    setOpenDeadlineDialogue(true)
    // setDeadline({})
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
          openDeadlineDialogue={openDeadlineDialogue}
          setOpenDeadlineDialogue={setOpenDeadlineDialogue}
          setProgress={setProgress}
          deadline={deadline}
          setDeadline={setDeadline}
        />
      )}
    </Stack>
  )
}

export default OneThing
