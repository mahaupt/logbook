import React, { Component } from 'react'
import axios from 'axios'


class Dashboard extends Component {
    constructor (props) {
        super(props);
        
        this.state = {
            vehicles: []
        }
        
    }
    
    
    componentDidMount() 
    {
        
        axios.get('/api/vehicles')
            .then(response => {
                this.setState({
                    vehicles: response.data
                })
            })
            .catch(error => {
                alert(error);
            });
    }
    
    
    
    render() {
        const { vehicles } = this.state;
        
        return (
            <div>
                <h1>Hallo {this.props.user.name}</h1>
                <strong>Deine Fahrzeuge:</strong>
                <ul>
                    {vehicles.map(vehicle => (
                        <li>{vehicle.name} - ({vehicle.bike_id})</li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default Dashboard