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
            edit_id: this.props.match.params.log_id || null,
            vehicle_id: this.props.match.params.vehicle_id || null,
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
    
    componentDidMount() {
        if (this.props.match.params.edit_id) {
            this.setState({
                edit_id: this.props.match.params.edit_id
            });
        } else {
            return;
        }
        
        axios.get('/api/log/' + this.props.match.params.edit_id)
            .then(response => {
                
                var dsptring = response.data.date.split(' ');
                var date = new Date();;
                try {
                    date = new Date(dsptring[0]);
                } catch(err) {
                    date = new Date();
                }
                
                
                this.setState({
                    vehicle_id: response.data.vehicle_id,
                    date: date,
                    start: response.data.start, 
                    finish: response.data.finish, 
                    time: response.data.time, 
                    distance: response.data.distance, 
                });
            })
            .catch(error => {
                alert(error)
            });
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
    
    onSubmit(event) {
        event.preventDefault();
        
        var d = this.state.date;
        var datestr = d.getFullYear() + "-" + ("0" + (d.getMonth() + 1)).slice(-2) + "-" + ("0" + d.getDate()).slice(-2);
        
        var details = {
            date: datestr,
            start: this.state.start, 
            finish: this.state.finish,
            time: this.state.time, 
            distance: this.state.distance
        }
        
        var submit_fct = axios.put;
        var submit_url = "/api/log/" + this.state.vehicle_id;
        if (this.state.edit_id) {
            submit_fct = axios.post;
            submit_url = "/api/log/" + this.state.edit_id;
        }
        
        submit_fct(submit_url, details)
            .then(response => {
                this.setState({ redirect: '/vehicle/' + this.state.vehicle_id });
            })
            .catch(error => {
                alert(error);
            })
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
                    <Form.Control value={this.state.start} type="text" name="start" placeholder="Zuhause" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Der Startpunkt der Fahrt
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group as={Col} controlId="formBasicFinish">
                    <Form.Label>Ziel</Form.Label>
                    <Form.Control value={this.state.finish} type="text" name="finish" placeholder="REWE" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Das Ziel der Fahrt
                    </Form.Text>
                  </Form.Group>
              </Form.Row>
              
              <Form.Row>
                  <Form.Group as={Col} controlId="formBasicTime">
                    <Form.Label>Zeit</Form.Label>
                    <Form.Control value={this.state.time} type="number" name="time" placeholder="12" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Die Fahrzeit in Minuten
                    </Form.Text>
                  </Form.Group>
                  
                  <Form.Group as={Col} controlId="formBasicDistance">
                    <Form.Label>Distanz</Form.Label>
                    <Form.Control value={this.state.distance} type="text" name="distance" placeholder="5,6" onChange={this.handleChange} required />
                    <Form.Text className="text-muted">
                      Die Distanz in km
                    </Form.Text>
                  </Form.Group>
              </Form.Row>
              
              
              

              <Button variant="primary" type="submit">
                {submit_text}
              </Button>{' '}
              <Link to={'/vehicle/' + this.state.vehicle_id }>
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