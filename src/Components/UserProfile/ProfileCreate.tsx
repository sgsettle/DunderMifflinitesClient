import React from 'react';
// import Modal from '@material-ui/core';
import { Form, FormGroup, Label, Input, Modal, Button } from 'reactstrap';


type AcceptedProps = {
    token: any;
    fetchProfiles: any,
    updateOff: any
}

type ValueTypes = {
    firstName: string,
    lastName: string,
    userName: string,
    aboutMe: string,
    userPhoto: string,
    favCharacter: string,
    favEpisode: string,
    open: boolean
}

class ProfileCreate extends React.Component<AcceptedProps, ValueTypes> {
    constructor(props: AcceptedProps) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            userName: "",
            aboutMe: "",
            userPhoto: "",
            favCharacter: "",
            favEpisode: "",
            open: true
        }
    }

    // showModal = () => {
    //     this.setState({
    //         open: false,
    //     });
    // };

    handleSubmit = (event: any) => {
        event.preventDefault();
        fetch('http://localhost:3000/profile/', {
            method: 'POST',
            body: JSON.stringify({
                // firstName: this.state.firstName,//wont need
                // lastName: this.state.lastName,//wont need
                // userName: this.state.userName,//wont need
                aboutMe: this.state.aboutMe,
                favCharacter: this.state.favCharacter,
                favEpisode: this.state.favEpisode
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
               'Authorization': this.props.token
            })
        }).then(res => res.json())
        .then(json => {
            console.log(json)
            this.props.fetchProfiles();
            this.closeModal();
        })
    } 

    handleOnSubmit = (event: any) => {
        event.preventDefault()

    }
// ternary to check if they've created a user vs login
// true & false value on created a user or not
displayModal = () => {
    return 
}


    // handleClose = (e: any) => {
    //     console.log(e);
    //     this.setState({
    //         open: false,
    //     });
    // };

    // openModal = () => {
    //     this.setState({
    //         open: true,
    //     })
    // }

    closeModal = () => {
        this.setState({
            open: false,
        })
    }

    // componentDidMount() {
    //     this.handleSubmit();
    // }

    // handleClose = () => {
    //     this.setState({open: false})
    // }

    render() {
        return (
                <Modal isOpen={this.state.open} className="createModal">
                    <Form id="createForm" onSubmit={this.handleSubmit} >
                        <FormGroup>
                            <Label htmlFor="aboutMe">About Me:</Label>
                            <Input id="createInput" name="aboutMe" onChange={(e) => this.setState({aboutMe: e.target.value})} />
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="favCharacter">Favorite Character:</Label>
                            <Input id="createInput" name="favCharacter" type="select" onChange={(e) => this.setState({favCharacter: e.target.value})}>
                                <option></option>
                                <option value="Andy Bernard">Andy Bernard</option>
                                <option value="Angela Martin">Angela Martin</option>
                                <option value="Charles Miner">Charles Miner</option>
                                <option value="Clark Green">Clark Green</option>
                                <option value="Creed Bratton">Creed Bratton</option>
                                <option value="Danny Cordray">Danny Cordray</option>
                                <option value="David Wallace">David Wallace</option>
                                <option value="Darryl Philbin">Darryl Philbin</option>
                                <option value="Deangelo Vickers">Deangelo Vickers</option>
                                <option value="Dwight Schrute">Dwight Schrute</option>
                                <option value="Erin Hannon">Erin Hannon</option>
                                <option value="Gabe Lewis">Gabe Lewis</option>
                                <option value="Holly Flax">Holly Flax</option>
                                <option value="Jan Levinson">Jan Levinson</option>
                                <option value="Jim Halpert">Jim Halpert</option>
                                <option value="Jo Bennett">Jo Bennett</option>
                                <option value="Karen Filippelli">Karen Filippelli</option>
                                <option value="Kelly Kapoor">Kelly Kapoor</option>
                                <option value="Kevin Malone">Kevin Malone</option>
                                <option value="Meredith Palmer">Meredith Palmer</option>
                                <option value="Michael Scott">Michael Scott</option>
                                <option value="Nate Nickerson">Nate Nickerson</option>
                                <option value="Nellie Bertram">Nellie Bertram</option>
                                <option value="Oscar Martinez">Oscar Martinez</option>
                                <option value="Pam Beesly">Pam Beesly</option>
                                <option value="Pete Miller">Pete Miller</option>
                                <option value="Phyllis Vance">Phyllis Vance</option>
                                <option value="Robert California">Robert California</option>
                                <option value="Roy Anderson">Roy Anderson</option>
                                <option value="Ryan Howard">Ryan Howard</option>
                                <option value="Stanley Hudson">Stanley Hudson</option>
                                <option value="Toby Flenderson">Toby Flenderson</option>
                                <option value="Todd Packer">Todd Packer</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label htmlFor="favEpisode">Favorite Episode:</Label>
                            <Input id="createInput" name="favEpisode" onChange={(e) => this.setState({favEpisode: e.target.value})}  />
                        </FormGroup>
                        <Button id="createButton" type="submit">Submit</Button>
                    </Form> 
                </Modal>
        )
    }
}

export default ProfileCreate;