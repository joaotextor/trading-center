import { 
  Button, 
  Container, 
  Grid, 
  Typography, 
  styled,
} from '@mui/material'

import Link from 'next/link'
import { getSession } from 'next-auth/react'

import dbConnect from '../../src/utils/dbConnect'
import ProductsModel from '../../src/models/products'

import TemplateDefault from '../../src/templates/Default'

import formatCurrency from '../../src/utils/formatCurrency'
import Card from '../../src/components/Card'
import axios from 'axios'

const PREFIX = 'Dashboard'

const classes = {
  container: `${PREFIX}-container`,
  button: `${PREFIX}-buttonAdd`,
  card: `${PREFIX}-card`,
}

const MyContainer = styled(Container)(({theme}) => ({
  marginTop: 20,
  [`& .${classes.button}`]: {
    margin: "30px auto",
    display: "block",
    borderRadius: theme.shape.radius,
  },

  [`& .${classes.card}`]: {
    padding: 5,
  }
}))

const MyLink = styled(Link)(({theme}) => ({
  textDecoration: 'none'
}))

const Home = ({products}) => {

  console.log(products)
  return (
    <TemplateDefault>
      <Container maxWidth="sm" align="center">
        <Typography component="h1" variant="h2" align="center">
          My Adds
        </Typography>
        <MyLink href="/user/publish" passHref>
          <Button variant="contained" color="primary" sx={{margin: 2}}>Publish Add</Button>
        </MyLink>
      </Container>
      <MyContainer maxWidth="md" className={classes.card}>
        <Grid container spacing={2}>

          {

            products.map(product => (
            <Grid key={product._id} item xs={12} sm={6} md={3}>
              <Card
              title={product.title}
              subtitle={formatCurrency(product.price, 'CA')}
              image={`/uploads/${product.files[0].name}`}
              actions={
                <>
                  <Button size="small" variant="contained" color="primary">
                    Editar
                  </Button>
                  <Button size="small" variant="contained" color="primary">
                    Remover
                  </Button>
                </>
              }
              />
          </Grid>
            )
          )
            
          }
         
        </Grid>
      </MyContainer>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({req}) {
  const session = await getSession({ req })
  await dbConnect()
  const products = await ProductsModel.find({ 'userId': session.userId })

  return {
    props: {
      products: JSON.parse(JSON.stringify(products))
    }
  }
}

export default Home