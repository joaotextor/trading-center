import {
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
    styled, 
    Button
} from "@mui/material"
import { Box, Container } from "@mui/system"

import SearchIcon from '@mui/icons-material/Search'
import TemplateDefault from "../src/templates/Default"

import Card from "../src/components/Card"

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
    marginTop: 20,
    [`& .${classes.box}`]: {
        padding: 20,
        backgroundColor: theme.palette.background.white,
        boxShadow: '5px 5px 15px grey'
    },

    [`& .${classes.detailsField}`]: {
        marginTop: 10,
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
            <Container maxWidth="lg">
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
            </Container>

            <MyContainer maxWidth="lg" sx={{padding: 5}}>
                <Typography component="h2" variant="h4" align="center" color="primary" gutterBottom>Featured</Typography>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                        title="PRODUTO X"
                        subtitle="CAD$ 89.90"
                        image="https://source.unsplash.com/random"
                        actions={
                            <>
                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </>
                        }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                        title="PRODUTO X"
                        subtitle="CAD$ 89.90"
                        image="https://source.unsplash.com/random"
                        actions={
                            <>
                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </>
                        }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                        title="PRODUTO X"
                        subtitle="CAD$ 89.90"
                        image="https://source.unsplash.com/random"
                        actions={
                            <>
                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </>
                        }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} md={4}>
                        <Card
                        title="PRODUTO X"
                        subtitle="CAD$ 89.90"
                        image="https://source.unsplash.com/random"
                        actions={
                            <>
                                <Button 
                                    sx={{flexGrow: 1}}
                                    size="small" 
                                    color="primary" 
                                    variant="contained"
                                >
                                View More
                                </Button>
                            </>
                        }
                        />
                    </Grid>
                </Grid>
            </MyContainer>
        </TemplateDefault>
    )
}