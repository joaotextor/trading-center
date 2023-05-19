import { Box, styled } from "@mui/material"

const ThumbBox = styled(Box)(({theme})=> ({
    position: 'relative',
    display: 'flex',
    border: '2px solid black',
    padding: 10,
    margin: '0 15px 15px 0',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    width: 200,
    height: 150,

    [`&.dropzone`]: {
        border: '2px dashed black',
        backgroundColor: theme.palette.background.default,
    },

    [`&.thumb-img`]: {
        padding: 0,
        border: 0,
        backgroundSize: 'contain',
        backgroundRepeat: 'no-repeat',
    },

    [`& .thumb-mask`]: {
        display: 'none',
        width: '100%',
        height: '100%',
        margin: 0,
        border: 0,
        backgroundColor: theme.palette.background.blackTransparent
    },

    [`&.thumb-img:hover .thumb-mask`]: {
        display: 'flex'
    },

    [`& .lbl-main-img`]: {
        color: 'white',
        margin: 0,
        border: 0,
        borderRadius: '5px',
        width: 'fit-content',
        height: '20px',
        backgroundColor: 'blue',
        padding: '6px 10px',
        position: 'absolute',
        bottom: 0,
        left: 0,
    },
}))

export { ThumbBox }