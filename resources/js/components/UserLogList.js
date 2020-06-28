import React, { Component } from 'react'
import Datetime from 'react-datetime'
import axios from 'axios'
import { Container, Row, Col, Table } from 'react-bootstrap'

class UserLogList extends Component
{
    constructor (props)
    {
        super(props);
        
        this.state = {
            logs: [], 
            vehicles: {} 
        }
        
        this.indexVehicles = this.indexVehicles.bind(this);
        this.renderLog = this.renderLog.bind(this);
    }
    
    indexVehicles(vehicles)
    {   
        this.setState((state, props) => {
            for(var i in vehicles) {
                var vehicle = vehicles[i];
                state.vehicles[vehicle.id] = vehicle.name;
            }
            return state;
        });
    }
    
    componentDidUpdate(prevProps)
    {
        if (Object.keys(this.state.vehicles).length !== this.props.vehicles.length) {
            this.indexVehicles(this.props.vehicles);
        }
    }
    
    componentDidMount() 
    {
        
        axios.get('/api/logs')
            .then(response => {
                var logs = response.data;
                logs = _.sortBy(logs, (l) => -l.id);
                this.setState({
                    logs: logs
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    renderLog(log, vehicles)
    {
        var dsptring = log.date.split(' ');
        var date = new Date(dsptring[0]);
        var vehicle = this.state.vehicles[log.vehicle_id];
        
        return (
            <tr key={log.id}>
              <td>
                {date.getDate()}.&nbsp;
                {date.getMonth()}.&nbsp;
                {date.getFullYear()}
              </td>
              <td>{vehicle}</td>
              <td>{log.start}</td>
              <td>{log.finish}</td>
              <td>{log.time} min</td>
              <td>{log.distance} km</td>
            </tr>
        )
    }
    
    render ()
    {
        const { logs } = this.state;
        
        return (
            <>
            <Row>
              <Col>
                <h6>Deine letzten Fahrten:</h6>
              </Col>
            </Row>
            <Row>
              <Col>
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Fahrzeug</th>
                  <th>Start</th>
                  <th>Ziel</th>
                  <th>Zeit</th>
                  <th>Distanz</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => {
                    return this.renderLog(log)
                })}
              </tbody>
              </Table>
              </Col>
            </Row>
            </>
        )
    }
}

export default UserLogList