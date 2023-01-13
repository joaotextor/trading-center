import { Box, Button, Container, FormControl, FormHelperText, Input, InputLabel, Typography } from '@mui/material'



import { Formik } from 'formik'

import TemplateDefault from '../../../src/templates/Default'
import { classes } from './styles'

import { validationSchema, initialValues } from './formValues'

export default function Signup() {
    return (
        <TemplateDefault>
            <Container maxWidth="sm" component="main" sx={classes.container}>
                <Typography component="h1" variant="h2" align="center" color="primary">
                    Create your account
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="primary" gutterBottom>
                    And advertise to whole Canada
                </Typography>
            </Container>
            <Container maxWidth="md">  
                <Box sx={classes.box}>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={(values) => {
                            console.log('ok', values)
                        }}
                    >
                        {
                            ({
                                touched,
                                values,
                                errors,
                                handleChange,
                                handleSubmit
                            }) => {
                                return (
                                    <form onSubmit={handleSubmit}>
                                        <FormControl fullWidth error={errors.name && touched.name} sx={classes.formControl}>
                                            <InputLabel sx={classes.inputLabel}>Name</InputLabel>
                                            <Input
                                                name="name"
                                                value={values.name}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                {errors.name && touched.name ? errors.name : null}
                                            </FormHelperText>
                                        </FormControl>

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

                                        <FormControl fullWidth error={errors.confirmPassword && touched.confirmPassword} sx={classes.formControl}>
                                            <InputLabel sx={classes.inputLabel}>Confirm your Password</InputLabel>
                                            <Input
                                                type="password"
                                                name="confirmPassword"
                                                value={values.confirmPassword}
                                                onChange={handleChange}
                                            />
                                            <FormHelperText>
                                                {errors.confirmPassword && touched.confirmPassword ? errors.confirmPassword : null}
                                            </FormHelperText>
                                        </FormControl>

                                        <Button
                                            type="submit"
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            // disabled={isSubmitting}
                                            sx={classes.submit}
                                        >
                                            Signup
                                        </Button>
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