import React from 'react';
import './App.css';
import Auth from './auth/auth';
import FeedIndex from './Components/Feed/FeedIndex';
//import UserProfile from './Components/UserProfile/ProfileIndex'
import SiteBar from './Components/Navbar/NavBar';
//import Admin from './Components/Admin/Admin';
import Footer from './Components/Footer/Footer';
//import {BrowserRouter as Router} from 'react-router-dom';

type valueTypes = {
  setUserName: string | any,
  setToken: string | any,
}

class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes){
    super(props);
    this.state = {
      setUserName: "",
      setToken: ""
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
      token={this.state.setToken} setUserName={this.updateUsername}/> 
      ) : (
     <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      />
     )
  };

render() {
  return (
    <div className="App">
      {/* <Admin
      token={this.state.setToken} setUserName={this.updateUsername}
      /> */}
      <SiteBar clearToken={this.clearToken}/>
      {this.protectedViews()}
      {/* router DOM will go here navbar/sitebar/*/}
      <Footer />
    </div>
  )
  }
};

export default App;