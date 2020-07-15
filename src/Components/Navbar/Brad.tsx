import React from "react";
import { Modal, Button, Tooltip } from 'antd';
import './Brad.css';

type acceptedProps = {
};

type valueTypes = {
    base: string,
    target: string,
    price: string,
    visible: boolean
}

class LiteCoin extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      base: "",
      target: "",
      price: "",
      visible: false,
}
  }
  componentDidMount = () => {
    const getCoin = () => {
        fetch(`https://api.cryptonator.com/api/ticker/ltc-usd`,  {
            method: 'GET',
        }).then((result) => 
        result.json())
          .then((coinData) => {
              console.log(coinData.ticker)
            this.setState({
                base: coinData.ticker.base,
                target: coinData.ticker.target,
                price: coinData.ticker.price
            })
            console.log(this.state.base);
          })
      }
      getCoin();
    }

    showModal = () => {
        this.setState({
            visible: true
        })
    }
    handleCancel = (e: any) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };


  render() {
    return (
        <div>
          <Tooltip title='LiteCoin'>
          <Button className='eachButton' shape='circle' size='large' onClick={(e) => {
              this.showModal()
              this.componentDidMount()
          }}>L
          </Button>
          </Tooltip>

        <Modal
            title='Litecoin Quote'
            visible={this.state.visible}
            onOk={this.handleCancel}
            onCancel={this.handleCancel}
            >
              <div id="coinModal">
            <p>Base: {this.state.base}</p>
            <p>Target: {this.state.target}</p>
            <p>Price: {this.state.price}</p>
            </div>
        </Modal>
      </div>
    )
  }
};

export default LiteCoin;