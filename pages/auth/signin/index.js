import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  Typography,
} from '@mui/material'

import { Formik } from 'formik'
import axios from 'axios'
import { useRouter } from 'next/router'

import TemplateDefault from '../../../src/templates/Default'
import {
  validationSchema,
  initialValues
} from './formValues'
import useToasty from '../../../src/contexts/Toasty'
import { classes } from './styles'

export default function Signin() {

  const { setToasty } = useToasty()
  const router = useRouter()

  const handleFormSubmit = async values => {
      const response = await axios.post('/api/users', values)

      if (response.data.success) {
          
      }
  }

  return (
      <TemplateDefault>
          <Container maxWidth="lg" component="main" sx={classes.container}>
              <Typography component="h1" variant="h2" align="center" color="primary">
                  Login to your account
              </Typography>
          </Container>
          <Container maxWidth="xs">  
              <Box sx={classes.box}>
                  <Formik
                      initialValues={initialValues}
                      validationSchema={validationSchema}
                      onSubmit={handleFormSubmit}
                  >
                      {
                          ({
                              touched,
                              values,
                              errors,
                              handleChange,
                              handleSubmit,
                              isSubmitting
                          }) => {
                              return (
                                  <form onSubmit={handleSubmit}>
                                      <FormControl fullWidth error={errors.email && touched.email} sx={classes.formControl}>
                                          <InputLabel sx={classes.inputLabel}>E-mail</InputLabel>
                                          <Input
                                              name="email"
                                              value={values.email}
                                              onChange={handleChange}
                                          />
                                          <FormHelperText>
                                              {errors.email && touched.email ? errors.email : null}
                                          </FormHelperText>
                                      </FormControl>

                                      <FormControl fullWidth error={errors.password && touched.password} sx={classes.formControl}>
                                          <InputLabel sx={classes.inputLabel}>Password</InputLabel>
                                          <Input
                                              type="password"
                                              name="password"
                                              value={values.password}
                                              onChange={handleChange}
                                          />
                                          <FormHelperText>
                                              {errors.password && touched.password ? errors.password : null}
                                          </FormHelperText>
                                      </FormControl>

                                      {
                                          isSubmitting
                                          ? (
                                              <CircularProgress sx={classes.loading}/>
                                          )
                                          : (
                                              <Button
                                                  type="submit"
                                                  fullWidth
                                                  variant="contained"
                                                  color="primary"
                                                  // disabled={isSubmitting}
                                                  sx={classes.submit}
                                              >
                                              Signin
                                              </Button> 
                                          )
                                      }

                                      
                                  </form>
                              )
                          }
                      }

                  </Formik>
              </Box>
          </Container>
      </TemplateDefault>
  )
}