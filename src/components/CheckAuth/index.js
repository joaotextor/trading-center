import { Box, Typography } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { classes } from './styles'

const CheckAuth = ({ Component, pageProps }) => {

    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {

        if (!session) {
            router.push('/auth/signin')
            
        }

    }, [router, session])

    if (session) {
        return <Component {...pageProps}/>
    }
    
    return (
    
        <Box sx={classes.box}><Typography variant="h3" component="h1">Loading...</Typography></Box>
    
        )
    
}

export default CheckAuth