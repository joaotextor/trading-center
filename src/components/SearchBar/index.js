import { useState } from 'react'
import {useRouter} from 'next/router'

import { IconButton, InputBase } from "@mui/material"
import { SearchBox } from "./styles"
import SearchIcon from '@mui/icons-material/Search'

import AlertDialog from '../AlertDialog'

export default function SearchBar() {

    const route = useRouter()
    const [search, setSearch] = useState()
    const [alertOpen, setAlertOpen] = useState(false)
    

    const handleSubmitSearch = () => {
        if (search == undefined) {
            return setAlertOpen(true)
        }
        route.push(`/search/${search}`)
    }

    return (
        <>
            <AlertDialog open={alertOpen} onClose={() => setAlertOpen(false)} title="Search query empty" description="Please enter something to search!" firstBtnText="OK"/>
            <SearchBox>
                <InputBase
                    error={true}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            handleSubmitSearch()
                        }
                    }}
                    placeholder="Ex.: iPhone 13 with warranty"
                    fullWidth
                />
                <IconButton onClick={handleSubmitSearch}>
                    <SearchIcon />
                </IconButton>
            </SearchBox>
        </>
    )
}