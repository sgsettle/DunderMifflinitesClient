import React from 'react';
import './App.css';
import Auth from './auth/auth';
import FeedIndex from './Components/Feed/FeedIndex';
import { HashRouter as Router } from "react-router-dom";
import UserProfile from './Components/UserProfile/ProfileIndex'
import SiteBar from './Components/Navbar/NavBar';
import Admin from './Components/Admin/Admin';

type acceptedProps = {
  updateToken: any,
  updateUserName: any,
  clearToken: any,
  setComments: any,
  setUsername: any,
  token: any,
}
type valueTypes = {
  setUserName: string | any,
  setToken: string | any,
  setComments: any,
  setUserRole: any,
}


class App extends React.Component<{}, valueTypes> {
  constructor(props: valueTypes){
    super(props);
    this.state = {
      setUserName: "",
      setToken: "",
      setComments: '',
      setUserRole: '',
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
  if (localStorage.getItem("userRole")) {
    this.setState({ setUserRole: localStorage.getItem("userRole") });
  }
 }

 updateUserRole = (newUserRole: string) => {
  localStorage.setItem("userRole", newUserRole);
  this.setState({ setUserRole: newUserRole });
  console.log(this.state.setUserRole);
};


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
      token={this.state.setToken} setUserName={this.updateUsername} setComments={this.state.setComments} 
      /> 
      ) : (
     <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      updateUserRole={this.updateUserRole}

      />
     )
  };

  protectedViewTwo = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
      <UserProfile 
      token={this.state.setToken} setUsername={this.updateUsername} setComments={this.state.setComments} updateUserRole={this.updateUserRole}
      />
    ) : (
      <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      updateUserRole={this.updateUserRole}

      />
    )
  }

  protectedViewThree = () => {
    return this.state.setToken === localStorage.getItem("token") ? (
        <Admin 
        token={this.updateToken}
        setUserName={this.updateUsername}
        updateUserRole={this.updateUserRole}

        />
    ) : (
      <Auth
      token={this.updateToken}
      updateUserName={this.updateUsername}
      setUsername={this.updateUsername}
      updateUserRole={this.updateUserRole}

      />
    )
  }

render() {
  return (
    <div className="App">
      <Router>

      <SiteBar clearToken={this.clearToken} protectedViews={this.protectedViews} protectedViewsTwo={this.protectedViewTwo} protectedViewsThree={this.protectedViewThree}/> 
      
      </Router>
    </div>
  )

  }
};

export default App;