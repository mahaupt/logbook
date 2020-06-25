import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faExpandAlt, faStopwatch, faBicycle } from '@fortawesome/free-solid-svg-icons'

class Vehicle extends Component
{
    constructor (props) {
        super(props);
        
        this.state = {
            id: this.props.match.params.id, 
            vehicle: {}, 
            log: {}
        }
    }
    
    componentDidMount()
    {
        this.loadVehicle();
        this.loadLog();
    }
    
    loadVehicle() 
    {
        axios.get('/api/vehicle/' + this.state.id)
            .then(response => {
                this.setState({
                    vehicle: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    loadLog() {
        axios.get('/api/logs/' + this.state.id)
            .then(response => {
                this.setState({
                    log: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    render () {
        return (
          <>
            <Row>
              <Col>
                <Link to="/">
                  <Button>Zurück</Button>
                </Link>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Card.Body>
                    <Card.Title>
                      <FontAwesomeIcon icon={ faBicycle } />&nbsp;
                      {this.state.vehicle.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                      Rahmennummer: <Badge variant="secondary">{this.state.vehicle.bike_id}</Badge>
                    </Card.Subtitle>
                    <Card.Text>
                      Fahrten: <FontAwesomeIcon className="text-muted" icon={ faHashtag } />
                      {this.state.vehicle.drives}
                      &nbsp;&nbsp;
                      Distanz: <FontAwesomeIcon className="text-muted" icon={ faExpandAlt } /> {this.state.vehicle.sum_distance} km
                      &nbsp;&nbsp;
                      Fahrzeit: <FontAwesomeIcon className="text-muted" icon={ faStopwatch } /> {this.state.vehicle.sum_time} h
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </>
        )
    }
}

export default Vehicle