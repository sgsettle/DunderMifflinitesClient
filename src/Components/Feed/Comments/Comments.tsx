import React from 'react';
import './Comments.css';

import  Tooltip  from '@material-ui/core/Tooltip';
import  Dialog  from '@material-ui/core/Dialog';
import { Button, Input } from 'antd';
import { CommentOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';

type acceptedProps = {
    setUsername: string;
    setComments: string;
    token: any
}

type valueTypes = {
    username: string;
    comment: string;
    dataTable: [];
    open: boolean;
}

export default class Comments extends React.Component< acceptedProps, valueTypes > {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
            comment: '',
            dataTable: [],
            open: false,
        }
    }

    //fetch user data for username and array
    fetchUsers = (user: any) => {
        fetch(`http://localhost:3000/user/`, {
            method: "GET",
            headers: {
                "Content-type":"application/json"
            }
        })
        .then((res) => res.json())
        .then((userData) => {
            console.log("User data", userData);
            this.setState({
               dataTable: userData.user
            })
            console.log("USERSDATA", this.state.dataTable)
        })
    }

    //GET ALL COMMENTS, FETCH COMMENT DATA
    fetchComments = () => {
        console.log('Fetching comments for GET.')
        fetch(`http://localhost:3000/comments/`, {
            method: 'GET',
            headers: {
                "Content-type":"application/json",
                Authorization: this.props.token
            }
        })
        .then((res) => res.json())
        .then((commentData) => {
            console.log("Comment data", commentData);
            this.setState({
               dataTable: commentData.comments
            })
            console.log("COMMENTS", this.state.dataTable)
        })
    }
    //CREATE A COMMENT
    createComment = ( event: any ) => {
        event.preventDefault();
        fetch(`http://localhost:3000/comments/`, {
                method: 'POST',
                body: JSON.stringify({
                    userName: this.state.username,
                    comment: this.state.comment
                }),
                headers: new Headers({"Content-Type": "application/json", Authorization: this.props.token})
            })
            .then((data) => {
                this.setState({username: this.state.username});
                this.setState({comment: this.state.comment});
                console.log("COMMENTS TEST ->", data);
            })
    }

    //EDIT A COMMENT


    //DELETE A COMMENT
    deleteComment = ( comment: any ) => {
        fetch(`http://localhost:3000/comments/${comment.id}`, {
            method: 'DELETE',
            headers: new Headers({'Content-Type': 'application/json', Authorization: this.props.token})
        }).then(() => this.fetchComments())
    }

    // commentMapper = () => {
    //     return this.state.dataTable.map((comment: any, index) => {
    //         return(
    //             <div>
                    
    //             </div>
    //         )
    //     })
    // }

    openDialog = () => {
        this.setState({
            open: true,
        })
    }

    closeDialog = (event: any) => {
        this.setState({
            open: false,
        })
    }

    // submitComment = (event: any) => {

    // }

    render() {
        return(
            <div>
                <Tooltip title='Comments'>
                    <Button onClick={this.openDialog}>
                        <CommentOutlined />
                    </Button>
                </Tooltip>

                {this.state.dataTable.map((comments: any, index) => (
                    <div key={index}>
                    <Dialog
                    className='mainCommentD'
                    open={this.state.open}
                    onClose={this.closeDialog}
                    aria-labelledby="customized-dialog-title"
                    >
                        <h3 id='commentTitle'>Comments:</h3>
                        <table id='commentsTable'  >
                            <tr>
                                <th>User:</th>
                                <th>Comment:</th>
                            </tr>
                            <tr>
                                <td id='tUname'>{comments.username}</td>
                                <td id='tComment'>{comments.comment}</td>
                                <td id='tButton'>
                                    <Tooltip title='Edit Comment'>
                                        <Button shape='circle' icon={ <EditOutlined />} />
                                    </Tooltip>
                                    /
                                    <Tooltip title='Delete Comment'>
                                        <Button shape='circle' icon={ <DeleteOutlined />} onClick={this.deleteComment}/>
                                    </Tooltip>
                                </td>
                            </tr>
                        </table>
                        
                        <Input className='thisSection' style={{width: '85%', marginLeft: '7.5%'}} size='large' placeholder="I didn't say it. I declared it..." 
                        onChange={(e: any) => this.setState({
                            comment: e.target.value
                        })}
                        />
                        <Tooltip className='thisSection' title='Add Comment' >
                            <Button className='thisSection' style={{width: '60px', marginLeft: '42.5%'}} type='primary' onClick={this.createComment}>Add</Button>
                        </Tooltip>
                    </Dialog>    

                </div>
                ))}
            </div>
        )
    }
}