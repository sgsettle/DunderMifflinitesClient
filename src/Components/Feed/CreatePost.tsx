import React from 'react';
import './CreatePost.css';
import APIURL from '../../Helpers/environment';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

type acceptedProps = {
    setUsername: string | any;
    setImage: string | any;
    setText: string | any;
    setLink: string | any;
    fetchUsers: any;
    token: any;
}

type valueTypes = {
    username: string;
    image: string;
    text: string;
    link: string; 
    open: boolean;
}

export default class CreatePost extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: this.props.setUsername,
            image: '',
            text: '',
            link: '',
            open: false
        }
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    handleSubmit = (event: any) => {
        //console.log('This is a post by ' + this.state.username);
        event.preventDefault();
        fetch(`${APIURL}/feed/`, {
            method: 'POST',
            body: JSON.stringify({
                userName: this.state.username,
                image: this.state.image,
                text: this.state.text,
                link: this.state.link
            }),
            headers: new Headers({"Content-Type": "application/json", Authorization: this.props.token})
        })
        .then((response) => response.json())
        .then((data) => {
            this.setState({username: this.state.username});
            this.setState({image: this.state.image});
            this.setState({text: this.state.text});
            this.setState({link: this.state.link});
            this.props.fetchUsers();
            console.log("TESTINGTHIS", data);
            this.handleClose();
        })
    }

    body = (
        <div  id='PostCreateDiv'>
            <form  noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                <h2 id='createUname'>Post It:</h2>
                <TextField 
                className='createField'
                id="standard-basic" 
                label="Enter an image URL:" 
                helperText='Ex: https://tinyurl.com/DunderMifflinites'
                defaultValue=""
                onChange={(e: any) => this.setState({
                    image: e.target.value
                })}
                //value={this.state.text}
                />
                <br />
                <TextField
                className='createField'
                id="standard-basic"
                label="Thoughts, Statements, Decalarations:"
                helperText="Sometimes I’ll start a sentence and I don’t even know where it’s going. I just hope I find it along the way. -Michael Scott"
                defaultValue=""
                multiline
                onChange={(e)=> this.setState({
                    text: e.target.value
                })}
                // value={this.state.link}
                />
                <br />
                <TextField
                className='createField'
                id="standard-basic"
                label='Link to something cool:'
                // defaultValue=""
                onChange={(e) => this.setState({
                    link: e.target.value
                })}
                />
                <br />
                <Button id='addPostButton' type='submit' variant='contained' color='primary'>Add Post!</Button>
            </form> 
        </div>
    )
       
    render() {
    return (
        <div>
            <Button id='PostCreateButton' type="button" variant='contained' color='primary' onClick={this.handleOpen}>
                Create A Post
            </Button>
            <Modal
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {this.body}
            </Modal>
        </div>
        )
    }
}