import {
  GoogleLogin,
  googleLogout,
  useGoogleLogin,
  useGoogleOneTapLogin,
} from '@react-oauth/google'
import { useState, useEffect } from 'react'
import useLocalStorage from '../hooks/useLocalStorage'
import axios from 'axios'
import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { SERVER_URL } from '../utils/constants'

function Login() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)
  const navigate = useNavigate()

  const onSuccess = async (googleRes) => {
    console.log('success:', googleRes)
    // console.log(jwtDecode(res.credential))
    // setUser(jwtDecode(res.credential))
    let token = googleRes.credential

    const res = await axios.post(SERVER_URL + '/users', {
      token,
    })

    const user = res.data.user

    setUser(user)

    if (!user.cardInfo) {
      navigate('/cardregister')
    } else {
      navigate(-1)
    }
  }

  const onError = (res) => {
    console.log('Error,', res)
  }

  const onLogout = () => {
    googleLogout()
    setUser(null)
  }

  return (
    <Stack spacing={3}>
      <Stack alignItems='center'>
        <h3>Sign In with Google</h3>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          auto_select={false}
          type='icon'
          // theme='filled_blue'
          text='continue_with'
          logo_alignment='center'
          shape='pill'
        />
      </Stack>
    </Stack>
  )
}

export default Login
