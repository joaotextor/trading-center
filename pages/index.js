import { Button, Card, CardActions, CardContent, CardMedia, Grid, IconButton, InputBase, Paper, Typography } from "@mui/material"
import { styled } from "@mui/styles"
import { Box, Container } from "@mui/system"

import SearchIcon from '@mui/icons-material/Search'
import TemplateDefault from "../src/templates/Default"

const PREFIX = 'Home'

const classes = {
    container: `${PREFIX}-container`,
    box: `${PREFIX}-box`,
    detailsField: `${PREFIX}-details-field`,
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

        [`&.${classes.thumbImage}`]: {
            padding: 0,
            border: 0,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
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

const SearchBox = styled(Paper)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.2),
    paddingLeft: 10,
    marginTop: 20,
}))

export default function Home() {
    return (
        <TemplateDefault>
            <MyContainer maxWidth="md" className={classes.container}>
                <Typography component="h1" variant="h3" align="center" color="primary">
                    What do you wish to find?
                </Typography>
                <SearchBox>
                    <InputBase 
                        placeholder="Ex.: iPhone 13 with warranty" 
                        fullWidth
                    />
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                </SearchBox>
            </MyContainer>

            <MyContainer maxWidth="md">
                <Typography component="h2" variant="h4" align="center" color="primary" gutterBottom>Featured</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia 
                                sx={{padding: "50%"}}
                                image={'https://source.unsplash.com/random'}
                                title="Image title"
                            />
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                Product X
                                </Typography>
                                <Typography component="h2" variant="h6" fontSize={16}>
                                US$ XX.XX
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex', 
                                justifyContent: 'center', 
                                background: 'black'}}>

                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia 
                                sx={{padding: "50%"}}
                                image={'https://source.unsplash.com/random'}
                                title="Image title"
                            />
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                Product X
                                </Typography>
                                <Typography component="h2" variant="h6" fontSize={16}>
                                US$ XX.XX
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex', 
                                justifyContent: 'center', 
                                background: 'black'}}>

                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card>
                            <CardMedia 
                                sx={{padding: "50%"}}
                                image={'https://source.unsplash.com/random'}
                                title="Image title"
                            />
                            <CardContent>
                                <Typography component="h2" variant="h5">
                                Product X
                                </Typography>
                                <Typography component="h2" variant="h6" fontSize={16}>
                                US$ XX.XX
                                </Typography>
                            </CardContent>
                            <CardActions sx={{
                                display: 'flex', 
                                justifyContent: 'center', 
                                background: 'black'}}>

                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>

                    
                </Grid>
            </MyContainer>
        </TemplateDefault>
    )
}