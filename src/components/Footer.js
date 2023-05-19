import { Box, Container, Grid, styled, Typography } from "@mui/material";
import Link from "next/link";


const MyContainer = styled(Container)(({theme}) => ({
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),

    //use theme.breakpoints.up so everything bigger than (up) the value inside will have the styles passed within the object
    [theme.breakpoints.up('sm')]: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    }
}))

const MyLink = styled(Link)(({theme}) => ({
    textDecoration: "none",
    color: theme.palette.primary.main,
}))

export default function Footer() {
    return (
        <MyContainer maxWidth="lg" component="footer">
            <Grid container spacing={3} align="center">
                <Grid item xs={6} sm={3}>
                    <Box>
                        <MyLink href="#">
                            <Typography color="textSecondary" variant="subtitle1">Help and Contact</Typography> 
                        </MyLink>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box>
                        <MyLink href="#">
                            <Typography color="textSecondary" variant="subtitle1">Safety Tips</Typography> 
                        </MyLink>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box>
                        <MyLink href="/user/publish">
                            <Typography color="textSecondary" variant="subtitle1">Advertise and Sell</Typography> 
                        </MyLink>
                    </Box>
                </Grid>
                <Grid item xs={6} sm={3}>
                    <Box>
                        <MyLink href="#">
                            <Typography color="textSecondary" variant="subtitle1">Professional Plan</Typography> 
                        </MyLink>
                    </Box>
                </Grid>
            </Grid>
        </MyContainer>
    )
}