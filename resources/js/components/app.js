import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Login from './Login'

class App extends Component
{
    constructor (props) {
        super(props);
        this.state = {
          loggedIn: false,
          user: {}
      };
    }
  
  
    render() {
        if (!this.state.loggedIn) {
            return (
                <Login />
            );
        } else {
            return (
                <h1>Dashboard</h1>
            )
        }
    }
}

ReactDOM.render(
    <App/>, 
    document.getElementById('app')
);