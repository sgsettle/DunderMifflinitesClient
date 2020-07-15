import React from 'react';
import './Feed.css';

import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

type acceptedProps = {
    updateUsername: string | any;
    updateImage: string | any;
    updateText: string | any;
    updateLink: string | any;
}

type valueTypes = {
    username: string;
    image: Blob | any;
    text: string;
    link: string; 
    open: boolean;
}

export default class EditPost extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
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
        console.log('Edit a post by ', this.state.username);
        event.preventDefault();
        fetch('http://localhost:3000/feed/', {
            method: 'PUT',
            body: JSON.stringify({
                username: this.state.username,
                image: this.state.image,
                text: this.state.text,
                link: this.state.link
            }),
            headers: new Headers({"Content-Type": "application/json"})
        })
        .then((response) => response.json())
        .then((data) => {
            this.props.updateUsername(data.feed.username);
            this.props.updateImage(data.feed.imgae);
            this.props.updateText(data.feed.text);
            this.props.updateLink(data.feed.link);
        })
    }

    body = (
        <div id='EditPostDiv'>
            <form noValidate autoComplete="off" onSubmit={this.handleSubmit} >
                <h2 id='editUname'>Edit Your Post:</h2>
                <TextField 
                className='createField'
                id="standard-basic" 
                label="Image URL:" 
                defaultValue={this.state.username}
                onChange={(e: any) => this.setState({
                    image: e.target.value
                })}
                value={this.state.image}
                />
                <br />
                <TextField
                className='createField'
                id="standard-basic"
                label="Text:"
                defaultValue={this.state.text}
                multiline
                onChange={(e)=> this.setState({
                    text: e.target.value
                })}
                value={this.state.text}
                />
                <br />
                <TextField
                className='createField'
                id="standard-basic"
                label='Link:'
                defaultValue={this.state.link}
                onChange={(e) => this.setState({
                    link: e.target.value
                })}
                value={this.state.link}
                />
                <br />
                <Button id='editPostButton' type='submit' variant='contained' color='primary' onClick={this.handleClose}>Add Post!</Button>
            </form> 
        </div>
    )

    render() {
    return (
        <div>
            <IconButton id='EditPostButton' style={{backgroundColor: 'white', height: '30px', width: '30px', borderRadius: '50%', outline: 'none'}} title='Edit' >
                <EditTwoToneIcon onClick={this.handleOpen} />
            </IconButton>
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