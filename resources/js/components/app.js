import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Login from './Login'
import Register from './Register'

class App extends Component
{
    constructor (props) {
        super(props);
        this.state = {
            logged_in: false,
            user: {}
        };
    }
    
    authCallback(response) {
        this.state.logged_in = true;
        console.log(response);
    }
  
  
    render() {
        if (!this.state.logged_in) {
            return (
                <BrowserRouter>
                  <Switch>
                    <Route exact path='/' component={Login} 
                        handleLogin={this.authCallback.bind(this)} />
                    <Route path='/register' component={Register} 
                        handleLogin={this.authCallback.bind(this)} />
                  </Switch>
                </BrowserRouter>
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