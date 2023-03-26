import React from 'react';
import './App.css';
import {AppHeader} from "./modules/layout/AppHeader";
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "./AppTheme";
import {Route, Routes} from "react-router-dom";
import {AllPostsPage} from "./modules/blogPosts/AllPostsPage";
import {SinglePostPage} from "./modules/blogPosts/SinglePostPage";
import {SnackbarProvider} from "notistack";
import {RecoilRoot} from "recoil";

function App() {
    return (
        <RecoilRoot>
            <ThemeProvider theme={darkTheme}>
                <SnackbarProvider/>
                <div className="App">
                    <AppHeader/>
                    <Routes>
                        <Route index element={<AllPostsPage/>}/>
                        <Route path="/posts/:id" element={<SinglePostPage/>}/>
                    </Routes>
                </div>
            </ThemeProvider>
        </RecoilRoot>
    )
}

export default App;
