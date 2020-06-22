import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'


class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
          email: localStorage.getItem('email') || '',
          password: '',
          error: ''
      };
      
      this.handleChange = this.handleChange.bind(this);
      this.handleLogin = this.handleLogin.bind(this);
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
    
    handleLogin(event) {
        event.preventDefault();
        
        const credentials = {
            email: this.state.email,
            password: this.state.password
        };
        
        axios.post('/api/auth/login', credentials)
            .then(response => {
                this.props.onAuth(response.data);
            })
            .catch(error => {
                console.log(error);
                this.setState({
                    error: error.response.data.message
                });
            });
    }
    
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    
    render() {
        return (
            <Form className="form-login text-center" onSubmit={this.handleLogin}>
                <h1><FontAwesomeIcon className="brand-icon" icon={ faStream } /></h1>
                <h1 className="h3 mb-3 ont-weight-normal">Logbook</h1>
                
                <Form.Control className="corner-top" type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} required />
                
                <Form.Control className="corner-bottom" type="password" name="password" value={this.state.password} placeholder="Passwort" onChange={this.handleChange} required />
                
                <Button type="submit" variant="primary" size="lg" block>Login</Button>
                
                <Link to="/register" className="button-link"><Button variant="secondary" size="lg" block>Account erstellen</Button></Link>
                
                {this.renderError()}
            </Form>
        );
    }
}

export default Login