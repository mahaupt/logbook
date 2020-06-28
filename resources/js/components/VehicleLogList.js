import React, { Component } from 'react'
import Datetime from 'react-datetime'
import axios from 'axios'
import { Container, Row, Col, Table } from 'react-bootstrap'

class VehicleLogList extends Component
{
    constructor (props)
    {
        super(props);
        
        this.state = {
        }
        
        this.renderLog = this.renderLog.bind(this);
    }
    
    renderLog(log, vehicles)
    {
        var dsptring = log.date.split(' ');
        var date = new Date(dsptring[0]);
        
        return (
            <tr key={log.id}>
              <td>
                {date.getDate()}.&nbsp;
                {date.getMonth()}.&nbsp;
                {date.getFullYear()}
              </td>
              <td>{log.start}</td>
              <td>{log.finish}</td>
              <td>{log.time} min</td>
              <td>{log.distance} km</td>
            </tr>
        )
    }
    
    render ()
    {
        const { logs } = this.props;
        
        return (
            <>
            <Row>
              <Col style={{marginTop: '15px'}}>
                <h6>Die letzten Fahrten:</h6>
              </Col>
            </Row>
            <Row>
              <Col>
              <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>#</th>
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

export default VehicleLogList