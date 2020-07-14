import React from 'react';
import { Modal, Button } from 'antd';

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
            'http://jservice.io/api/random', {
            method: 'GET',
            })
        .then((result) => result.json())
        .then((value) => {
            console.log(value);
            this.setState({
                question: value.question, 
                answer: value.answer})
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
                <Button className="jeopardyButton" onClick={(e) => {
                    this.showModal()
                    this.componentDidMount()
                }}>
                    Jeopardy
                </Button>
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