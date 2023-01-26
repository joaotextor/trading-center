import { Formik } from 'formik'
import { useRouter } from 'next/router'
import { getSession } from 'next-auth/react'

import {
    Typography,
    Box,
    Select,
    Button,
    FormControl,
    InputLabel,
    InputAdornment,
    MenuItem,
    FormHelperText,
    Input,
    CircularProgress,
} from '@mui/material'
import { Container } from '@mui/material'
import TemplateDefault from '../../../src/templates/Default'

import ProductsModel from '../../../src/models/products'
import { validationSchema } from './formValues'
import useToasty from '../../../src/contexts/Toasty'
import formatCurrency from '../../../src/utils/formatCurrency'

import {
    classes,
    MyContainer,
} from './styles'

import FileUpload from '../../../src/components/FileUpload'
import axios from 'axios'
import dbConnect from '../../../src/utils/dbConnect'


const Publish = ({ product }) => {
    
    const { setToasty } = useToasty()
    const router = useRouter()

    const formValues = {
        productId: `${product._id}`,
        title: `${product.title}`,
        category: `${product.category}`,
        description: `${product.description}`,
        price: `${formatCurrency(product.price, '')}`,
        contactName: `${product.contactName}`,
        contactEmail: `${product.contactEmail}`,
        contactPhone: `${product.contactPhone}`,
        files: product.files,
        location: `${product.location}`,
        filesToRemove: [],
    }

    const handleSuccess = () => {
        setToasty({
            open: true,
            text: 'Advertisement edited successfully',
            severity: 'success'
        })
        
        router.push('/user/dashboard')
    }

    const handleError = () => {
        setToasty({
            open: true,
            text: 'A problem occurred! Please, try again.',
            severity: 'error'
        })
    }

    const handleFormSubmit = async (values) => {
        //JS method to send form values to the server
        const formData = new FormData()

        for(let field in values) {
            if (field === 'files') {
                values.files.forEach(file => {
                    formData.append('files', file)
                })
            } else {
                formData.append(field, values[field])
            }
        }

        await axios.put('/api/products/put/', formData)
            .then(handleSuccess)
            .catch(handleError)
    }

    return (
        <TemplateDefault>
            <Formik
                initialValues={formValues}
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
                        setFieldValue,
                        isSubmitting
                    }) => {

                        

                        return (
                            <form onSubmit={handleSubmit}>

                                <Input
                                    type="hidden"
                                    value={product._id}
                                    name="productId"
                                />

                                <Input
                                    type="hidden"
                                    value={values.filesToRemove}
                                    name="filesToRemove"
                                />

                                <Container className={classes.container} maxWidth="sm">
                                    <Typography component="h1" variant="h2" align="center" color="primary">
                                        Publish new Ad
                                    </Typography>
                                    <Typography component="h5" variant="h5" align="center" color="primary">
                                        The more detailed the better!
                                    </Typography>
                                </Container>
            
                            <MyContainer maxWidth="md">
                                <Box className={classes.box}>
                                    <FormControl
                                        error={errors.title && touched.title}
                                        fullWidth
                                    >
                                        <InputLabel sx={classes.inputLabel}>Ad Title</InputLabel>
                                        <Input
                                            name="title"
                                            variant="standard"
                                            value={values.title}
                                            onChange={handleChange}
                                        />
                                                                                                                                  <FormHelperText sx={classes.helperText}>
                                            {errors.title && touched.title ? errors.title : null}
                                        </FormHelperText>

                                    </FormControl>
                                    <br /><br />
                                    <FormControl
                                        error={errors.category && touched.category}
                                        fullWidth
                                        >
                                        <InputLabel sx={classes.inputLabel}>Category</InputLabel>
                                        <Select
                                            name="category"
                                            value={values.category}
                                            fullWidth
                                            onChange={handleChange}
                                            variant="standard"
                                        >
                                            <MenuItem value="Babies and Children">Babies and Children</MenuItem>
                                            <MenuItem value="Agriculture">Agriculture</MenuItem>
                                            <MenuItem value="Fashion">Fashion</MenuItem>
                                            <MenuItem value="Cars, Motorcycles and Boats">Cars, Motorcycles and Boats</MenuItem>
                                            <MenuItem value="Services">Services</MenuItem>
                                            <MenuItem value="Recreation">Recreation</MenuItem>
                                            <MenuItem value="Animals">Animals</MenuItem>
                                            <MenuItem value="Furniture, Home and Garden">Furniture, Home and Garden</MenuItem>
                                            <MenuItem value="Real Estate">Real Estate</MenuItem>
                                            <MenuItem value="Equipments and Tools">Equipments and Tools</MenuItem>
                                            <MenuItem value="Smartphones and Tablets">Smartphones and Tablets</MenuItem>
                                            <MenuItem value="Sport">Sport</MenuItem>
                                            <MenuItem value="Technology">Technology</MenuItem>
                                            <MenuItem value="Jobs">Jobs</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Select>
                                        <FormHelperText  sx={classes.helperText}>
                                            {errors.category && touched.category ? errors.category : null}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <FileUpload
                                        files={values.files}
                                        filesToRemove={values.filesToRemove}
                                        errors={errors.files}
                                        touched={touched.files}
                                        setFieldValue={setFieldValue}
                                    />
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <FormControl
                                        error={errors.description && touched.description}
                                        fullWidth
                                    >
                                        <InputLabel sx={classes.inputLabel}>Write the details of what you are selling.
                                        </InputLabel>
                                        <Input className={classes.detailsField}
                                        multiline
                                        name="description"
                                        onChange={handleChange}
                                        value={values.description}
                                        rows={6}
                                        variant="outlined"
                                        />
                                        <FormHelperText sx={classes.helperText}>
                                            {errors.description && touched.description ? errors.description : null}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <FormControl
                                        variant="standard"
                                        fullWidth
                                        error={errors.price && touched.price}
                                    >
                                        <InputLabel variant="outlined"  sx={classes.inputLabel}>Price</InputLabel>
                                        <Input 
                                            name="price"
                                            label="Value" //without this prop, the outline will be above the InputLabel's value (Value). Another approch would set the InputLabel's background to white, but this wont add a space before and after the label (like an inline margin), making it look weird.
                                            value={values.price}
                                            onChange={handleChange}
                                            startAdornment={<InputAdornment position="start">C$</InputAdornment>}
                                        />
                                        <FormHelperText  sx={classes.helperText}>
                                            {errors.price && touched.price ? errors.price : null}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="primary" gutterBottom>
                                            Contact Info
                                    </Typography>
                                    <FormControl error={errors.contactName && touched.contactName} fullWidth>
                                        <InputLabel sx={classes.inputLabel}>Contact Name</InputLabel>
                                        <Input
                                            name="contactName"
                                            value={values.contactName}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText  sx={classes.helperText}>
                                            {errors.contactName && touched.contactName ? errors.contactName : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br />
                                    <FormControl error={errors.contactEmail && touched.contactEmail} fullWidth>
                                        <InputLabel sx={classes.inputLabel}>Email</InputLabel>
                                        <Input
                                            name="contactEmail"
                                            value={values.contactEmail}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText  sx={classes.helperText}>
                                            {errors.contactEmail && touched.contactEmail ? errors.contactEmail : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br />
                                    <FormControl error={errors.contactPhone && touched.contactPhone} fullWidth>
                                        <InputLabel sx={classes.inputLabel}>Phone</InputLabel>
                                        <Input
                                            name="contactPhone"
                                            value={values.contactPhone}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText sx={classes.helperText}>
                                            {errors.contactPhone && touched.contactPhone ? errors.contactPhone : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br />
                                    <FormControl error={errors.location && touched.location} fullWidth>
                                        <InputLabel sx={classes.inputLabel}>Location</InputLabel>
                                        <Input
                                            name="location"
                                            value={values.location}
                                            onChange={handleChange}
                                        />
                                        <FormHelperText sx={classes.helperText}>
                                            {errors.location && touched.location ? errors.location : null}
                                        </FormHelperText>
                                    </FormControl>
                                    <br /><br />
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box display="flex" justifyContent="right"> 

                                {
                                    isSubmitting
                                        ? <CircularProgress sx={classes.loading}/>
                                        : <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >Publish Ad</Button>
                                }
                                    
                                </Box>
                            </MyContainer>
                        </form>
                        )
                    }
                }
            </Formik>


        </TemplateDefault>
    )
}

Publish.requireAuth = true

export async function getServerSideProps({query}) {
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

export default Publish