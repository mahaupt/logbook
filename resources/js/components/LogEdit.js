import React, { Component } from 'react'
import DatePicker from 'react-datepicker'
import { Link, Redirect } from "react-router-dom";
import { Col, Row, Form, Button } from 'react-bootstrap'
import axios from 'axios'
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale, setDefaultLocale } from  "react-datepicker";
import de from 'date-fns/locale/de';

class LogEdit extends Component {
    constructor (props) {
        super(props);
        
        registerLocale('de', de);
        
        this.state = {
            edit_id: null,
            redirect: null,
            date: new Date(),
            start: '',
            finish: '',
            time: 0,
            distance: 0.0,
        }
        
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeDate = this.handleChangeDate.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    
    handleChangeDate(date) {
        this.setState({
          date: date
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
              <Form.Group controlId="formBasicDate">
                <Form.Label>Datum</Form.Label><br />
                <DatePicker 
                    name="date" 
                    selected={this.state.date} 
                    onChange={this.handleChangeDate} 
                    locale="de" 
                    dateFormat="dd-MM-yyyy"
                />
              </Form.Group>
                
              <Form.Row>
                  <Form.Group as={Col} controlId="formBasicStart">
                    <Form.Label>Start</Form.Label>
                    <Form.Control value={this.state.name} type="text" name="start" placeholder="Zuhause" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Der Startpunkt der Fahrt
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group as={Col} controlId="formBasicFinish">
                    <Form.Label>Ziel</Form.Label>
                    <Form.Control value={this.state.bike_id} type="text" name="finish" placeholder="REWE" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Das Ziel der Fahrt
                    </Form.Text>
                  </Form.Group>
              </Form.Row>
              
              <Form.Row>
                  <Form.Group as={Col} controlId="formBasicTime">
                    <Form.Label>Zeit</Form.Label>
                    <Form.Control value={this.state.name} type="number" name="time" placeholder="12" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Die Fahrzeit in Minuten
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group as={Col} controlId="formBasicDistance">
                    <Form.Label>Distanz</Form.Label>
                    <Form.Control value={this.state.bike_id} type="number" name="distance" placeholder="5,6" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Die Distanz in km
                    </Form.Text>
                  </Form.Group>
              </Form.Row>
              
              
              

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