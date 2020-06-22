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
        
        this.authCallback = this.authCallback.bind(this);
    }
    
    authCallback(data) {
        this.setState({
            logged_in: true, 
            user: {
                name: data.name,
                email: data.email, 
                access_token: data.access_token
            }
        });
        
        localStorage.setItem('email', data.email);
        localStorage.setItem('access_token', data.access_token);
    }
  
  
    render() {
        if (!this.state.logged_in) {
            return (
                <BrowserRouter>
                  <Switch>
                    <Route exact path='/' 
                        render={(props) => <Login {...props} onAuth={this.authCallback} />} />
                    <Route path='/register' 
                        render={(props) => <Register {...props} onAuth={this.authCallback} />} />
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