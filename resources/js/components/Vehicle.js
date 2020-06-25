import React, { Component } from 'react'

class Vehicle extends Component
{
    constructor (props) {
        super(props);
        
        this.state = {
            id: this.props.match.params.id
        }
    }
    
    render () {
        return (
            <h1>Hello {this.state.id}</h1>
        )
    }
}

export default Vehicle