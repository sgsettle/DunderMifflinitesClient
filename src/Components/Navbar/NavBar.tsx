import React from 'react';
import './NavBar.css';
// // import { Router } from 'react-dom';
// // import { Route, Link, Switch } from 'react-dom';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';

export default class NavBar extends React.Component< any, any >{
 render() {
     return(
         <div>
            <AppBar position="static" style={{backgroundColor: 'rgb(6, 45, 123)'}}>
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="Home">
                        <img></img>
                    </IconButton>
                </Toolbar>
            </AppBar>
        </div>
     )
 }
}