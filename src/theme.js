import { createTheme, rgbToHex } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#000000'
        },
        secondary: {
            main: '#FFFFFF'
        },
        background: {
            default: 'rgb(242, 244, 245)',
            white: '#ffffff',
            variantion: 'red',
            blackTransparent: 'rgba(0, 0, 0, .7)'
        }
    }
})

export default theme