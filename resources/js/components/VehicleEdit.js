import React, { Component } from 'react'
import { Redirect } from "react-router-dom";
import { Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'

class VehicleEdit extends Component
{
    constructor (props) {
        super(props);
        
        this.state = {
            edit_id: null,
            redirect: null,
            name: '',
            bike_id: ''
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    componentDidMount() {
        if (this.props.match.params.edit_id) {
            this.setState({
                edit_id: this.props.match.params.edit_id
            });
        } else {
            return;
        }
        
        axios.get('/api/vehicle/' + this.props.match.params.edit_id)
            .then(response => {
                this.setState({
                    name: response.data.name,
                    bike_id: response.data.bike_id
                })
            })
            .catch(error => {
                alert(error)
            });
    }
    
    onSubmit(event) {
        event.preventDefault();
        
        const details = {
            name: this.state.name,
            bike_id: this.state.bike_id
        }
        
        var submit_fct = axios.put;
        var submit_url = '/api/vehicle';
        if (this.state.edit_id) {
            submit_fct = axios.post;
            submit_url = submit_url + '/' + this.state.edit_id;
        }
        
        submit_fct(submit_url, details)
            .then(response => {
                this.setState({ redirect: "/" });
            })
            .catch(error => {
                alert(error);
            });
    }
    
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    
    render () {
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        var submit_text = "Fahrzeug hinzufügen";
        if (this.state.edit_id) {
            submit_text = "Speichern";
        }
  
        return (
            <Row>
            <Col>
            <Form onSubmit={this.onSubmit}>
              <Form.Group controlId="formBasicName">
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
              <Button variant="secondary" type="cancel">
                Abbrechen
              </Button>
            </Form>
            </Col>
            </Row>
        );
    }
}

export default VehicleEdit