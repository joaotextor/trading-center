import {
    Card as CardMUI,
    Button,
    CardActions,
    CardContent,
    CardMedia,
    Typography 
} from "@mui/material";


export default function Card({ image, title, subtitle, actions }) {
    return (
        <CardMUI>
            <CardMedia 
            sx={{padding: "30%"}}
            image={image}
            />
            <CardContent>
                <Typography component="h2" variant="h5">
                    {title}
                </Typography>
                <Typography component="h2" variant="h6" fontSize={16}>
                {subtitle}
                </Typography>
            </CardContent>
            {
            actions
            ? (
                <CardActions>
                    {actions}
                </CardActions>
                )
                : null
            } 
        </CardMUI>
    )
}