import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'


class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
          email: '',
          password: '',
          error: ''
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
      this.handleRegister = this.handleRegister.bind(this);
      this.renderError = this.renderError.bind(this);
    }
        
    renderError () {
        if (this.state.error) {
            return (
                <Alert variant="danger">
                    {this.state.error}
                </Alert>
            )
        }
    }
    
    handleLogin (event) {
        event.preventDefault();
        
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        
        axios.post('/api/login', credentials)
            .then(response => {
                console.log(response);
                this.setState({
                    error: 'success'
                });
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error.response.data.message
                });
            });
    }
    
    handleRegister (event) {
        this.setState({
            error: "Register"
        });
    }
    
    handleChange (event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <Form className="form-login text-center" onSubmit={this.handleLogin}>
                <h1><FontAwesomeIcon className="brand-icon" icon={ faStream } /></h1>
                <h1 className="h3 mb-3 ont-weight-normal">Logbook</h1>
                
                <Form.Control type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} required />
                
                <Form.Control type="password" name="password" value={this.state.password} placeholder="Passwort" onChange={this.handleChange} required />
                
                <Button type="submit" variant="primary" size="lg" block>Login</Button>
                <Button variant="secondary" size="lg" onClick={this.handleRegister} block>Account erstellen</Button>
                
                {this.renderError()}
            </Form>
        );
    }
}

export default Login