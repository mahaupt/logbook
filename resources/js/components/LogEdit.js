import React, { Component } from 'react'
import DateTime from 'react-datetime'
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

class LogEdit extends Component {
    constructor (props) {
        super(props);
        
        var d = new Date();
        var dstring = d.getDate() + "-" + d.getMonth() + "-" + d.getFullYear();
        
        this.state = {
            edit_id: null,
            redirect: null,
            date: dstring,
            start: '',
            finish: '',
            time: 0,
            distance: 0.0,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    
    onSubmit() {
        
    }
    
    
    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        var submit_text = "Eintrag hinzufügen";
        if (this.state.edit_id) {
            submit_text = "Speichern";
        }
        
        
        
  
        return (
            <Row>
            <Col>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicName">
                <DateTime 
                    locale="de"
                    name="date"
                    dateFormat="DD-MM-YYYY"
                    timeFormat={false}
                    onChange={this.handleChange}
                    value={this.state.date} 
                />
                
                <Form.Label>Name des Fahrzeugs</Form.Label>
                <Form.Control value={this.state.name} type="text" name="name" placeholder="Name" onChange={this.handleChange} required />
                <Form.Text className="text-muted">
                  Der Name oder die Beschreibung des Fahrzeugs
                </Form.Text>
              </Form.Group>
              
              <Form.Group controlId="formBasicBikeId">
                <Form.Label>Name des Fahrzeugs</Form.Label>
                <Form.Control value={this.state.bike_id} type="text" name="bike_id" placeholder="RH6728LZ" onChange={this.handleChange} required />
                <Form.Text className="text-muted">
                  Die Rahmennummer des Fahrzeugs
                </Form.Text>
              </Form.Group>

              <Button variant="primary" type="submit">
                {submit_text}
              </Button>{' '}
              <Link to='/'>
                  <Button variant="secondary">
                    Abbrechen
                  </Button>
              </Link>
            </Form>
            </Col>
            </Row>
        );
    }
    
    
}

export default LogEdit;