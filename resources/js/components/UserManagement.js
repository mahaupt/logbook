import React, { Component } from 'react'
import { Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

class UserManagement extends Component
{
    constructor (props)
    {
        super(props);
        
        this.state = {
            users: []
        }
        
        this.renderUser = this.renderUser.bind(this);
    }
    
    componentDidMount() {
        if (!this.props.vehicleId) return;
        
        axios.get("/api/vehicle/" + this.props.vehicleId + "/users")
            .then(response => {
                this.setState({
                    users: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    renderUser(user)
    {
        if (user.id == this.props.userId) {
            return;
        }
        
        var rolestr = "Benutzer";
        if (user.pivot.role == 'admin') {
            rolestr = "Admin";
        }
        
        return (
            <Col key={"u-" + user.id} xs="12" sm="6">
              <Card>
                <Card.Body>
                  <h6>{user.name} ({rolestr}){' - '}
                    <Link to="#" onClick={() => this.deleteLog(log.id)}><FontAwesomeIcon icon={ faTrashAlt } /></Link>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
        )
    }
    
    render() {
        const { users } = this.state;
        
        return (
        <>
          <Row style={{marginTop: '15px'}}>
            <Col><h6>User Management:</h6></Col>
          </Row>
          <Row>
              {users.map((user) => {
                  return this.renderUser(user)
              })}
              <Col key="u-+" xs="12" sm="6">
                <Card>
                  <Card.Body>
                      <Form.Control as="select">
                        <option>Neuer Benutzer</option>
                        <option>Dritet HJKLAS</option>
                      </Form.Control>
                      <Form.Control as="select">
                        <option>Benutzer</option>
                        <option>Admin</option>
                      </Form.Control>
                      <Button variant="primary">Hinzufügen</Button>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </>
        )
    }
}

export default UserManagement