import React from "react";
import ReactDOM from "react-dom";
import "./ProfileIndex.css";
import ProfileCreate from "./ProfileCreate";
import ProfileEdit from "./ProfileEdit";
//import ProfileTable from './ProfileTable';
import { Row, Col, Button, Container } from "reactstrap";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import { stringify } from "querystring";

type acceptedProps = {
  token: any;
};

type valueTypes = {
  user: string;
  firstName: string;
  lastName: string;
  userName:string;
  aboutMe: string;
  favCharacter: string;
  favEpisode: string;
  dataTable: [];
  updateActive: boolean;
  setProfileUpdate: string;
  profile: string;
  id: string;
};

class UserProfile extends React.Component<acceptedProps, valueTypes> {
  constructor(props: acceptedProps) {
    super(props);
    this.state = {
      user: "",
      firstName: "",
      lastName: "",
      userName: "",
      aboutMe: "",
      favCharacter: "",
      favEpisode: "",
      dataTable: [],
      updateActive: false,
      setProfileUpdate: "",
      profile: "",
      id: "",
    };
  }

  editUpdateProfile = (profile: any) => {
    this.setState({ setProfileUpdate: profile });
  };

  updateOff = () => {
    this.setState({ updateActive: false });
  };

  updateOn = () => {
    this.setState({ updateActive: true });
  };

  fetchProfiles = () => {
    fetch('http://localhost:3000/profile/', {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: this.props.token,
      },
    })
      .then((res) => res.json())
      .then((userData) => {
        console.log(userData);
        console.log(userData.profile);
        this.setState({ dataTable: userData.profile });
      });
  };

  componentDidMount() {
    this.fetchProfiles();
  }
  
  render() {
    return (
      <div className="mainProfileDiv">
          <ProfileCreate
            token={this.props.token}
            updateOff={this.updateOff}
            fetchProfiles={this.fetchProfiles}
          />
          {this.state.updateActive ? <ProfileEdit 
                 setProfileUpdate={this.state.setProfileUpdate}
                  updateOff={this.updateOff} 
                  token={this.props.token} 
                  fetchProfiles={this.fetchProfiles}/> : <></>}
        <div className="userInfo">
          <Container>
              <div>
                {this.state.dataTable.map((profile: any, index) => (
                  <div key={index} >
                    <div className="nameDiv">
                        <h3>Dunder Mifflin. This is </h3>
                        <h1>{profile.firstName} {profile.lastName}</h1>
                    </div>
                    <Container className='aboutInfo'>
                    <div className="editIconDiv">
                    <EditIcon onClick={()=> {
                    this.editUpdateProfile(profile)
                    this.updateOn()
                    }}/>
                    </div>
                        <h3 id="infoTag">Username</h3>
                            <p>{profile.userName}</p>
                        <h3 id="infoTag">About Me</h3>
                            <p>{profile.aboutMe}</p>
                        <h3 id="infoTag">Favorite Character</h3>
                            <p>{profile.favCharacter}</p>
                        <h3 id="infoTag">Favorite Episode</h3>
                            <p>{profile.favEpisode}</p>
                    </Container>
                  </div>
                 ))} 
              </div>
          </Container>
        </div>
      </div>
    );
  }
}
export default UserProfile;

// WORKING MAP ( KEEP JUST IN CASE )
{/* <TableContainer component={Paper}>
<Table aria-label="simple table">
  <TableHead>
    <TableRow>
      <TableCell align="right">Username</TableCell>
      <TableCell component="th" scope="row">
        About Me
      </TableCell>
      <TableCell align="right">Favorite Episode</TableCell>
      <TableCell align="right">Favorite Character</TableCell>
    </TableRow>
  </TableHead>
  <TableBody>
    {this.state.dataTable.map((profile: any, index) => (
      <TableRow key={index} >
          <h3>Dunder Mifflin. This is </h3>
          <h1>{profile.firstName} {profile.lastName}</h1>
        <TableCell align="right">{profile.userName}</TableCell>
        <TableCell component="th" scope="row">
          {profile.aboutMe}
        </TableCell>
        <TableCell align="right">{profile.favEpisode}</TableCell>
        <TableCell align="right">{profile.favCharacter}</TableCell>
        
      </TableRow>
     ))} 
  </TableBody>
</Table>
</TableContainer> */}
