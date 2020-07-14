import React from 'react';
import {
    Navbar, 
    NavbarBrand,
    Nav,
} from 'reactstrap';
import logoPic from "../../Assets/theofficelogo.png";
import { Button, Tooltip } from 'antd';
import './NavBar.css';
import LiteCoin from './Brad';



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
                className='eachButton'
                onClick={this.props.clearToken}
                color="inherit"
                id="navLog"
                size='large'
                >
                    Logout
            </Button>

                
        )
    }

    render() {
        return (
            
                <Navbar id="Navbar" light expand="md" >
                    <NavbarBrand id="NavbarBrand" href="/">
                        
                        <img id="brandlogohome" src={logoPic}/>
                        
                    </NavbarBrand>
                        <Nav id='navButtons' navbar>
                                <Button className='eachButton' size='large'>
                                    Profile
                                </Button>
                                <Tooltip title='Bored?'>
                                    <Button className='eachButton' shape="circle" size="large">
                                    B
                                    </Button>
                                </Tooltip>
                                <Tooltip title='Jeopardy'>
                                    <Button className='eachButton' shape="circle" size='large'>
                                    J
                                    </Button>
                                </Tooltip>
                                    <LiteCoin />
                                {this.logoutBtn()}
                        </Nav>
                </Navbar>
            
        )
        }
    }
