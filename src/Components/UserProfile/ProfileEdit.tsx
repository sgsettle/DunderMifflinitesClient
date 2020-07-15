import React from 'react';
import { stringify } from 'querystring';
import { Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, Button} from 'reactstrap';

type AcceptedProps = {
    token: any,
    fetchProfiles: any,
    updateOff: any,
    setProfileUpdate: any
}

type ValueType = {
    aboutMe: {},
    favCharacter: {},
    favEpisode: {},
    open: boolean
}

export default class ProfileEdit extends React.Component<AcceptedProps, ValueType> {
    constructor(props: AcceptedProps){
        super(props);
        this.state = {
            aboutMe: this.props.setProfileUpdate.aboutMe,
            favCharacter: this.props.setProfileUpdate.favCharacter,
            favEpisode: this.props.setProfileUpdate.favEpisode,
            open: false
        } 
    }

    handleSubmit = () => {
        // event.preventDefault();
        fetch(`http://localhost:3000/profile/`, {
            method: 'PUT',
            body: JSON.stringify({
                aboutMe: this.state.aboutMe,
                favCharacter: this.state.favCharacter,
                favEpisode: this.state.favEpisode
            }),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': this.props.token
            })
        }).then((res) => {
            console.log(res);
            this.props.fetchProfiles();
            console.log("can i see this", this.props.fetchProfiles());
            this.props.updateOff();
        })
    }

    render() {
        return(
            <Modal isOpen={true} className="editModal">
                <ModalHeader>Edit Profile</ModalHeader>
            <ModalBody>
            <Form id="editForm" onSubmit={this.handleSubmit} >
                <FormGroup>
                    <Label htmlFor="aboutMe">About Me:</Label>
                    <Input id="editInput" name="aboutMe" onChange={(e) => this.setState({aboutMe: e.target.value})} />
                </FormGroup>
                <FormGroup>
                    <Label htmlFor="favCharacter">Favorite Character:</Label>
                    <Input id="editInput" name="favCharacter" type="select" onChange={(e) => this.setState({favCharacter: e.target.value})}>
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
                        <option value="Nat eNickerson">Nate Nickerson</option>
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
                    <Input iid="editInput" name="favEpisode" onChange={(e) => this.setState({favEpisode: e.target.value})}  />
                </FormGroup>
                <Button id="editButton" type="submit">Update</Button>
            </Form> 
            </ModalBody>
        </Modal>
        )
    }
}