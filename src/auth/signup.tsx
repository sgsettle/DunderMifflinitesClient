import * as React from 'react';
//import Form from '@material-ui/core/Form';
//import FormGroup from '@material-ui/core/FormGroup';
//import Label from '@material-ui/core/Label';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {Form, FormGroup, Label} from 'reactstrap';

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
            //this.props.updateUserRole(date.user.userRole);
        });
    };
render() {
    return (
    <div>
        <h1 style={{textAlign:'center'}}>Signup</h1>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="firstname">First Name</Label>
                <Input onChange={(e) => this.setState({firstName: e.target.value})} name="firstname" value={this.state.firstName}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="lastname">Last Name</Label>
                <Input onChange={(e) => this.setState({lastName: e.target.value})} name="lastname" value={this.state.lastName}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => this.setState({userName: e.target.value})} value={this.state.userName} name="username" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email</Label>
                <Input onChange={(e) => this.setState({email: e.target.value})} value={this.state.email} name="email" />
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => this.setState({password: e.target.value})} name="password" value={this.state.password} />
            </FormGroup>
            <Button type="submit" color="secondary" style={{marginLeft:'180px'}}>Signup</Button>
        </Form>
    </div>
    )
  }
}

export default Signup;