import React from 'react';
import './App.css';
import Auth from './auth/auth';
import { render } from '@testing-library/react';


type valueType = {
  sessionToken: string,
  setSessionToken: string
}

type acceptedProps = {
  token: string
}
class App extends React.Component<{acceptedProps}, {valueType}> {
  constructor(props: acceptedProps){
    super(props);
    this.state = {
      token: "",
      setSessionToken: ""
    }

  };

/*
 componentWillMount() {
  console.log('test this');
 };
 componentDidMOunt() {

 }


function App() {
  const [sessionToken, setSessionToken] = useState('');
  
  useEffect(() => {
    if (localStorage.getItem('token')){
      setSessionToken(localStorage.getItem('token'));
    }
  }, [])

  const updateToken = (newToken) => {
    localStorage.setItem('token', newToken);
    setSessionToken(newToken);
    console.log(sessionToken);
  }
  const clearToken = () => {//building our logout function. resetting the state of our sessionToken to an empty string and clearing our token from our local storage.
    localStorage.clear();
    setSessionToken('');
  }

  const protectedViews = () => {
    return(sessionToken === localStorage.getItem('token') ? <FoodIndex token={sessionToken} /> 
    : <Auth updateToken={updateToken} />)
  }


  return (
    <div style={{backgroundColor:'#f5d1c4',
    backgroundImage:'url("https://www.transparenttextures.com/patterns/black-linen.png")'}}>
      <Sitebar clearToken={clearToken} /> 
      {protectedViews()}
    </div>
  );
}
*/
render() {
  return (
    <div className="App">
      <h1>Develop Branch!!</h1>
      <h2>Slayde's Branch</h2>
      <h3>Brad's branch</h3>
      <Auth />
      {protectedViews()}
    </div>
  )
}
};

export default App;
