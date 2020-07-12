import React, { Props } from 'react';
import Container from '@material-ui/core/Container';
//import Row from '@material-ui/core/Row';
//import Col from '@material-ui/core/Col';
//import { FormGroup } from '@material-ui/core';
import {Row, Col} from 'reactstrap';
import './auth.css';
import Signup from './signup';
import Login from './login';
import LiteCoin from '../home/Brad';
import logoPic from "../../src/Assets/theofficelogo.png";

type acceptedProps = {
    token: any
    updateUserName: any
}

class Auth extends React.Component<acceptedProps> {
    constructor(props: any){
        super(props);
        this.state = {   
        }
    }

    render(){
        return(
            <Container className="auth-container">
            <img id="dmlogo" src={logoPic} alt="logo" />
            <h1 id="welcomeHeading"></h1>
            <div id="imageslogo">
            </div>
            <h3 id="welcomeSubheading">A site for fans of The Office</h3>
            <Row>
                <Col md="5" className="signin-col">
            <Signup updateToken={this.props.token}/>
                </Col>
                <Col md="2">

                </Col>
                <Col md="5" className="login-col">
            <Login updateToken={this.props.token} />
                </Col>
            </Row>
            <footer>
                <LiteCoin />
            </footer>
            
        </Container>
        
        )   
    }
}

export default Auth;