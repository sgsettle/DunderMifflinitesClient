import React from 'react';
import Navbar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
import { Container, Button } from 'reactstrap';
import { Card } from 'antd';
import './Admin.css';
import APIURL from '../../Helpers/environment';
//import IconButton from '@material-ui/core/IconButton';
//import DeleteTwoToneIcon from '@material-ui/icons/';

type acceptedProps = {
    setUserName: string | any;
    token: any;
    updateUserRole: any;
}

type valueTypes = {
    username: string | any;
    image: string;
    text: string;
    link: string; 
    dataTable: []
}

export default class extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
            image: '',
            text: '',
            link: '',
            dataTable: []
        }
    }
    fetchUsers = () => {
        console.log('Fetching users by ' + this.state.username);
        fetch(`${APIURL}/user`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                // Authorization: this.props.token
            }
        })
        .then((response) => response.json())
        .then((userData)=> {
            console.log("user data ", userData);
            this.setState({
                dataTable: userData.user
            })
            console.log("USERS", this.state.dataTable)
        })
    }

    deleteUser = ( user: any) => {
        fetch(`${APIURL}/user/${user.id}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json'}),

        }).then(() => this.fetchUsers())
    }

    userMapper = () => {
        return this.state.dataTable.map((users: any, index) => {
            return(
                //call mapper and use jsx to display
                
                <Card
                    key={index}
                    id='userlist'
                >
                    <p id='listUserName'>Username: {users.userName}</p>
                    <Button id="deleteMe" variant='contained' color='primary' onClick={() => {this.deleteUser(users)}}>Delete User</Button>

                </Card>
            )
        })
    }

    componentDidMount(){
        this.fetchUsers();
    }

    render() {
        return(
            <div id='feedDiv'>
                <Container id='userContainer'>
                    <header id='titleUserList'>Dunder Mifflinites User List:</header>
                    {this.userMapper()}
                </Container>
                <Footer />
            </div>    
        )
    }
}