import React from 'react';
import './App.css';
import Auth from './auth/auth';
import Button from '@material-ui/core/Button';
import { render } from '@testing-library/react';
import SiteBar from './Components/Navbar/NavBar';
import './App.css';
//import {BrowserRouter as Router} from 'react-router-dom';



type valueTypes = {
  setUserName: string | any,
  setToken: string | any,
}
type acceptedProps = {
  updateToken: any,
  updateUserName: any,
  clearToken: any
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
  if (localStorage.getItem("userName")) {
    this.setState({setUserName: localStorage.getItem("userName")})
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

  updateUserName = (newUserName: string) => {
    localStorage.setItem('userName', newUserName);
    this.setState({setUserName: newUserName});
    console.log(newUserName);
  };

  clearToken = () => {
    localStorage.clear();
    this.setState({setToken: ""});
    this.setState({setUserName: ""});
    sessionStorage.clear();
  };

  protectedViews = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      //<UserProfile
       //token={this.state.setToken} /> 
      // <Feed 
      //   token={this.state.setToken} />
      "hit logout to go back to sign up or login...this is a placeholder text until linked with profile or feed"
      ) : (
     <Auth
      token={this.updateToken}
      updateUserName={this.updateUserName}
      />
     )
  };

render() {
  return (
    <div className="App">
      <SiteBar clearToken={this.clearToken}/> 
      {this.protectedViews()}
      {/* router DOM will go here navbar/sitebar/*/}
    </div>
  )
}
};

export default App;