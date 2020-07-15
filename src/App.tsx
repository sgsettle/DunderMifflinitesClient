import React from 'react';
import './App.css';
import Auth from './auth/auth';
import Button from '@material-ui/core/Button';
import FeedIndex from './Components/Feed/FeedIndex';
import { HashRouter as Router } from "react-router-dom";
import { render } from '@testing-library/react';
import SiteBar from './Components/Navbar/NavBar';
import './App.css';
import Profile from './Components/UserProfile/ProfileIndex'
//import {BrowserRouter as Router} from 'react-router-dom';


type acceptedProps = {
  updateToken: any,
  updateUserName: any,
  clearToken: any,
  setComments: any
}
type valueTypes = {
  setUserName: string | any,
  setToken: string | any,
  setComments: any
}


class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes){
    super(props);
    this.state = {
      setUserName: "",
      setToken: "",
      setComments: '',
    };
  }

 componentWillMount() {
  console.log('testing testing');
 }
 
 componentDidMount() {
  if (localStorage.getItem("username")) {
    this.setState({ setUserName: localStorage.getItem("username") });
  }
  if (localStorage.getItem("token")) {
    this.setState({setToken: localStorage.getItem("token")});
  }
 }

 updateToken = (newToken: string) => {
  localStorage.setItem('token', newToken);
  this.setState({setToken: newToken});
  console.log(newToken);
};

updateUsername = (newUsername: string) => {
  localStorage.setItem("username", newUsername);
  this.setState({ setUserName: newUsername });
  console.log(newUsername);
};

  clearToken = () => {
    localStorage.clear();
    this.setState({setToken: ""});
    this.setState({setUserName: ""});
    sessionStorage.clear();
  };

  protectedViews = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <FeedIndex
      token={this.state.setToken} setUsername={this.updateUsername} setComments={this.state.setComments}/> 
      ) : (
     <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      />
     )
  };

  protectedViewTwo = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <Profile />
    ) : (
      <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      />
    )
  }

  protectedViewThree = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
        "<Admin />"
    ) : (
      <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      />
    )
  }

render() {
  return (
    <div className="App">
      <Router>

      <SiteBar clearToken={this.clearToken} protectedViews={this.protectedViews} protectedViewsTwo={this.protectedViewTwo} protectedViewsThree={this.protectedViewThree}/> 
      
      </Router>
      {/* router DOM will go here navbar/sitebar/*/}
    </div>
  )

  }
};

export default App;