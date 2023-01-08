import { 
  Button,
  Card,
  CardActions,
  CardContent, 
  CardMedia, 
  Container, 
  Grid, 
  Typography, 
  styled,
} from '@mui/material'

import Link from 'next/link'
import TemplateDefault from '../../src/templates/Default'

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
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card xs={12} sm={6} md={3}>
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
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card xs={12} sm={6} md={3}>
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
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card xs={12} sm={6} md={3}>
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
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card xs={12} sm={6} md={3}>
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
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card xs={12} sm={6} md={3}>
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
              <CardActions>
                <Button size="small" color="primary">
                  Edit
                </Button>
                <Button size="small" color="primary">
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>

        </Grid>
      </MyContainer>
    </TemplateDefault>
  )
}