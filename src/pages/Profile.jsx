import { useEffect, useState } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import { useNavigate } from 'react-router-dom'
import { Button, Typography } from '@mui/material'
import { Stack, Box } from '@mui/system'
import Avatar from '@mui/material/Avatar'
import { googleLogout } from '@react-oauth/google'

function Profile() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      navigate('/login')
    } else if (!user.cardInfo) {
      navigate('/cardregister')
    }
  }, [user])

  const onLogout = () => {
    googleLogout()
    setUser(null)
  }

  const onEditCard = () => {
    navigate('/cardregister')
  }

  return (
    <>
      {user && (
        <Stack spacing={2} alignItems='center'>
          <Avatar
            sx={{ width: 56, height: 56 }}
            src={user.picture}
            alt={user.userName}
          />
          <Typography variant='h5'>{user.userName}</Typography>
          <Typography color='gray'>{user.email}</Typography>
          <Stack
            direction='row'
            alignItems='center'
            spacing={2}
            sx={{
              backgroundColor: 'white',
              color: 'black',
              px: 2,
              py: 1,
              borderRadius: 2,
            }}
          >
            <Typography textTransform='uppercase'>
              {user.cardInfo.card.brand}
            </Typography>
            <Typography variant='body2'>
              **** {user.cardInfo.card.last4}
            </Typography>
            <Button
              sx={{
                color: '#42a5f5',
              }}
              size='small'
              onClick={onEditCard}
            >
              Edit
            </Button>
          </Stack>
          <Button
            variant='outlined'
            sx={{
              '&&': {
                mt: 5,
              },
              color: 'white',
              borderColor: 'white',
            }}
            fullWidth
            onClick={() => {
              onLogout()
            }}
          >
            Log out
          </Button>
        </Stack>
      )}
    </>
  )
}

export default Profile
