import React, { useCallback, useRef } from 'react'
import ReactCanvasConfetti from 'react-canvas-confetti'
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded'
import { IconButton, Button } from '@mui/material'
import axios from 'axios'
import useLocalStorage from '../hooks/useLocalStorage'

const canvasStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  width: '100%',
  height: '100%',
  top: 0,
  left: 0,
}

export default function OneThingButton({
  setProgress,
  progress,
  setOneThing,
  oneThing,
  handleStart,
}) {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)

  // confetti related code
  const refAnimationInstance = useRef(null)

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance
  }, [])

  const makeShot = useCallback((particleRatio, opts) => {
    refAnimationInstance.current &&
      refAnimationInstance.current({
        ...opts,
        origin: { y: 0.7 },
        particleCount: Math.floor(200 * particleRatio),
      })
  }, [])

  const fire = useCallback(() => {
    console.log('fire!!')
    makeShot(0.25, {
      spread: 26,
      startVelocity: 55,
    })

    makeShot(0.2, {
      spread: 60,
    })

    makeShot(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      scalar: 1.2,
    })

    makeShot(0.1, {
      spread: 120,
      startVelocity: 45,
    })
  }, [makeShot])

  // button related code

  const handleDone = async (e) => {
    fire(e)
    setProgress('DONE')
    // send server to change the status to 'done'

    const res = await axios.put(
      process.env.REACT_APP_SERVER_URL + '/onethings',
      {
        userId: user._id,
        newStatus: 'done',
      }
    )

    console.log(res.data)
  }

  const handleReset = () => {
    setOneThing('')
    setProgress('NOT_STARTED')
  }

  return (
    <>
      {progress === 'STARTED' && (
        <IconButton onClick={handleDone}>
          <CheckCircleOutlineRoundedIcon
            sx={{
              fontSize: '8vw',
            }}
          />
        </IconButton>
      )}

      {(progress === 'DONE' || progress === 'FAILED') && (
        <Button
          variant='outlined'
          sx={{
            width: '150px',
            height: '3rem',
            color: 'white',
            borderColor: 'white',
            // backgroundColor: 'white',
          }}
          onClick={handleReset}
        >
          RESET
        </Button>
      )}

      {progress === 'NOT_STARTED' && (
        <Button
          variant='contained'
          disabled={oneThing === ''}
          sx={{
            width: '150px',
            height: '3rem',
            backgroundColor: 'white',
          }}
          onClick={handleStart}
        >
          START
        </Button>
      )}

      <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
    </>
  )
}
