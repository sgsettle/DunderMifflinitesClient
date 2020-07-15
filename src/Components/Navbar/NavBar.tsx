import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Litecoin from './Brad';
import Bored from './BoredAPI_Kate';
import { Button } from 'antd';
import logoPic from "../../Assets/theofficelogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import './NavBar.css';
import LiteCoin from './Brad';

type acceptedProps = {
    clearToken: any,
    protectedViews: any,
    protectedViewsTwo: any,
    protectedViewsThree: any
}

type valueTypes = {
    token: any,
    setToken: string | any,
    userName: string | any,
    setUserName: string | any,
    userRole: string | any,
}

export default class SiteBar extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps){
        super(props);
        this.state = {
            token: "",
            setToken: "",
            userName: "",
            setUserName: "",
            userRole: "",
        };
    }

    //path to home/feed    
    viewFeed = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <Link to='/'>
                <img id="brandlogohome" src={logoPic}/>
            </Link>
        )
    } 

    //path to user profile
    viewProfile = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <Button className='eachButton' size='small'>
                <Link to='/Profile'>Profile</Link>
            </Button>
        )

    }
  
    //path to admin page 
    adminPage = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <Button>
                <Link to="/Admin">Admin</Link>
            </Button>
        )
    }

    //user role authorization for admin button
    adminValidation = () => {
        return localStorage.getItem('userRole') === 'admin' ? (
            <Button>
                {this.adminPage()}
            </Button>
        ) : (
            ""
        )
    }

    logoutBtn() {
        return localStorage.getItem("token") === null ?
        (
            ""
        ) : (
            <AppBar position="static">
                <Toolbar className="classes.color">
                    {this.viewFeed()}
                </Toolbar>
                {this.viewProfile()}
                {this.adminValidation()}
                <Bored />
                <Litecoin />
                {/* if you want to do dropdown put it  here */}
                <Button
                className='eachButton'
                onClick={this.props.clearToken}
                id="navLog"
                size='large'
                >Logout
            </Button>
            </AppBar>

                
        )
    }

    // domRoutes = () => {
    //     return(
    //         <Switch>
    //             <Route exact path="/">{this.props.protectedViews()}</Route>
    //             <Route exact path="/Admin"/>
    //     <Route exact path="/Profile">{this.props.protectedViewsTwo()}</Route>
    //         </Switch>
    //     )
    // }

    render() {
    return (
        <div className="classes.root">
            {this.logoutBtn()}
            <Switch>
                <Route exact path="/">
                    {this.props.protectedViews()}
                </Route>
                <Route exact path="/Admin">
                    {this.props.protectedViewsThree()}
                </Route>
                <Route exact path="/Profile">
                    {this.props.protectedViewsTwo()}
                </Route>
            </Switch>
        </div>
    )
    }}
