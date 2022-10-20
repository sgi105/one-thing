import { useState } from 'react'
import Drawer from '@mui/material/Drawer'
import { useNavigate } from 'react-router-dom'
import useLocalStorage from '../hooks/useLocalStorage'

import { googleLogout } from '@react-oauth/google'

import ListItem from '@mui/material/ListItem'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'

import IconButton from '@mui/material/IconButton'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import MenuIcon from '@mui/icons-material/Menu'
import PaymentIcon from '@mui/icons-material/Payment'
import LogoutIcon from '@mui/icons-material/Logout'
import AccountBoxIcon from '@mui/icons-material/AccountBox'

function NavMenu() {
  const [user, setUser] = useLocalStorage('ONE_THING_USER', null)

  const [drawerOpen, setDrawerOpen] = useState(false)
  const navigate = useNavigate()

  const onLogout = () => {
    googleLogout()
    setUser(null)
  }

  return (
    <div>
      <IconButton
        sx={{
          position: 'fixed',
          right: 10,
          top: 10,
        }}
        onClick={() => setDrawerOpen(!drawerOpen)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={'right'}
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <List sx={{ width: 200 }}>
          <ListItem key={'Home'} disablePadding>
            <ListItemButton onClick={() => navigate('/')}>
              <ListItemIcon>
                <AccessTimeIcon />
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItemButton>
          </ListItem>
          <ListItem key={'Profile'} disablePadding>
            <ListItemButton onClick={() => navigate('/profile')}>
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItemButton>
          </ListItem>
          {/* <ListItem key={'Logout'} disablePadding>
            <ListItemButton
              onClick={() => {
                onLogout()
                navigate('/')
              }}
            >
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItemButton>
          </ListItem> */}
        </List>
      </Drawer>
    </div>
  )
}

export default NavMenu
