import React from 'react';
import Container from '@material-ui/core/Container';
import {Row, Col} from 'reactstrap';
import './auth.css';
import Signup from './signup';
import Login from './login';
import logoPic from "../../src/Assets/theofficelogo.png";
import { Button } from 'antd';

type acceptedProps = {
    token: any;
    updateUserName: any;
    setUsername: any;
    updateUserRole: any;
}

type typeState ={
    showLogin: boolean,
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
            <div id="signuplogin">
                {this.state.showLogin ? 
                <Login updateToken={this.props.token} setUserName={this.props.updateUserName} updateUserRole={this.props.updateUserRole}
                /> :
                <Signup updateToken={this.props.token} setUserName={this.props.updateUserName} updateUserRole={this.props.updateUserRole}
                />
                }
                <br />
                <Button type="primary" id="toggle" onClick={(e) => this.loginToggle(e)}>
                    {this.state.showLogin ? 'Not a Mifflinite? Signup Here' : 'Already a Mifflinite? Login Here'}
                    </Button>
            </div>
            {/* <Row>
                <Col md="5" className="signin-col">
            <Signup updateToken={this.props.token} setUsername={this.props.updateUserName}/>
                </Col>
                <Col md="2">

                </Col>
                <Col md="5" className="login-col">
            <Login updateToken={this.props.token} setUsername={this.props.updateUserName}/>
                </Col>
            </Row> */}

            {/* <footer>
                <LiteCoin />
            </footer>*/}
            </Container> 
        )   
    }
}

export default Auth;