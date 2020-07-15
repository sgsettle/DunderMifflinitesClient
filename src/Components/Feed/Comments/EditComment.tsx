import React from 'react';

import { Button, Tooltip, Modal, Input } from 'antd';
import { EditOutlined } from '@ant-design/icons';

type acceptedProps = {
    fetchComment: any
    setUpdateComment: any
    updateOff: any
    token: any
}

type valueTypes = {
    username: string;
    comment: string;
    commentData: [];
    open: boolean;
}
 
export default class editComment extends React.Component<acceptedProps, valueTypes> {
    constructor(props: acceptedProps) {
        super(props);
        this.state = {
            username: this.props.setUpdateComment.userName,
            comment: this.props.setUpdateComment.comment,
            commentData: [],
            open: false,
        }
    }

    updateComment = (event: any) => {
        event.preventDefault();
        fetch(`http://localhost:3000/comments/${this.props.setUpdateComment.id}`, {
            method: "PUT",
            body: JSON.stringify({
                username: this.state.username,
                comment: this.state.comment,
            }),
            headers: new Headers({
                "Content-Type": "application/json",
                Authorization: this.props.token,
            })
        })
        .then((res) => res.json())
        .then((data) => {
            this.props.fetchComment()
            this.props.updateOff()
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
       
    render() {
        return (
            <div>
                <Tooltip title='Edit Comment'>
                    <Button shape='circle' icon={<EditOutlined />} />
                </Tooltip>

                <Modal
                title='Edit Your Comment:'
                visible={true}
                onOk={this.updateComment}
                onCancel={this.isClosed}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                >
                <h3>{this.state.username}</h3>
                <Input style={{width: '85%', marginLeft: '7.5%'}} size='large' placeholder={this.state.comment} 
                        onChange={(e: any) => this.setState({
                            comment: e.target.value
                        })}
                        />   
                </Modal>

            </div>   
        )
    }



}