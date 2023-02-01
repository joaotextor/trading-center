import { useState } from 'react'
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  styled
} from '@mui/material'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'

import { AccountCircle, MenuIcon } from '@mui/icons-material'

const MyLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    ['&:any-link']: {
      color: theme.palette.primary.main
    },
    ['&.homeLink']: {
      color: theme.palette.secondary.main
    }
}))

export default function ButtonAppBar() {

  const [anchorUserMenu, setAnchorUserMenu] = useState(false)

  const { data: session, status } = useSession()

  const openUserMenu = Boolean(anchorUserMenu) //Considering that, when clicked, anchorUserMenu will have a value, openUserMenu will become true. When closing the Menu, anchorUserMenu will be 'null', therefore passing openUserMenu a 'false' state 

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <MyLink className="homeLink" href="/" passHref>Trading Center</MyLink>
            </Typography>
            <MyLink href={session ? "/user/publish" : "/auth/signin"} passHref>
              <Button color="secondary" variant="outlined">
                Advertise and Sell
              </Button>
            </MyLink>

            {
              session
              ? (
                <IconButton sx={{gap: 1}} onClick={(e) => setAnchorUserMenu(e.currentTarget)}>
                <Avatar src={session.user.image} sx={{marginLeft: '10px'}}/>
                <Typography variant="subtitle2" color="secondary">
                  { session.user.name }
                </Typography>
                </IconButton>
              )
              : null
            }



            <Menu
              anchorEl={anchorUserMenu}
              open={openUserMenu}
              onClose={() => setAnchorUserMenu(null)}
              // Use anchorOrigin if needed to reposition the menu
              // anchorOrigin={{
              //   vertical: 'bottom',
              //   horizontal: 'left'
              // }}
            >
              <MyLink href="/user/dashboard" passHref>
                <MenuItem>My Ads</MenuItem>
              </MyLink>

              <MyLink href="/user/publish" passHref>
                <MenuItem>Publish new Ad</MenuItem>
              </MyLink>
              
              <Divider />
              <MenuItem onClick={() => {
                console.log(process.env.NEXT_PUBLIC_NEXTAUTH_URL)
                signOut({
                  redirect: true,
                  callbackUrl: process.env.NEXT_PUBLIC_NEXTAUTH_URL,
                })}
                }>Logout</MenuItem>
            </Menu>
          </Toolbar>
          </Container>
      </AppBar>
    </Box>
  )
}