import React from 'react';
import './App.css';
import Auth from './auth/auth';
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
  console.log('test this');
 };
 componentDidMOunt() {
 }

render() {
  return (
    <div className="App">
      <Auth />
      {protectedViews()}
    </div>
  )
}
};

export default App;