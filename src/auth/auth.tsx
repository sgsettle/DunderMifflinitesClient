import React, { Props } from 'react';
import Container from '@material-ui/core/Container';
//import Row from '@material-ui/core/Row';
//import Col from '@material-ui/core/Col';
//import { FormGroup } from '@material-ui/core';
import {Row, Col} from 'reactstrap';
import './auth.css';
import Signup from './signup';
import Login from './login';

class Auth extends React.Component {
    constructor(props: any){
        super(props)
    }

    render(){
        return(
            <Container className="auth-container">
            <h1 id="welcomeHeading">Dunder Mifflinites</h1>
            <div id="imageslogo">
            </div>
            <h3 id="welcomeSubheading">A site for fans of The Ofice</h3>
            <Row>
                <Col md="5" className="signin-col">
                <Signup updateToken={props.updateToken} />
                </Col>
                <Col md="2">

                </Col>
                <Col md="5" className="login-col">
                <Login updateToken={this.props.token} />
                </Col>
            </Row>
        </Container>
        )   
    }
}

export default Auth;