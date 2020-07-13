import React from 'react';
import './App.css';

import Auth from './auth/auth';
import FeedIndex from './Components/Feed/FeedIndex';

import { render } from '@testing-library/react';


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
      token={this.state.setToken} setUsername={this.updateUsername}/> 
      ) : (
     <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
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
