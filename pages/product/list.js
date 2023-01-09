
import TemplateDefault from '../../src/templates/Default'

import Card from '../../src/components/Card'
import {
    Container,
    Typography,
    Box,
    Grid,
    IconButton,
    Paper,
    InputBase,
    styled,
} from '@mui/material'

import SearchIcon from '@mui/icons-material/Search'

const MyBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBlock: theme.spacing(3),
}))

const SearchBox = styled(Paper)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.2),
    paddingLeft: 10,
    marginTop: -40,
}))

export default function List() {
    return (
        <TemplateDefault>
            <Container maxWidth="lg">

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12} md={12}>
                        <SearchBox>
                            <InputBase 
                                placeholder="Ex.: iPhone 13 with warranty" 
                                fullWidth
                            />
                            <IconButton>
                                <SearchIcon />
                            </IconButton>
                        </SearchBox>
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <MyBox>
                            <Typography component="h6" variant="h6">
                                Advertisements
                            </Typography>
                            <Typography component="span" variant="subtitle2">
                                FOUND 200 ADS
                            </Typography>
                            <Grid container spacing={4} sx={{marginTop: 0}}>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card
                                        image="http://source.unsplash.com/random?a=10"
                                        title="Product X"
                                        subtitle="CAD$ 12.22"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Card
                                        image="http://source.unsplash.com/random?a=20"
                                        title="Product X"
                                        subtitle="CAD$ 12.22"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6} md={4}>
                                    <Card
                                        image="http://source.unsplash.com/random?a=32"
                                        title="Product X"
                                        subtitle="CAD$ 12.22"
                                    />
                                </Grid>
                            </Grid>
                        </MyBox>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}