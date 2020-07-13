import React from 'react';
import {
    Navbar, 
    NavbarBrand,
    Nav,
    NavItem, 
    Button
} from 'reactstrap';
import logoPic from "../../src/Assets/theofficelogo.png";
import {Route, Link, Switch } from 'react-router-dom';
import App from '../../App';



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
            <NavbarBrand id="NavbarBrand">>DM HOME</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {this.logoutBtn()}
                    </NavItem>
                </Nav>
        </Navbar>
    )
    }
}