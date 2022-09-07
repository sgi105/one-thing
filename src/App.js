import './App.css'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { useState } from 'react'

import { Stack } from '@mui/material'
import OneThing from './pages/OneThing'
import useLocalStorage from './hooks/useLocalStorage'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  const [started, setStarted] = useLocalStorage('ONE_THING_STARTED', false)

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Stack
        height='100vh'
        width='90%'
        className='App'
        justifyContent='center'
        alignItems='center'
        mx='auto'
      >
        <OneThing started={started} setStarted={setStarted} />
      </Stack>
    </ThemeProvider>
  )
}

export default App
