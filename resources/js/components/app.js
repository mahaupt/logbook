import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStream } from '@fortawesome/free-solid-svg-icons'

class App extends Component
{
    render() {
        return (
            <Form className="form-login text-center">
                <h1><FontAwesomeIcon className="brand-icon" icon={ faStream } /></h1>
                <h1 className="h3 mb-3 ont-weight-normal">Logbook</h1>
                <Form.Control type="email" placeholder="Email" required />
                <Form.Control type="password" placeholder="Passwort" required />
                <Button variant="primary" size="lg" block>Login</Button>
                <Button variant="secondary" size="lg" block>Account erstellen</Button>
            </Form>
        )
    }
}

ReactDOM.render(
    <App/>, 
    document.getElementById('app')
);