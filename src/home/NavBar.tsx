import React, {Component} from 'react';
import {
    Navbar, 
    NavbarBrand,
    NavbarToggler,
    Collapse,
    Nav,
    NavItem, 
    Button
} from 'reactstrap';

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

    // clearToken = () => {
    //     localStorage.clear();
    //     this.setState({setToken: ""});
    //     this.setState({setUserName: ""});
    //     sessionStorage.clear();
    //   };

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
                >
                    Logout
                </Button>
        )
    }

    render() {
    return (
        <Navbar id="Navbar" light expand="md">
            <NavbarBrand href="/">Dunder Mifflinites</NavbarBrand>
                <Nav className="ml-auto" navbar>
                    <NavItem>
                        {this.logoutBtn()}
                    </NavItem>
                </Nav>
        </Navbar>
    )
    }
}