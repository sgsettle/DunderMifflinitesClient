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

    showModal = () => {
        this.setState({
            visible: true,
        });
    };

    handleOk = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    componentDidMount() {
        fetch(
            'http://jservice.io/api/random'
        )
        .then((value) => value.json())
        .then((json) => {
            console.log(json);
            this.setState({question: json.question, answer: json.answer})
        })
    }

    render() {
        return (
            <div>
                <Button type="primary" onClick={this.showModal}>
                    Jeopardy
                </Button>
                <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                >
                    <h1>Jeopardy Question:</h1>
                    <h3>{this.state.question}</h3>
                    <p>{this.state.answer}</p>
                </Modal>
            </div>
        )
    }
}