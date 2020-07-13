import * as React from 'react';
//import Form from '@material-ui/core/Form';
//import FormGroup from '@material-ui/core/FormGroup';
//import Label from '@material-ui/core/Label';
//import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import {Form, FormGroup, Label, Input} from 'reactstrap';

type valueTypes = {
    userName: string,
    setUserName: string,
    password: string,
    setPassword: string
};

type acceptedProps = {
    updateToken: any
    setUsername: any
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
        fetch('http://localhost:3000/user/login', {
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
            this.props.setUsername(data.user.userName)
        });
    };
render() {
    return (
    <div>
        <h1 style={{textAlign:"center"}}>Login</h1>
        <Form onSubmit={this.handleSubmit}>
            <FormGroup>
                <Label htmlFor="username">Username</Label>
                <Input onChange={(e) => this.setState({userName: e.target.value})} 
                name="username" type='text'/>{/**the value of the input fields is ultimately controlled by react. Because this component doesn't implement any use for setUsername or setPassword, the input fields will be stuck with no text inside, even if the user types them in */}
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password</Label>
                <Input onChange={(e) => this.setState({password: e.target.value})} 
                name="password" type='password'/>
            </FormGroup>
            <Button type="submit" color="secondary" style={{marginLeft:'180px'}}>Login</Button>
        </Form>
    </div>
    )
  }
}

export default Login;