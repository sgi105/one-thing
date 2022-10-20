import './App.css'

// MUI & UI COMPONENTS
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import { Stack } from '@mui/material'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// PAGES
import OneThing from './pages/OneThing'
import CardRegister from './pages/CardRegister'
import PaymentResult from './pages/PaymentResult'
import Login from './pages/Login'
import Profile from './pages/Profile'

// NAVIGATION
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import NavMenu from './components/NavMenu'

// AUTH
import { GoogleOAuthProvider } from '@react-oauth/google'
const clientId =
  '4802122118-ac5knlcoavnb0l904a8qpke8cio8n3pu.apps.googleusercontent.com'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
})

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
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
          <Router>
            <Routes>
              <Route path='/' element={<OneThing />} />
              <Route path='/cardregister' element={<CardRegister />} />
              <Route path='/paymentresult' element={<PaymentResult />} />
              <Route path='/login' element={<Login />} />
              <Route path='/profile' element={<Profile />} />
            </Routes>
            <NavMenu />
            <ToastContainer />
          </Router>
        </Stack>
      </ThemeProvider>
    </GoogleOAuthProvider>
  )
}

export default App
