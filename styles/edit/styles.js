import { Box, Container, styled } from "@mui/material"

const PREFIX = 'Publish'

const classes = {
    container: `${PREFIX}-container`,
    box: `${PREFIX}-box`,
    detailsField: `${PREFIX}-details-field`,
    dropZone: `${PREFIX}-dropZone`,
    thumbImage: `${PREFIX}-thumb-image`,
    thumbMask: `${PREFIX}-thumb-mask`,
    labelMainImage: `${PREFIX}-label-main-image`,
    inputLabel: {
        fontWeight: 400,
        marginLeft: -1.5,
    },
    helperText: {
        marginLeft: 0,
    },

    loading: {
        display: "block",
        margin: '10px' 
    },
}

const MyContainer = styled(Container)(({theme}) => ({
    marginTop: 30,
    [`& .${classes.box}`]: {
        padding: 20,
        backgroundColor: theme.palette.background.white,
        boxShadow: '5px 5px 15px grey'
    },

    [`& .${classes.detailsField}`]: {
        marginTop: 10,
    },
}))

export {
    classes,
    MyContainer,
}