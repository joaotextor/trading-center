
import { DeleteForever, LocalConvenienceStoreOutlined } from '@mui/icons-material'
import {
    styled,
    Typography,
    Box,
    TextField,
    Select,
    Button,
    IconButton,
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    MenuItem,
    FormHelperText,
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
     category: yup.string().required('Mandatory field')
})

export default function Publish() {

    const [files, setFiles] = useState([])

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

            setFiles([
                ...files,
                ...newFiles
            ])
        }
    })

    const handleRemoveFile = fileName => {
        const newFileState = files.filter(file => file.name !== fileName )

        setFiles(newFileState)
    }
    
    return (
        <TemplateDefault>
            <Formik
                initialValues={{
                    title: '',
                    category: '',
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => {
                    console.log('Sent', values)
                }}
            >
                {
                    ({
                        values,
                        errors,
                        handleChange,
                        handleSubmit,
                    }) => {
                        console.log(errors)
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
                                    <Typography component="h6" variant="h6" color="primary">
                                        Ad Title
                                    </Typography>
                                    <TextField
                                        name="title"
                                        variant="standard"
                                        value={values.title}
                                        onChange={handleChange}
                                        label="ex.: bike rim 18 with warranty"
                                        fullWidth
                                        error={errors.title}
                                        helperText={errors.title}

                                    />
                                    <br /><br />
                                    <Typography component="h6" variant="h6" color="primary">
                                        Gategory
                                    </Typography>
                                    <FormControl
                                        error={errors.category}
                                        fullWidth>
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
                                        <FormHelperText>
                                            {errors.category}
                                        </FormHelperText>
                                    </FormControl>
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="primary">
                                            Images
                                    </Typography>
                                    <Typography component="div" variant="body2" color="primary">
                                            The first image will be your ad&apos;s cover picture.
                                    </Typography>
                                    <Box sx={{
                                        display: 'flex',
                                        flexWrap: 'wrap',
                                        marginTop: '10px',
                                        }}>
                                        <ThumbBox className={classes.dropZone} {...getRootProps()}>
                                            <input {...getInputProps()} />
                                            <Typography>
                                                Click to select or drag image here
                                            </Typography>
                                        </ThumbBox>
                
                                        {
                                            files.map((file, index) => (
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
                                    <Typography component="h6" variant="h6" color="primary">
                                            Description
                                    </Typography>
                                    <Typography component="div" variant="body2" color="primary">
                                            Write the details of what you are selling.
                                    </Typography>
                                    <TextField className={classes.detailsField}
                                        multiline
                                        rows={6}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="primary" gutterBottom>
                                            Price
                                    </Typography>
                                    <FormControl
                                        variant="outlined"
                                        fullWidth
                                    >
                                        <InputLabel variant="outlined">Value</InputLabel>
                                        <OutlinedInput 
                                            label="Value" //without this prop, the outline will be above the InputLabel's value (Value). Another approch would set the InputLabel's background to white, but this wont add a space before and after the label (like an inline margin), making it look weird.
                                            onChange={() => {}}
                                            startAdornment={<InputAdornment position="start">US$</InputAdornment>}
                                        />
                                    </FormControl>
                                </Box>
                            </MyContainer>
            
                            <MyContainer className={classes.container} maxWidth="md">
                                <Box className={classes.box}>
                                    <Typography component="h6" variant="h6" color="primary" gutterBottom>
                                            Contact Info
                                    </Typography>
                                    <TextField
                                        label="Contact Name"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                    <br /><br />
                                    <TextField
                                        label="E-mail"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
                                    <br /><br />
                                    <TextField
                                        label="Phone"
                                        variant="outlined"
                                        size="small"
                                        fullWidth
                                    />
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