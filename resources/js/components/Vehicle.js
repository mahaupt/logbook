import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faExpandAlt, faStopwatch, faBicycle } from '@fortawesome/free-solid-svg-icons'
import VehicleLogList from './VehicleLogList'
import UserManagement from './UserManagement'

class Vehicle extends Component
{
    constructor (props) {
        super(props);
        
        this.state = {
            id: this.props.match.params.id, 
            redirect: null,
            vehicle: {}, 
            logs: []
        }
        
        this.deleteVehicle = this.deleteVehicle.bind(this);
        this.loadLogs = this.loadLogs.bind(this);
    }
    
    componentDidMount()
    {
        this.loadVehicle();
        this.loadLogs();
    }
    
    deleteVehicle()
    {
        axios.delete('/api/vehicle/' + this.state.id)
            .then(response => {
                this.setState({
                    redirect: "/"
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    loadVehicle() 
    {
        axios.get('/api/vehicle/' + this.state.id)
            .then(response => {
                this.setState({
                    vehicle: response.data
                });
            })
            .catch(error => {
                alert(error);
            });
    }
    
    loadLogs() {
        axios.get('/api/logs/' + this.state.id)
            .then(response => {
                this.setState({
                    logs: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    render () {
        var sum_time_h = Math.floor(this.state.vehicle.sum_time/60);
        var sum_time_m = this.state.vehicle.sum_time - sum_time_h*60;
        
        if (this.state.redirect) {
            return <Redirect to={this.state.redirect} />
        }
        
        return (
          <>
            <Row>
              <Col>
                <Link to="/">
                  <Button variant="primary">Zurück</Button>
                </Link>{' '}
                {this.state.vehicle.pivot && this.state.vehicle.pivot.role == 'admin' &&
                <>
                <Link to={"/edit/" + this.state.id }>
                  <Button variant="secondary">Bearbeiten</Button>
                </Link>{' '}
                <Button variant="danger" onClick={this.deleteVehicle}>Löschen</Button>
                </>
                }
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
                      Fahrzeit: <FontAwesomeIcon className="text-muted" icon={ faStopwatch } /> {sum_time_h}:{sum_time_m} h
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            {this.state.vehicle.pivot && this.state.vehicle.pivot.role == 'admin' &&
            <UserManagement userId={this.state.vehicle.pivot.user_id} vehicleId={this.state.vehicle.id} />    
            }
            
            <VehicleLogList refreshLogs={this.loadLogs} vehicleId={this.state.vehicle.id} logs={this.state.logs} />
          </>
        )
    }
}

export default Vehicle