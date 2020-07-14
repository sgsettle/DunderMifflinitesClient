import * as React from 'react';
//import Form from '@material-ui/core/Form';
//import FormGroup from '@material-ui/core/FormGroup';
//import Label from '@material-ui/core/Label';
import Button from '@material-ui/core/Button';
import {Form, FormGroup, Label, Input} from 'reactstrap';
import './signup.css'

type valueTypes = {
    firstName: string,
    lastName: string,
    userName: string,
    setUserName: string,
    email: string,
    password: string,
    setPassword: string
};

type acceptedProps = {
    updateToken: any
    setUsername: any
};

class Signup extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps){
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            setUserName: "",
            email: "",
            password: "",
            setPassword: ""
        };
    }
    
    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/signup', {
            method: 'POST',
            body: JSON.stringify({
                firstName: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                email: this.state.email,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            this.props.updateToken(data.sessionToken);
            this.props.setUsername(data.user.userName)
        });
    };
render() {
    return (
    <div id="signupDiv">
        <h1 style={{textAlign:'center'}}>Sign Up to Join the Fun</h1>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label className="signupLabel" htmlFor="firstname">First Name  </Label>
                <Input className="signupInput" onChange={(e) => this.setState({firstName: e.target.value})} name="firstname" value={this.state.firstName} type='text'/>
            </FormGroup>
            <FormGroup>
                <Label className="signupLabel" htmlFor="lastname">Last Name  </Label>
                <Input className="signupInput" onChange={(e) => this.setState({lastName: e.target.value})} name="lastname" value={this.state.lastName} type='text'/>
            </FormGroup>
            <FormGroup>
                <Label className="signupLabel" htmlFor="username">Username  </Label>
                <Input 
                className="signupInput" 
                onChange={(e) => this.setState({userName: e.target.value})} 
                value={this.state.userName} 
                name="username" type='text' 
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}"
                title='Username must include one number and be 4-15 characters in length.'
              />
            </FormGroup>
            <FormGroup>
                <Label className="signupLabel" htmlFor="email">Email  </Label>
                <Input className="signupInput" onChange={(e) => this.setState({email: e.target.value})} 
                value={this.state.email} 
                name="email" type='email' 
                pattern='.+@.+.com' 
                title='Must be in standard email format. Ex: youremail@email.com'/>
            </FormGroup>
            <FormGroup>
                <Label className="signupLabel" htmlFor="password">Password  </Label>
                <Input className="signupInput" onChange={(e) => this.setState({password: e.target.value})} name="password" 
                value={this.state.password} 
                type='password'
                pattern='[a-zA-Z0-9]+'
                title='Password must contain one number and be 5-15 characters in length.'/>
            </FormGroup>
            <br/>
            <Button type="submit" variant="contained" color="primary" className="signupBtn" >Signup</Button>
        </Form>
    </div>
    )
  }
}

export default Signup;