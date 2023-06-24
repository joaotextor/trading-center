import Link from 'next/link'
import slugify from 'slugify'
import {useRouter} from 'next/router'

import {
    Grid,
    IconButton,
    InputBase,
    Paper,
    Typography,
    styled, 
} from "@mui/material"

import { Box, Container } from "@mui/system"

import SearchIcon from '@mui/icons-material/Search'
import TemplateDefault from "../src/templates/Default"
import Card from "../src/components/Card"
import SearchBar from "../src/components/SearchBar"

import dbConnect from "../src/utils/dbConnect"
import ProductsModel from "../src/models/products"
import formatCurrency from "../src/utils/formatCurrency"
import { useState } from 'react'


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

const MyLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    ['&:any-link']: {
      color: theme.palette.secondary.main
    },
    ['&.homeLink']: {
      color: theme.palette.secondary.main
    }
}))

export default function Home({products}) {
    
    const route = useRouter()

    
    
    return (
        <TemplateDefault>
            <Container maxWidth="lg">
                <Typography component="h1" variant="h3" align="center" color="primary">
                    What do you wish to find?
                </Typography>
                <SearchBar/>
            </Container>

            <MyContainer maxWidth="lg" sx={{padding: 5}}>
                <Typography component="h2" variant="h4" align="center" color="primary" gutterBottom>Featured</Typography>
                <Grid container spacing={4}>
                    {
                        products.map(product => {
                            const productCategory = slugify(product.category).toLowerCase()
                            const productName = slugify(product.title).toLowerCase()
                        
                            return (
                            <Grid key={product._id} item xs={12} sm={6} md={4}>
                                <MyLink href={`/${productCategory}/${productName}/${product._id}`} width="100px">
                                    <Card
                                    title={product.title}
                                    subtitle={formatCurrency(product.price, "CA")}
                                    image={
                                        product.files[0] 
                                        ? `${product.files[0].path}`
                                        : ""}
                                    />
                                </MyLink>
                            </Grid>
                            )
                        })
                    }
                </Grid>
            </MyContainer>
        </TemplateDefault>
    )
}

export async function getServerSideProps() {
    await dbConnect()

    const products = await ProductsModel.aggregate([{
        $sample: {size: 6}
    }])

    return {
        props: {
            products: JSON.parse(JSON.stringify(products))
        }
    }
}