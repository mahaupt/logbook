import React, { Component } from 'react'


class Dashboard extends Component {
    render() {
        return (
            <h1>Hallo {this.props.user.name}</h1>
        )
    }
}

export default Dashboard