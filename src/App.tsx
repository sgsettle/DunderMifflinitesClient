import React from 'react';
import './App.css';
import Auth from './auth/auth';
import { render } from '@testing-library/react';
import UserProfile from './Components/UserProfile/ProfileIndex'
import "bootstrap/dist/css/bootstrap.min.css"


type valueTypes = {
  setUserName: string | any,
  setToken: string | any
}

class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes){
    super(props);
    this.state = {
      setUserName: "",
      setToken: ""
    };
  }
//useEffect() from JS
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
      <UserProfile
      token={this.state.setToken} /> 
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
      {this.protectedViews()}

    </div>
  )
}
};

export default App;