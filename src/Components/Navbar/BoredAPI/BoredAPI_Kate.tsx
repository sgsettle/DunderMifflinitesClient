import React from 'react';
import '../NavBar.css';

import { Tooltip, Button, Modal } from 'antd';

type valueType = {
    activity: string;
    type: string;
    open: boolean;
}

export default class Bored extends React.Component< {}, valueType>{
    constructor(props: any){
        super(props);
        this.state = {
            activity: '',
            type: '',
            open: false,
        }
    }

    componentWillMount() {
        console.log("Mounting Bored API call.")
    }

    componentDidMount() {
        console.log("Bored API sucessfully mounted.");

        fetch('https://www.boredapi.com/api/activity')
            .then(res => res.json())
            .then(json => {
                console.log(json);
                this.setState({
                    activity: json.activity,
                    type: json.type
                })
            });
    }

    openModal = () => {
        this.setState({
          open: true,
        });
      };
    
      handleOk = (event: any) => {
        console.log(event);
        this.setState({
          open: false,
        });
      };

    render() {
        return(
            <div>
                <Tooltip title='Bored?'>
                    <Button style={{marginLeft: '3.75vw', top: '-4px'}} shape='circle' size='large' onClick={(e) => {
                        this.openModal()
                        this.componentDidMount()
                    }}>B
                    </Button>
                </Tooltip>
                <Modal
                    className='boredModal'
                    centered
                    title='Bored? Here is something for you to do:'
                    visible={this.state.open}
                    onOk={this.handleOk}
                    onCancel={this.handleOk}
                    >
                    <div id='boredDiv'>
                    <h4>Activity:</h4>
                    <p>{this.state.activity}</p>
                    <h4>Activity Type:</h4>
                    <p>{this.state.type}</p>
                    </div>
                </Modal>
            </div>
        )
    }
}