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

import TemplateDefault from "../../../src/templates/Default"
import dbConnect from "../../../src/utils/dbConnect"
import ProductsModel from "../../../src/models/products"
import formatCurrency from "../../../src/utils/formatCurrency"

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
    },

    location: {
        fontSize: "18px"
    }
}

export default function Product({ product }) {
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
                                {
                                    product.files.map(file => ( 
                                        <>
                                        <Card key={file.name} sx={classes.card}>
                                            <CardMedia
                                                sx={classes.cardMedia}
                                                image={`/uploads/${file.name}`}
                                                title={product.title}
                                            />
                                        </Card>
                                        </>
                                    ))
                                }
                            </Carousel>
                        </MyBox>

                        <MyBox>
                            <Typography component="span" variant="caption">
                                {`Publish on ${new Date(product.publishDate).toLocaleDateString('en-CA', {year: 'numeric', month: 'long', day: 'numeric'})}`}
                            </Typography>
                            <Typography component="h4" variant="h4" sx={classes.productName}>
                               {product.title}
                            </Typography>
                            <Typography component="h4" variant="h4" sx={classes.productPrice}>
                                {formatCurrency(product.price, "CA")}
                            </Typography>
                            <Chip label={product.category} />
                        </MyBox>

                        <MyBox>
                            <Typography component="h6" variant="h6">
                                Description
                            </Typography>
                            <Typography component="p" variant="body2" sx={classes.productName}>
                            {product.description}
                            </Typography>
                        </MyBox>

                    </Grid>
                    <Grid item xs={4}>
                        <Card elevation={0} sx={classes.box}>
                            <CardHeader
                                avatar={
                                    <Avatar src={product.contactImage}>
                                        {product.contactImage || product.contactName[0].toUpperCase()}
                                    </Avatar>
                                }
                                title={product.contactName}
                                subheader={product.contactEmail}
                            />
                            <CardMedia 
                                image={product.contactImage}
                                title={product.contactName}
                            />
                        </Card>

                        <MyBox className="boxLocation">
                            <Typography component="span" variant="h6">
                                Location: 
                            </Typography>
                            <Typography component="span" variant="body1" sx={classes.location}>
                            {` ${product.location}`}
                            </Typography>
                        </MyBox>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    const { id } = query
    await dbConnect()

    const product = await ProductsModel.findOne({ _id: id })

    try {    
        return {
            props: {
                product: JSON.parse(JSON.stringify(product))
            }
        }
    }

    catch {
        return {
            props: { null: null }
        }
    }
}