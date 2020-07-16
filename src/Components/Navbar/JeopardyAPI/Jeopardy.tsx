import React from 'react';
import { Modal, Button, Tooltip } from 'antd';
import '../NavBar.css';

type ValueType = {
    question: string,
    answer: string,
    visible: boolean
}

export default class Jeopardy extends React.Component<{}, ValueType> {
    constructor(props: {}) {
        super(props);
        this.state = {
            question: "",
            answer: "",
            visible: false
        }
    }

    componentDidMount = () => {
        const getInfo = () => {
        fetch(
            'https://jservice.io/api/random', {
            method: 'GET',
            })
        .then((result) => result.json())
        .then((json) => {
            console.log(json[0].question);
            this.setState({
                question: json[0].question, 
                answer: json[0].answer})
        })
        console.log(this.state.question)
    }
    getInfo();
    }

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    render() {
        return (
            <div>
                <Tooltip title='Jeopardy'>
                    <Button style={{top: "10px", marginLeft: "3.75vw" }} shape="circle" size="large" onClick={(e) => {
                        this.showModal()
                        this.componentDidMount()
                    }}>
                        J
                    </Button>
                </Tooltip>
                <Modal
                title="Jeopardy Questions"
                visible={this.state.visible}
                onOk={this.componentDidMount}
                onCancel={this.handleCancel}
                >
                    <div className="jeopardyDiv">
                    <h3>Question: {this.state.question}</h3>
                    <p>Answer: {this.state.answer}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}