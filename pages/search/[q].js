
import Link from 'next/link'
import slugify from 'slugify'

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

import TemplateDefault from '../../src/templates/Default'
import SearchIcon from '@mui/icons-material/Search'
import dbConnect from '../../src/utils/dbConnect'
import formatCurrency from '../../src/utils/formatCurrency'
import ProductsModel from '../../src/models/products'
import SearchBar from '../../src/components/SearchBar'

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

const MyLink = styled(Link)(({theme}) => ({
    textDecoration: 'none',
    ['&:any-link']: {
      color: theme.palette.secondary.main
    },
    ['&.homeLink']: {
      color: theme.palette.secondary.main
    }
}))

export default function List({ products, searchQuery }) {
    return (
        <TemplateDefault>
            <Container maxWidth="lg">

                <Grid container spacing={3}>

                    <Grid item xs={12} sm={12} md={12}>
                        <SearchBar />
                    </Grid>

                    <Grid item xs={12} sm={12} md={12}>
                        <MyBox>
                            <Typography component="h6" variant="h6">
                                Search result
                            </Typography>
                            <Typography component="span" variant="subtitle2">
                                {`Found ${products.length} ads with the word(s) '${searchQuery}'`}
                            </Typography>
                            <Grid container spacing={4} sx={{marginTop: 0}}>
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
                                            image={`/uploads/${product.files[0].name}`}
                                            />
                                        </MyLink>
                                    </Grid>
                                )})
                            }
                            </Grid>
                        </MyBox>
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export async function getServerSideProps({ query }) {
    await dbConnect()
    const { q } = query
    
    const products = await ProductsModel.find({
        $or: [
            { title: {
                $regex: q,
                $options: 'i'
            }},
            { description: {
                $regex: q,
                $options: 'i'
            }}
        ]
    })
    

    return {
        props: {
            searchQuery: JSON.parse(JSON.stringify(q)),
            products: JSON.parse(JSON.stringify(products))
        }
    }
}