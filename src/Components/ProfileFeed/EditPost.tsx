import React from 'react';
// import './Feed.css';

import { Modal } from 'antd';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import EditTwoToneIcon from '@material-ui/icons/EditTwoTone';

type acceptedProps = {
    fetchFeeds: any;
    updateOff: any;
    setUpdatePost: string | any;
    token: any
    // updateImage: string | any;
    // updateText: string | any;
    // updateLink: string | any;
}

type valueTypes = {
    // username: string;
    image: Blob | any;
    text: string;
    link: string; 
    open: boolean;
}

export default class EditPost extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            image: this.props.setUpdatePost.image,
            text: this.props.setUpdatePost.text,
            link: this.props.setUpdatePost.link,
            open: false
        }
    }

    editUpdatePost = (feed: any) => {
        console.log(feed)
    }

    handleOpen = () => {
        this.setState({open: true})
    }

    handleClose = () => {
        this.setState({open: false})
    }

    updateFeed = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/feed/${this.props.setUpdatePost.id}`, {
            method: 'PUT',
            body: JSON.stringify({
                // username: this.state.username,
                image: this.state.image,
                text: this.state.text,
                link: this.state.link
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token,})
        })
        .then((response) => response.json())
        .then((data) => {
            this.props.fetchFeeds()
            this.props.updateOff()
            // this.props.setUsername(data.feed.username);
            // this.props.updateImage(data.feed.image);
            // this.props.updateText(data.feed.text);
            // this.props.updateLink(data.feed.link);
        })
    }

    isOpen = () => {
        this.setState({
            open: true,
        })
    }

    isClosed = () => {
        this.setState({
            open: false,
        })
    }

    body = (
        <div id='EditPostDiv'>
            <form noValidate autoComplete="off" onSubmit={this.updateFeed} >
                <h2 id='editUname'>Edit Your Post:</h2>
                <TextField 
                className='createField'
                id="standard-basic" 
                label="Image URL:" 
                // defaultValue={this.state.image}
                onChange={(e: any) => this.setState({
                    image: e.target.value
                })}
                // value={this.state.image}
                />
                <br />
                <TextField
                className='createField'
                id="standard-basic"
                label="Text:"
                // defaultValue={this.state.text}
                multiline
                onChange={(e)=> this.setState({
                    text: e.target.value
                })}
                // value={this.state.text}
                />
                <br />
                <TextField
                className='createField'
                id="standard-basic"
                label='Link:'
                // defaultValue={this.state.link}
                onChange={(e) => this.setState({
                    link: e.target.value
                })}
                // value={this.state.link}
                />
                <br />
                {/* <Button id='editPostButton' type='submit' variant='contained' color='primary' onClick={this.updateFeed}>
                    Update Post!</Button> */}
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
                title='Edit Your Post:'
                visible={this.state.open}
                onOk={this.updateFeed}
                onCancel={this.isClosed}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {this.body}
            </Modal>
        </div>
        )
    }
}   