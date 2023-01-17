import {
    Alert,
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
import { useRouter } from 'next/router'
import { signIn, useSession } from 'next-auth/react'

import TemplateDefault from '../../../src/templates/Default'
import {
  validationSchema,
  initialValues
} from './formValues'
import useToasty from '../../../src/contexts/Toasty'
import { classes } from './styles'
import Image from 'next/image'

export default function Login() {

  const { setToasty } = useToasty()
  const router = useRouter()
  const { data: session, status } = useSession()

  console.log(session, status)

  const handleFormSubmit = async values => {
    const signInStatus = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
    })

    if (signInStatus.ok == false) {
        return router.push('/auth/signin?i=1')
    }

    router.push('/user/dashboard')
 }

const handleGoogleLogin = async () => {
    await signIn('google', {
        redirect: true,
        callbackUrl: '/user/dashboard'
    })
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

                <Box sx={classes.googleLoginButton}>
                    <Button
                        variant="contained"
                        color="primary"
                        fullWidth
                        startIcon={
                            <Image
                                src="/images/logo_google.svg"
                                alt="google"
                                width={20}
                                height={20}
                            />
                        }
                        onClick={handleGoogleLogin}
                    >Login with Google</Button>
                </Box>
                <Box sx={classes.orSeparator}>
                    <span>OR</span>
                </Box>
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
                                      {
                                        router.query.i == 1
                                        ? <Alert severity='error' sx={classes.errorMessage}>Incorrect e-mail or password!</Alert>
                                        : null
                                      }  
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
                                                  disabled={isSubmitting}
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