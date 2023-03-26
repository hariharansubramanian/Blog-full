import React from 'react';
import './App.css';
import {AppHeader} from "./modules/layout/AppHeader";
import {ThemeProvider} from "@mui/material";
import {darkTheme} from "./AppTheme";

function App() {
    return (
        <ThemeProvider theme={darkTheme}>
            <div className="App">
                <AppHeader/>
            </div>
        </ThemeProvider>
    )
}

export default App;
