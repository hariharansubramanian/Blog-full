import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";
import {AccountCircle, LibraryBooks} from "@mui/icons-material";
import {useRecoilValue} from "recoil";
import {UserIpAddressAtom} from "../blogPosts/state/userIpAddressAtom";
import {Link} from "react-router-dom";

export function AppHeader() {
    const userIpAddress = useRecoilValue(UserIpAddressAtom)
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static" color={'default'}>
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    <Link to={'/'} style={{textDecoration: 'none'}} color={'white'}>
                        <Button color="inherit" startIcon={<LibraryBooks/>}>Home</Button>
                    </Link>
                </Typography>
                <IconButton color="inherit">
                    <AccountCircle/>
                </IconButton>
                <Typography variant="body1">
                    {userIpAddress}
                </Typography>
            </Toolbar>

        </AppBar>
    </Box>;
}