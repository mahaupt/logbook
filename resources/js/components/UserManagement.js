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
            users: [], 
            remaining_users: [], 
            add_user: "-1",
            add_user_role: "user"
        }
        
        this.renderUser = this.renderUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.removeUser = this.removeUser.bind(this);
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
            
        axios.get("/api/vehicle/" + this.props.vehicleId + "/remaining_users")
            .then(response => {
                this.setState({
                    remaining_users: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    handleChange(event) {
        this.setState({
          [event.target.name]: event.target.value
        })
    }
    
    onSubmit(event)
    {
        event.preventDefault();
        
        if (this.state.add_user == -1) {
            alert("Bitte wähle einen Benutzer aus!");
            return;
        }
        
        var data = {
            'user_id': this.state.add_user,
            'role': this.state.add_user_role
        }
        
        axios.put("/api/vehicle/" + this.props.vehicleId + "/users", data)
            .then(response => {
                this.componentDidMount();
            })
            .catch(error => {
                alert(error);
            });    
    }
    
    removeUser(userid)
    {
        
        axios.delete("/api/vehicle/" + this.props.vehicleId + "/users?user_id=" + userid)
            .then(response => {
                this.componentDidMount();
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
                    <Link to="#" onClick={() => this.removeUser(user.id)}><FontAwesomeIcon icon={ faTrashAlt } /></Link>
                  </h6>
                </Card.Body>
              </Card>
            </Col>
        )
    }
    
    render() {
        const { users, remaining_users } = this.state;
        
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
                      <Form onSubmit={this.onSubmit}>
                          <Form.Control as="select" name="add_user" value={this.state.add_user} onChange={this.handleChange}>
                            <option value="-1">Neuer Benutzer</option>
                            {remaining_users.map((user) => {
                                return (
                                    <option key={user.id} value={user.id}>{user.name}</option>
                                )
                            })}
                          </Form.Control>
                          <Form.Control as="select" name="add_user_role" value={this.state.add_user_role} onChange={this.handleChange}>
                            <option value="user">Benutzer</option>
                            <option value="admin">Admin</option>
                          </Form.Control>
                          <Button variant="primary" type="submit">Hinzufügen</Button>
                      </Form>
                  </Card.Body>
                </Card>
              </Col>
          </Row>
        </>
        )
    }
}

export default UserManagement