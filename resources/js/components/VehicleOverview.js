import React, { Component } from 'react'
import { Row, Col, Card, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExpandAlt, faStopwatch, faBicycle } from '@fortawesome/free-solid-svg-icons'

class VehicleOverview extends Component
{
    constructor (props) {
        super(props);
        
        this.renderContainer = this.renderContainer.bind(this);
    }
    
    renderContainer (vehicle) {
        var linkpath = "/vehicle/" + vehicle.id;
        
        return (
            
            <Col key={vehicle.id} sm>
                <Card>
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
                                <FontAwesomeIcon className="text-muted" icon={ faExpandAlt } /> {vehicle.sum_distance}
                                &nbsp;&nbsp;
                                <FontAwesomeIcon className="text-muted" icon={ faStopwatch } /> {vehicle.sum_time} h
                            </Card.Text>
                        </Card.Body>
                    </Link>
                </Card>
            </Col>
            
        );
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
            </Row>
            </>
        )
    }
}

/*
{this.renderContainer(vehicles[0])}
*/

export default VehicleOverview