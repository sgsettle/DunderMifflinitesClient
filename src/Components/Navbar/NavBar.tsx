import React from 'react';
import { Route, Link, Switch } from 'react-router-dom';
import Jeopardy from './JeopardyAPI/Jeopardy';
import Bored from './BoredAPI/BoredAPI_Kate';
import { Button } from 'antd';
import logoPic from "../../Assets/theofficelogo.png";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
// import Button from "@material-ui/core/Button";
import './NavBar.css';
import Litecoin from './Brad';


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
            <Button className="NavButton" style={{width: '100px', marginTop: "3vh", marginLeft: "2vw" }} size='large'>
                <Link to='/Profile'>Profile</Link>
            </Button>
        )

    }
  
    //path to admin page 
    adminPage = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <Button className="NavButton" style={{width: '100px', marginTop: '14vh', marginLeft: '2vw'}} size='large'>
                <Link to="/Admin">Admin</Link>
            </Button>
        )
    }

    //user role authorization for admin button
    adminValidation = () => {
        return localStorage.getItem('userRole') === 'admin' ? (
                this.adminPage()
        ) : (
            ""
        )
    }

    logoutBtn() {
        return localStorage.getItem("token") === null ?
        (
            ""
        ) : (
            <AppBar id="NavBarBase" position="static">
                <Toolbar className="classes.color">
                    {this.viewFeed()}
                </Toolbar>
                {this.viewProfile()}
                {this.adminValidation()}
                <Bored />
                <Jeopardy />
                <Litecoin />
                {/* if you want to do dropdown put it  here */}
                <Button
                className="NavButton"
                style={{width: '100px', top: "-410px", marginLeft: "92%"}}
                onClick={this.props.clearToken}
                size='large'
                >Logout
            </Button>
            </AppBar>

                
        )
    }

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
