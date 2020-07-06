import React from 'react';
import './App.css';
import Auth from './auth/auth';
import { render } from '@testing-library/react';

class App extends React.Component<{}, {}> {
  constructor(props: any){
  super(props)
  };

/*
 componentWillMount() {
  console.log('test this');
 };
 componentDidMOunt() {

 }
*/
render() {
  return (
    <div className="App">
      <h1>Develop Branch!!</h1>
      <h2>Slayde's Branch</h2>
      <h3>Brad's branch</h3>
      <Auth />
    </div>
  )
}
};

export default App;
