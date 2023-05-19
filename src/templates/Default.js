import Header from '../components/Header'
import Footer from '../components/Footer'
import { Box } from '@mui/material'

export default function Default({ children }) {
    return (
        <>
            <Header>HEADER</Header>
            <Box sx={{paddingTop: 10}}>
                { children }
            </Box>
            <Footer>FOOTER</Footer>
        </>
    )
}