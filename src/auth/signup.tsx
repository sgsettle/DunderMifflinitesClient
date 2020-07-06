import * as React from 'react';
//import Form from '@material-ui/core/Form';
//import FormGroup from '@material-ui/core/FormGroup';
//import Label from '@material-ui/core/Label';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {Form, FormGroup, Label} from 'reactstrap';

type valueType = {
    firstName: string,
    lastName: string,
    userName: string,
    password: string
};

type acceptedProps = {
    token: string
};

class Signup extends React.Component<acceptedProps, valueType> {
    constructor(props: acceptedProps){
        super(props)
    }
    
    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3000/user/login', {
            method: 'POST',
            body: JSON.stringify({
                firstNamer: this.state.firstName,
                lastName: this.state.lastName,
                userName: this.state.userName,
                password: this.state.password
            }),
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then(
            (response) => response.json()
        ).then((data) => {
            //this.props.updateToken(data.sessionToken);
        });
    };
render() {
    return (
    <div>
        <h1 style={{textAlign:'center'}}>Signup</h1>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="firstname">First Name</Label>
                <Input onChange={(e) => this.setState({firstName: e.target.value})} name="firstname" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="lastname">Last Name</Label>
                <Input onChange={(e) => this.setState({lastName: e.target.value})} name="lastname" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => this.setState({userName: e.target.value})} name="username" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => this.setState({password: e.target.value})} name="password" />
            </FormGroup>
            <Button type="submit" color="secondary" style={{marginLeft:'180px'}}>Login</Button>
        </Form>
    </div>
    )
  }
}

export default Signup;