import * as React from 'react';
//import Form from '@material-ui/core/';
//import FormGroup from '@material-ui/core/FormGroup';
//import Label from '@material-ui/core';
//import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import './login.css';
import {Form, FormGroup, Input, Label} from 'reactstrap';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import './login.css';
import './auth.css';
import APIURL from '../Helpers/environment';


type valueTypes = {
    userName: string,
    setUserName: string,
    password: string,
    setPassword: string,
};

type acceptedProps = {
    updateToken: any
    setUserName: any
    updateUserRole: any
};

class Login extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps){
        super(props);
        this.state = {
            userName: "",
            setUserName: "",
            password: "",
            setPassword: ""
        }
    }
    
    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch(`${APIURL}/user/login`, {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.userName,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken);
            this.props.setUserName(data.user.userName);
            this.props.updateUserRole(data.user.userRole);
        });
    };
render() {
    return (
    <div id='loginDiv'>
        <h1 id="loginHeading">Login</h1>
        <Form className="loginForm" onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label id='loginLabel' htmlFor="username">Username:  </Label>
                <Input id='loginInput' onChange={(e) => this.setState({userName: e.target.value})} 
                name="username" type='text'/>
            </FormGroup>
            <FormGroup>
                <Label id='loginLabel' htmlFor="password">Password:  </Label>
                <Input id='loginInput' onChange={(e) => this.setState({password: e.target.value})} 
                name="password" type='password'/>
            </FormGroup>
            <Button type="submit" variant="contained" color="primary" id="loginBtn">Log in</Button>
        </Form>
    </div>
    )
  }
}

export default Login;