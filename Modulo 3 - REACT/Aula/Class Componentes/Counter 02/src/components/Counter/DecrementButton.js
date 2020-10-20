import React, { Component } from 'react'

export default class DecrementButton extends Component {
    
    handlebuttonclick = () => {
        this.props.onDecremente('-');
    }
    
    render() {
        return (
            <button onClick = {this.handlebuttonclick} 
                    className="waves-effect waves-light btn red darken-4"
            >
             -
            </button>
        )
    }
}
