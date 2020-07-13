import React from 'react';
import Container from '@material-ui/core/Container';
//import Row from '@material-ui/core/Row';
//import Col from '@material-ui/core/Col';
//import { FormGroup } from '@material-ui/core';
import {Row, Col} from 'reactstrap';
import './auth.css';
import Signup from './signup';
import Login from './login';
import LiteCoin from '../Components/Navbar/Brad';
import logoPic from "../../src/Assets/theofficelogo.png";
import { Button } from 'antd';

type acceptedProps = {
    token: any
    updateUserName: any
}

type typeState ={
    showLogin: boolean
}

class Auth extends React.Component<acceptedProps, typeState> {
    constructor(props: any){
        super(props);
        this.state = {   
            showLogin: false
        }
    }
    
    loginToggle = (event: any) => {
        event.preventDefault();
        if(this.state.showLogin === true){
            return this.setState({
                showLogin: false
            })
        }
        if(this.state.showLogin === false){
            return this.setState({
                showLogin: true
            })
        }
    }

    render(){
        return(
            <Container id="auth-container">
            <img id="dmlogo" src={logoPic} alt="logo" />
            <h3 id="welcomeSubheading">A site for fans of The Office</h3>
            <div className="signuplogin">
                {this.state.showLogin ? 
                <Login updateToken={this.props.token}/> :
                <Signup updateToken={this.props.token}/>
                }
                <Button type="primary" id="toggle" onClick={(e) => this.loginToggle(e)}>{this.state.showLogin ? 'Not a Mifflinite? Signup Here' : 'Already a Mifflinite? Login Here'}</Button>
            </div>
            {/* <Row>
                <Col md="5" className="signin-col">
            <Signup updateToken={this.props.token}/>
                </Col>
                <Col md="2">

                </Col>
                <Col md="5" className="login-col">
            <Login updateToken={this.props.token} />
                </Col>
            </Row> */}

            <footer>
                <LiteCoin />
            </footer>
            </Container>
        )   
    }
}

export default Auth;