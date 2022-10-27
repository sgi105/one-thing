import React from 'react'
import { Typography, Stack, Box } from '@mui/material'

function FailedMessage() {
  return (
    <>
      <Typography lineHeight={'4vw'} fontSize={'4vw'} fontWeight='100'>
        Oops, you didn’t finish in time.
        <br /> Remember, less is more.
      </Typography>
      <Typography sx={{ mt: 2 }} color='tomato'>
        You are charged $5.
      </Typography>
      <Typography>
        If there was a mistake, please send me an{' '}
        <Box
          component='a'
          href='mailto:onething.help@gmail.com?subject=One thing payment mistake'
          target='_blank'
          sx={{
            color: 'primary',
            '&:visited': {
              color: '#42a5f5',
            },
          }}
        >
          email
        </Box>
        , and you will get a full refund 🙂
      </Typography>
    </>
  )
}

export default FailedMessage
