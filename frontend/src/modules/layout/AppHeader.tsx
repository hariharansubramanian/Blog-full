import {AppBar, Box, Button, IconButton, Toolbar, Typography} from "@mui/material";
import React from "react";
import {AccountCircle, LibraryBooks} from "@mui/icons-material";
import {useRecoilValue} from "recoil";
import {UserIpAddressAtom} from "../blogPosts/state/userIpAddressAtom";

export function AppHeader() {
    const userIpAddress = useRecoilValue(UserIpAddressAtom)
    console.log(userIpAddress)
    return <Box sx={{flexGrow: 1}}>
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{flexGrow: 1}}>
                    <Button color="inherit" startIcon={<LibraryBooks/>}>Home</Button>
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