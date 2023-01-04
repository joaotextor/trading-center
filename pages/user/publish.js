
import { DeleteForever, NoEncryption } from '@mui/icons-material'
import { styled, Typography, Box, TextField, Select, Button, IconButton } from '@mui/material'
import { Container } from '@mui/system'
import TemplateDefault from '../../src/templates/Default'

const PREFIX = 'Publish'

const classes = {
    container: `${PREFIX}-container`,
    box: `${PREFIX}-box`,
    detailsField: `${PREFIX}-details-field`,
    dropZone: `${PREFIX}-dropZone`,
    thumbImage: `${PREFIX}-thumb-image`,
    thumbMask: `${PREFIX}-thumb-mask`,
    labelMainImage: `${PREFIX}-label-main-image`,
}

const MyContainer = styled(Container)(({theme}) => ({
    [`&.${classes.container}`]: {
        padding: 20,
    },

    [`& .${classes.box}`]: {
        padding: 20,
        backgroundColor: theme.palette.background.white,
        boxShadow: '5px 5px 15px grey'
    },

    [`& .${classes.detailsField}`]: {
        marginTop: 10,
    },
}))

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

        [`&.${classes.dropZone}`]: {
            border: '2px dashed black',
            backgroundColor: theme.palette.background.default,
        },

        [`&.${classes.thumbImage}`]: {
            padding: 0,
            border: '1px solid black',
            backgroundSize: 'cover',
        },

        [`& .${classes.thumbMask}`]: {
            display: 'none',
            width: '100%',
            height: '100%',
            margin: 0,
            border: 0,
            backgroundColor: theme.palette.background.blackTransparent
        },

        [`&.${classes.thumbImage}:hover .${classes.thumbMask}`]: {
            display: 'flex'
        },

        [`& .${classes.labelMainImage}`]: {
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

export default function Publish() {
    
    return (
        <TemplateDefault>
            <MyContainer className={classes.container} maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="primary">
                    Publish new Ad
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="primary">
                    The more detailed the better!
                </Typography>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="primary">
                        Ad Title
                    </Typography>
                    <TextField
                        label="ex.: bike rim 18 with warranty"
                        fullWidth
                    />
                    <br /><br />
                    <Typography component="h6" variant="h6" color="primary">
                        Gategory
                    </Typography>
                    <Select
                        native
                        value=""
                        fullWidth
                        onChange={() => {}}
                        inputProps={{
                            name: 'age,'
                        }}
                    >
                        <option value="">Select</option>
                        <option value={1}>Babies and Children</option>
                        <option value={2}>Agriculture</option>
                        <option value={3}>Fashion</option>
                        <option value={3}>Cars, Motorcycles and Boats</option>
                        <option value={3}>Services</option>
                        <option value={3}>Recreation</option>
                        <option value={3}>Animals</option>
                        <option value={3}>Furniture, Home and Garden</option>
                        <option value={3}>Real Estate</option>
                        <option value={3}>Equipments and Tools</option>
                        <option value={3}>Smartphones and Tablets</option>
                        <option value={3}>Sport</option>
                        <option value={3}>Technology</option>
                        <option value={3}>Jobs</option>
                        <option value={3}>Other</option>
                    </Select>
                </Box>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="primary">
                            Images
                    </Typography>
                    <Typography component="div" variant="body2" color="primary">
                            The first image will be your ad&apos;s cover picture.
                    </Typography>
                    <Box sx={{
                        display: 'flex',
                        marginTop: '10px',
                        }}>
                        <ThumbBox className={classes.dropZone}>
                            <Typography>
                                Click to select or drag image here
                            </Typography>
                        </ThumbBox>

                        <ThumbBox 
                        className={classes.thumbImage} 
                        sx={{
                            backgroundImage: 'url(https://source.unsplash.com/random)'
                        }}>
                            <ThumbBox className={classes.thumbMask}>
                                <IconButton color="secondary">
                                    <DeleteForever fontSize="large"/>    
                                </IconButton>   
                            </ThumbBox>

                            <ThumbBox className={classes.labelMainImage}>
                                <Typography>
                                    Main
                                </Typography>
                            </ThumbBox>
                        </ThumbBox>

                    </Box>
                </Box>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="primary">
                            Description
                    </Typography>
                    <Typography component="div" variant="body2" color="primary">
                            Write the details of what you are selling.
                    </Typography>
                    <TextField className={classes.detailsField}
                        multiline
                        rows={6}
                        variant="outlined"
                        fullWidth
                    />
                </Box>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="primary" gutterBottom>
                            Contact Info
                    </Typography>
                    <TextField
                        label="Contact Name"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <br /><br />
                    <TextField
                        label="E-mail"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <br /><br />
                    <TextField
                        label="Phone"
                        variant="outlined"
                        size="small"
                        fullWidth
                    />
                    <br /><br />
                </Box>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box textAlign="right">
                    <Button
                        variant="contained"
                        color="primary"
                    >Publish Ad</Button>
                </Box>
            </MyContainer>
        </TemplateDefault>
    )
}