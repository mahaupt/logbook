import React, { Component } from 'react'
import axios from 'axios'
import ReactDOM from 'react-dom'
import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'


class Register extends Component {
    constructor (props) {
        super(props);
        this.state = {
          name: '',
          email: '',
          password: '',
          password_confirmation: '', 
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
            name: this.state.name, 
            email: this.state.email,
            password: this.state.password, 
            password_confirmation: this.state.password_confirmation
        };
        
        axios.post('/api/auth/register', credentials)
            .then(response => {
                this.props.authCallback(response);
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
                <h1 className="h3 mb-3 ont-weight-normal">Account erstellen</h1>
                
                <Form.Control className="corner-top" type="text" name="name" value={this.state.name} placeholder="Vor- und Nachname" onChange={this.handleChange} required />
                
                <Form.Control className="corner-middle" type="email" name="email" value={this.state.email} placeholder="Email" onChange={this.handleChange} required />
                
                <Form.Control className="corner-middle" type="password" name="password" value={this.state.password} placeholder="Passwort" onChange={this.handleChange} required />
                
                <Form.Control className="corner-bottom" type="password" name="password_confirmation" value={this.state.password_confirmation} placeholder="Passwort Wdh." onChange={this.handleChange} required />
        
                <Button type="submit" variant="primary" size="lg" block>Account erstellen</Button>
                <Link to="/" className="button-link"><Button variant="secondary" size="lg" block>Zurück</Button></Link>
                
                {this.renderError()}
            </Form>
        );
    }
}

export default Register