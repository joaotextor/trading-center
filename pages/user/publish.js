
import { styled, Typography, Box, TextField, Select, Button } from '@mui/material'
import { Container } from '@mui/system'
import TemplateDefault from '../../src/templates/Default'

const PREFIX = 'Publish'

const classes = {
    container: `${PREFIX}-container`,
    box: `${PREFIX}-box`,
    detailsField: `${PREFIX}-details-field`,
}

const MyContainer = styled(Container)(({theme}) => ({
    [`&.${classes.container}`]: {
        padding: 20,
    },

    [`& .${classes.box}`]: {
        padding: 20,
        backgroundColor: theme.palette.background.white,
        boxShadow: '5px 5px 15px grey'
    },

    [`& .${classes.detailsField}`]: {
        marginTop: 10,
    }
}))

export default function Publish() {
    
    return (
        <TemplateDefault>
            <MyContainer className={classes.container} maxWidth="sm">
                <Typography component="h1" variant="h2" align="center" color="textPrimary">
                    Publish new Ad
                </Typography>
                <Typography component="h5" variant="h5" align="center" color="textPrimary">
                    The more detailed the better!
                </Typography>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                        Ad Title
                    </Typography>
                    <TextField
                        label="ex.: bike rim 18 with warranty"
                        fullWidth
                    />
                    <br /><br />
                    <Typography component="h6" variant="h6" color="textPrimary">
                        Gategory
                    </Typography>
                    <Select
                        native
                        value=""
                        fullWidth
                        onChange={() => {}}
                        inputProps={{
                            name: 'age,'
                        }}
                    >
                        <option value="">Select</option>
                        <option value={1}>Babies and Children</option>
                        <option value={2}>Agriculture</option>
                        <option value={3}>Fashion</option>
                        <option value={3}>Cars, Motorcycles and Boats</option>
                        <option value={3}>Services</option>
                        <option value={3}>Recreation</option>
                        <option value={3}>Animals</option>
                        <option value={3}>Furniture, Home and Garden</option>
                        <option value={3}>Real Estate</option>
                        <option value={3}>Equipments and Tools</option>
                        <option value={3}>Smartphones and Tablets</option>
                        <option value={3}>Sport</option>
                        <option value={3}>Technology</option>
                        <option value={3}>Jobs</option>
                        <option value={3}>Other</option>
                    </Select>
                </Box>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                            Images
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
                            The first image will be your ad&apos;s cover picture.
                    </Typography>
                </Box>
            </MyContainer>

            <MyContainer className={classes.container} maxWidth="md">
                <Box className={classes.box}>
                    <Typography component="h6" variant="h6" color="textPrimary">
                            Description
                    </Typography>
                    <Typography component="div" variant="body2" color="textPrimary">
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
                    <Typography component="h6" variant="h6" color="textPrimary" gutterBottom>
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
                    >Publish Ad</Button>
                </Box>
            </MyContainer>
        </TemplateDefault>
    )
}