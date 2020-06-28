import React, { Component } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHashtag, faExpandAlt, faStopwatch, faBicycle, faPlus } from '@fortawesome/free-solid-svg-icons'

class VehicleOverview extends Component
{
    constructor (props) {
        super(props);
        
        this.renderContainer = this.renderContainer.bind(this);
        this.renderNewBikeButton = this.renderNewBikeButton.bind(this);
    }
    
    renderContainer (vehicle) {
        var linkpath = "/vehicle/" + vehicle.id;
        
        var sum_time_h = Math.floor(vehicle.sum_time/60);
        var sum_time_m = vehicle.sum_time - sum_time_h*60;
        
        return (
            
            <Col key={vehicle.id} xs="12" sm="6" style={{marginBottom: '15px'}}>
              <Card className="vehicle-col">
                <Link to={linkpath} className="hidden-link">
                  <Card.Body>
                    <Card.Title>
                      <FontAwesomeIcon icon={ faBicycle } />&nbsp;
                      {vehicle.name}
                    </Card.Title>
                    <Card.Subtitle className="mb-2">
                      <Badge variant="secondary">{vehicle.bike_id}</Badge>
                    </Card.Subtitle>
                    <Card.Text>
                      <FontAwesomeIcon className="text-muted" icon={ faHashtag } />
                      {vehicle.drives}
                      &nbsp;&nbsp;
                      <FontAwesomeIcon className="text-muted" icon={ faExpandAlt } /> {vehicle.sum_distance} km
                      &nbsp;&nbsp;
                      <FontAwesomeIcon className="text-muted" icon={ faStopwatch } /> {sum_time_h}:{sum_time_m} h
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </Col>
            
        );
    }
    
    renderNewBikeButton()
    {
      return (
        <Col key='new' xs="12" sm="6">
          <Card className="vehicle-col">
            <Link to="/new" className="hidden-link" style={{'marginTop': '15px'}}>
              <Card.Body>
                <h1 className="text-center"><FontAwesomeIcon className="text-muted" icon={ faPlus } /></h1>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      )
    }
    
    render () {
        const { vehicles } = this.props;
        
        return (
            <>
            <Row>
            <Col><h6>Deine Fahrzeuge:</h6></Col>
            </Row>
            <Row>
                {vehicles.map((vehicle) => {
                    return this.renderContainer(vehicle)
                })}
                {this.renderNewBikeButton()}
            </Row>
            </>
        )
    }
}

/*
{this.renderContainer(vehicles[0])}
*/

export default VehicleOverview