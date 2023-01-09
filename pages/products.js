import {
    Box,
    Container,
    Grid,
    styled,
    Typography,
    Chip,
    CardHeader,
    Avatar,
    CardMedia,
    Card,
} from "@mui/material"

import Carousel from 'react-material-ui-carousel'

import TemplateDefault from "../src/templates/Default"

const MyBox = styled(Box)(({theme}) => ({
    backgroundColor: theme.palette.background.white,
    padding: theme.spacing(3),
    marginBottom: theme.spacing(3),

    ['&.boxLocation']: {
        marginTop: theme.spacing(3)
    }
}))

const classes = {
    productName: {
        marginBlock: 2,
    },

    productPrice: {
        fontWeight: 'bold',
        marginBottom: 2,
    },

    box: {
        padding: 3,
    },

    card: {
        height: "100%"
    },

    cardMedia: {
        paddingTop: "56%"
    },

    carouselNavButtons: {
        color: "white"
    }
}

export default function Product() {
    return (
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <MyBox>
                            <Carousel
                            autoPlay={false}
                            animation="slide"
                            navButtonsAlwaysVisible
                            navButtonsProps={{style: classes.carouselNavButtons}}
                            >
                                <Card sx={classes.card}>
                                    <CardMedia
                                        sx={classes.cardMedia}
                                        image="https://source.unsplash.com/random?a=1"
                                        title="Image Title"
                                    />
                                </Card>
                                <Card sx={classes.card}>
                                    <CardMedia
                                        sx={classes.cardMedia}
                                        image="https://source.unsplash.com/random?a=54"
                                        title="Image Title"
                                    />
                                </Card>
                            </Carousel>
                        </MyBox>

                        <MyBox>
                            <Typography component="span" variant="caption">
                                Publish in June 16th, 2022
                            </Typography>
                            <Typography component="h4" variant="h4" sx={classes.productName}>
                               Jaguar XE 2.0 D R-Sport Aut.
                            </Typography>
                            <Typography component="h4" variant="h4" sx={classes.productPrice}>
                                CAD$ 50.000,00
                            </Typography>
                            <Chip label="Category" />
                        </MyBox>

                        <MyBox>
                            <Typography component="h6" variant="h6">
                                Description
                            </Typography>
                            <Typography component="p" variant="body2" sx={classes.productName}>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris efficitur fringilla congue. Fusce hendrerit posuere quam placerat porttitor. Praesent porttitor erat nec sem facilisis, eget pellentesque magna lacinia. In hac habitasse platea dictumst. Donec id nisi vel ipsum iaculis tincidunt nec eget orci. Nullam sit amet fringilla mi. Mauris cursus fermentum felis, nec dignissim magna tempus ac. Fusce id velit nec magna tempus posuere nec sit amet nisi. Pellentesque justo ipsum, interdum nec consectetur nec, vulputate vitae eros. Vivamus placerat ornare velit ac luctus. Nullam eleifend tincidunt vulputate. Cras quis justo malesuada, luctus lectus ut, tincidunt nisl. Aliquam porttitor tellus eget ligula ultricies, et congue leo tempus. Nulla augue lectus, dapibus facilisis sem sed, congue pulvinar tortor.
                            </Typography>
                        </MyBox>

                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={0} sx={classes.box}>
                            <CardHeader
                                avatar={
                                    <Avatar>J</Avatar>
                                }
                                title="João Textor"
                                subheader="joaotextor@email.com"
                            />
                            <CardMedia 
                                image="https://source.unsplash.com/random"
                                title="João Textor"
                            />
                        </Card>

                        <MyBox className="boxLocation">
                            <Typography component="h6" variant="h6">
                                Location
                            </Typography>
                        </MyBox>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}