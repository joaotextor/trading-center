import {
    styled,
    Paper,
} from "@mui/material"

const SearchBox = styled(Paper)(({theme}) => ({
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(0.2),
    paddingLeft: 10,
    marginTop: 20,
}))

export {
    SearchBox
}