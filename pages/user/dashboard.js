import { useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import { getSession } from 'next-auth/react'
import Router from 'next/router'

import { 
  Button, 
  Container, 
  Grid, 
  Typography, 
  styled,
} from '@mui/material'

import dbConnect from '../../src/utils/dbConnect'
import ProductsModel from '../../src/models/products'

import TemplateDefault from '../../src/templates/Default'

import formatCurrency from '../../src/utils/formatCurrency'
import Card from '../../src/components/Card'
import AlertDialog from '../../src/components/AlertDialog'
import useToasty from '../../src/contexts/Toasty'

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

  const [alertOpen, setAlertOpen] = useState(false)
  const [productToRemove, setProductToRemove] = useState()

  const {setToasty} = useToasty()
  
  const handleCloseModal = () => setAlertOpen(false)
  
  const handleOpenModal = (productId) => {
    setProductToRemove(productId)
    setAlertOpen(true)
  }

  
  const handleRemoveProduct = () => {
    axios.delete('/api/products/delete', {
      data: {
        id: productToRemove
      }
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    Router.reload(window,location.pathname)
    setAlertOpen(false)
    setToasty(
      {open: true,
      severity: 'success',
      text: 'Ad removed successfully'
    } 
    )
  }

  const handleError = () => {
    setToasty(
      {open: true,
      severity: 'error',
      text: 'Error removing Ad'
    } 
    )
    setAlertOpen(false)
  }

  return (

    <TemplateDefault>
      <AlertDialog open={alertOpen} onClose={handleCloseModal} action={handleRemoveProduct} title="Delete Product" description="Confirm deletion?"/>
      <Container maxWidth="sm" align="center">
        <Typography component="h1" variant="h2" align="center">
          My Adds
        </Typography>
        <MyLink href="/user/publish" passHref>
          <Button variant="contained" color="primary" sx={{margin: 2}}>Publish Add</Button>
        </MyLink>
      </Container>
      <MyContainer maxWidth="md" className={classes.card}>

      {

        products.length === 0 &&
        <Typography component="div" variant="body1" align="center" color="primary" gutterBottom>
          No Ad has been published yet.
        </Typography>

      }
      
        <Grid container spacing={2}>

            {

            products.map(product => {

              return (
                <Grid key={product._id} item xs={12} sm={6} md={3}>
                  <Card
                  title={product.title}
                  subtitle={formatCurrency(product.price, 'CA')}
                  image={`/uploads/${product.files[0].name}`}
                  actions={
                    <>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary">
                        Edit
                      </Button>
                      <Button
                        size="small"
                        variant="contained"
                        color="primary"
                        onClick={() => handleOpenModal(product._id)}>
                        Remove
                      </Button>
                    </>
                  }
                  />
              </Grid>
                )
            }
          )
            
          }
         
        </Grid>
      </MyContainer>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({req}) {
  try {
    console.log({req})
    const session = await getSession({ req })

    await dbConnect()
    const products = await ProductsModel.find({ 'userId': session.userId })
  
    return {
      props: {
        products: JSON.parse(JSON.stringify(products))
      }
    }
  }

  catch {
    return {
      props: {null: null}
    }
  }
}

export default Home