import { 
  Button, 
  Container, 
  Grid, 
  Typography, 
  styled,
} from '@mui/material'

import Link from 'next/link'
import TemplateDefault from '../../src/templates/Default'

import Card from '../../src/components/Card'

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

export default function Home() {
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
          <Grid item xs={12} sm={6} md={3}>
            <Card
            title="PRODUTO"
            subtitle="R$ 88,90"
            image="https://source.unsplash.com/random"
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

          <Grid item xs={12} sm={6} md={3}>
            <Card
            title="PRODUTO"
            subtitle="R$ 88,90"
            image="https://source.unsplash.com/random"
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

          <Grid item xs={12} sm={6} md={3}>
            <Card
            title="PRODUTO"
            subtitle="R$ 88,90"
            image="https://source.unsplash.com/random"
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

          <Grid item xs={12} sm={6} md={3}>
            <Card
            title="PRODUTO"
            subtitle="R$ 88,90"
            image="https://source.unsplash.com/random"
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

          <Grid item xs={12} sm={6} md={3}>
            <Card
            title="PRODUTO"
            subtitle="R$ 88,90"
            image="https://source.unsplash.com/random"
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
        </Grid>
      </MyContainer>
    </TemplateDefault>
  )
}