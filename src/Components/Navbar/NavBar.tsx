import React from 'react';
import {
    Navbar, 
    NavbarBrand,
    Nav,
    NavItem, 
    Button
} from 'reactstrap';
import logoPic from "../../Assets/theofficelogo.png";
//import {Route, Link, Switch } from 'react-router-dom';
//import Auth from '../../auth/auth';
import App from '../../App';
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

    logoutBtn() {
        return localStorage.getItem("token") === null ?
        (
            ""
        ) : (
            <Button
                onClick={this.props.clearToken}
                color="inherit"
                id="navLog"
                style={{ marginLeft: "90vw"}}
                >Logout
                    {/* <Link to="/">Logout</Link>
                    <Switch>
                         <Route exact path="/"><App/></Route>
                    </Switch> */}
            </Button>

                
        )
    }

    render() {
    return (
        <Navbar id="Navbar" light expand="md">
            <NavbarBrand id="NavbarBrand" href="/">
                <img id="brandlogohome"src={logoPic}></img>
            </NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {this.logoutBtn()}
                    </NavItem>
                </Nav>
        </Navbar>
    )
    }

