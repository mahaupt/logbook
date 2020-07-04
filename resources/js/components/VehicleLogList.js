import React, { Component } from 'react'
import Datetime from 'react-datetime'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'

class VehicleLogList extends Component
{
    constructor (props)
    {
        super(props);
        
        this.state = {
        }
        
        this.renderLog = this.renderLog.bind(this);
        this.deleteLog = this.deleteLog.bind(this);
    }
    
    deleteLog(id)
    {
        axios.delete("/api/log/" + id)
            .then(response => {
                this.props.refreshLogs();
            })
            .catch(error => {
                alert(error);
            })
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
              <td>
                {log.editable && 
                <>
                  <Link to={"/editlog/" + log.id}><FontAwesomeIcon icon={ faEdit } /></Link> -&nbsp;
                  <Link to="#" onClick={() => this.deleteLog(log.id)}><FontAwesomeIcon icon={ faTrashAlt } /></Link>
                </>
                }
              </td>
            </tr>
        )
    }
    
    render ()
    {
        const { logs, vehicleId } = this.props;
        
        return (
            <>
            <Row>
              <Col style={{marginTop: '15px'}}>
                <h6>Die letzten Fahrten:</h6>
                <Link to={"/newlog/" + vehicleId}>
                  <Button variant="primary">
                    Fahrt hinzufügen
                  </Button>
                </Link>
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
                  <th>Aktion</th>
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