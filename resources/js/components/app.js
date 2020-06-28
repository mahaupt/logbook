import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import axios from 'axios'
import Login from './Login'
import Register from './Register'
import Dashboard from './Dashboard'


class App extends Component
{
    constructor (props) {
        super(props);
        this.state = {
            logged_in: false,
            user: {}
        };
        
        var token = localStorage.getItem('access_token') || false;
        if (token) {
            this.getUserdata();
        }
        
        this.authCallback = this.authCallback.bind(this);
        this.logoutCallback = this.logoutCallback.bind(this);
    }
    
    
    
    getUserdata(token)
    {    
        axios.get('/api/auth/user')
            .then(response => {
                this.setState({
                    logged_in: true, 
                    user: {
                        name: response.data.name,
                        email: response.data.email,
                        access_token: token
                    }
                });
            })
            .catch(error => {
                //nothing to do
                localStorage.removeItem('access_token');
                console.log(error);
            });
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
    
    
    logoutCallback() {
        this.setState({
            logged_in: false
        });
        localStorage.removeItem('access_token');
    }
  
  
    render() {
        if (!this.state.logged_in) {
            return (
                <BrowserRouter>
                  <Switch>
                    <Route path='/register' 
                        render={(props) => <Register {...props} onAuth={this.authCallback} />} />
                    <Route 
                        render={(props) => <Login {...props} onAuth={this.authCallback} />} />
                  </Switch>
                </BrowserRouter>
            );
        } else {
            return (
                <Dashboard user={this.state.user} onLogout={this.logoutCallback} />
            )
        }
    }
}

ReactDOM.render(
    <App/>, 
    document.getElementById('app')
);