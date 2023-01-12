
import { DeleteForever, LocalConvenienceStoreOutlined } from '@mui/icons-material'
import {
    styled,
    Typography,
    Box,
    Select,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    InputAdornment,
    MenuItem,
    FormHelperText,
    Input,
} from '@mui/material'
import { Container } from '@mui/material'

import { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { Formik, FormikConsumer } from 'formik'
import * as yup from 'yup'

import TemplateDefault from '../../src/templates/Default'

const PREFIX = 'Publish'

const classes = {
    container: `${PREFIX}-container`,
    box: `${PREFIX}-box`,
    detailsField: `${PREFIX}-details-field`,
    dropZone: `${PREFIX}-dropZone`,
    thumbImage: `${PREFIX}-thumb-image`,
    thumbMask: `${PREFIX}-thumb-mask`,
    labelMainImage: `${PREFIX}-label-main-image`,
    inputLabel: {
        fontWeight: 400,
        marginLeft: -1.5,
    },
    helperText: {
        marginLeft: 0,
    }
}

const MyContainer = styled(Container)(({theme}) => ({
    marginTop: 30,
    [`& .${classes.box}`]: {
        padding: 20,
        backgroundColor: theme.palette.background.white,
        boxShadow: '5px 5px 15px grey'
    },

    [`& .${classes.detailsField}`]: {
        marginTop: 10,
    },
}))

const ThumbBox = styled(Box)(({theme})=> ({
        position: 'relative',
        display: 'flex',
        border: '2px solid black',
        padding: 10,
        margin: '0 15px 15px 0',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        width: 200,
        height: 150,

        [`&.${classes.dropZone}`]: {
            border: '2px dashed black',
            backgroundColor: theme.palette.background.default,
        },

        [`&.${classes.thumbImage}`]: {
            padding: 0,
            border: 0,
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
        },

        [`& .${classes.thumbMask}`]: {
            display: 'none',
            width: '100%',
            height: '100%',
            margin: 0,
            border: 0,
            backgroundColor: theme.palette.background.blackTransparent
        },

        [`&.${classes.thumbImage}:hover .${classes.thumbMask}`]: {
            display: 'flex'
        },

        [`& .${classes.labelMainImage}`]: {
            color: 'white',
            margin: 0,
            border: 0,
            borderRadius: '5px',
            width: 'fit-content',
            height: '20px',
            backgroundColor: 'blue',
            padding: '6px 10px',
            position: 'absolute',
            bottom: 0,
            left: 0,
        },
}))

const validationSchema = yup.object().shape({
    title: yup.string()
        .min(6, 'Write a longer title')
        .max(100, 'Title too large')
        .required('Mandatory field'),
    category: yup.string().required('Mandatory field'),
    description: yup.string()
        .min(50, "Write a description with at least 50 characters")
        .required('Mandatory field'),
    price: yup.number()
        .required("Mandatory field"),
    contactName: yup.string().required('Mandatory field'),
    contactEmail: yup.string()
        .email('Insert a valid email address')
        .required('Mandatory field'),
    contactPhone: yup.number('Phone must contain only numbers.').required('Mandatory field'),
    files: yup.array()
        .min(1, "Submit at least one image")
        .required('Mandatory field'),
})

export default function Publish() {

    return (
        <TemplateDefault>
            <Formik
                initialValues={{
                    title: '',
                    category: '',
                    description: '',
                    price: '',
                    contactName: '',
                    contactEmail: '',
                    contactPhone: '',
                    files: [],
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Sent', values)
                }}
            >
                {
                    ({
                        touched,
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                        setFieldValue,
                    }) => {

                        const { getRootProps, getInputProps } = useDropzone({
                            accept: 'image/*',
                            onDrop: (acceptedFile) => {
                                const newFiles = acceptedFile.map(file => {
                                    return Object.assign(file, {
                                        preview: URL.createObjectURL(file)
                                    })
                                    // Equivalent to:
                                    // const object = {
                                    //     ...file,
                                    //     preview: URL.createObjectURL(file)
                                    // }
                                    // return object
                                })
                    
                                setFieldValue('files',[
                                    ...values.files,
                                    ...newFiles
                                ])
                            }
                        })
                    
                        const handleRemoveFile = fileName => {
                            const newFileState = values.files.filter(file => file.name !== fileName )
                    
                            setFieldValue('files', newFileState)
                        }

                        return (
                            <form onSubmit={handleSubmit}>
                            
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
                                    <Typography component="h6" variant="h6" color={errors.files && touched.files ? 'error' : 'primary'}>
                                            Images
                                    </Typography>
                                    <Typography component="div" variant="body2" color={errors.files && touched.files ? 'error' : 'primary'}>
                                            The first image will be your ad&apos;s cover picture.
                                    </Typography>
                                    {
                                        errors.files && touched.files
                                        ? <Typography variant="body2" color="error" gutterBottom>{errors.files}</Typography>
                                        : null
                                    }
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        marginTop: '10px',
                                        }}>
                                        <ThumbBox className={classes.dropZone} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Typography color={errors.files ? 'error' : 'primary'}>
                                                Click to select or drag image here
                                            </Typography>
                                        </ThumbBox>
                
                                        {
                                            values.files.map((file, index) => (
                                                <ThumbBox 
                                                key={`${file.name}-${index}`}
                                                className={classes.thumbImage} 
                                                sx={{
                                                    backgroundImage: `url(${file.preview})`,
                                                    backgroundPosition: 'center'
                                                }}>
                                                    <ThumbBox className={classes.thumbMask}>
                                                        <IconButton color="secondary" onClick={() => handleRemoveFile(file.name)}>
                                                            <DeleteForever fontSize="large"/>    
                                                        </IconButton>   
                                                    </ThumbBox>
                
                                                    {
                                                        index === 0 ?
                                                        <ThumbBox className={classes.labelMainImage}>
                                                            <Typography>
                                                                Main
                                                            </Typography>
                                                        </ThumbBox>
                                                        : null
                                                    }
                                                    
                                                </ThumbBox>
                                            )
                                            )
                                        }
                
                                    </Box>
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
                                            onChange={handleChange}
                                            startAdornment={<InputAdornment position="start">CAD$</InputAdornment>}
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
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box textAlign="right">
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >Publish Ad</Button>
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