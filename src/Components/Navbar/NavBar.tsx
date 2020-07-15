import React from 'react';
import { HashRouter, Route, NavLink, Switch } from 'react-router-dom';
// import Feed from '../Feed/FeedIndex';
// import Profile from '../UserProfile/ProfileIndex';
import Litecoin from './Brad';
import Bored from './BoredAPI_Kate';

import {
    Navbar, 
    NavbarBrand,
    Nav
} from 'reactstrap';
import { Button, Tooltip } from 'antd';
import logoPic from "../../Assets/theofficelogo.png";

import './NavBar.css';



type valueTypes = {
    token: any,
    setToken: string | any,
    userName: string | any,
    setUserName: string | any,
}

type acceptedProps = {
    clearToken: any
}

export default class SiteBar extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps){
        super(props);
        this.state = {
            token: "",
            setToken: "",
            userName: "",
            setUserName: ""
        };
    }

    //path to auth/login page
    // viewAdmin = () => {

        // }

    //path to home/feed    
    viewFeed = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <NavLink to='/'>
                <img id="brandlogohome" src={logoPic}/>
            </NavLink>
        )
    } 

    //path to user profile
    viewProfile = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <Button className='eachButton' size='large'>
                <NavLink to='/Profile'>Profile</NavLink>
            </Button>
        )

    }
  
    //path to admin page 
    adminPage = () => {
        return localStorage.getItem('token') === null ? (
            ""
        ) : (
            <Button>
                <NavLink to="/Admin">Admin</NavLink>
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
            <Button
                className='eachButton'
                onClick={this.props.clearToken}
                id="navLog"
                size='large'
                >Logout
                    {/* <Link to="/">Logout</Link>
                    <Switch>
                         <Route exact path="/"><App/></Route>
                    </Switch> */}
            </Button>

                
        )
    }

    domRoutes = () => {
        return(
            <Switch>
                <Route exact path="/"/>
                <Route exact path="/Admin"/>
                <Route exact path="/Profile"/>
            </Switch>
        )
    }

    render() {
    return (
        <HashRouter>
            <Navbar id="Navbar" light expand="md" >
                <NavbarBrand id="NavbarBrand" >
                        {this.viewFeed()}
                </NavbarBrand>
                    <Nav id='navButtons' navbar>
                        {this.adminValidation()}
                        {this.viewProfile()}    
                        <Bored />        
                        <Tooltip title='Jeopardy'>
                            <Button className='eachButton' shape="circle" size='large'>
                            J
                            </Button>
                        </Tooltip>    
                        <Litecoin />    
                        {this.logoutBtn()}
                    </Nav> 
                    {this.domRoutes()}   
            </Navbar>
        </HashRouter>
    )
    }
}
