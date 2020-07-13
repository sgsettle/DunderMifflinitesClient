import React from 'react';
import './Comments.css';

type acceptedProps = {
    setUsername: string;
    setComment: string;
    token: any
}

type valueTypes = {
    username: string;
    comment: string;
    dataTable: []
}

export default class Comments extends React.Component< acceptedProps, valueTypes > {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: '',
            comment: '',
            dataTable: []
        }
    }
    //GET ALL COMMENTS, FETCH COMMENT DATA
    fetchComments = (comment: any) => {
        fetch(`http://localhost:3000/comments/`, {
            method: 'GET',
            headers: {
                "Content-type":"application/json",
                Authorization: this.props.token
            }
        })
        .then((res) => res.json())
        .then((userData) => {
            console.log("User data", userData);
            this.setState({
               dataTable: userData.comments
            })
            console.log("COMMENTS", this.state.dataTable)
        })
    }
    //CREATE A COMMENT
    // createComment = ( event: any ) => {
    //     event.preventDefault();
    //     fetch()
    // }
    //EDIT A COMMENT

    //DELETE A COMMENT
    // deleteComment = ( comment: any ) => {
    //     fetch(`http://localhost:3000/comments/${comment.id}`, {
    //         method: 'DELETE',
    //         headers: new Headers({'Content-Type': 'application/json', Authorization: this.props.token})
    //     }).then(() => this.fetchComments())
    // }

}