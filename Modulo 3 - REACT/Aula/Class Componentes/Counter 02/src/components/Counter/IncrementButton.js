import React, { Component } from 'react'

export default class IncrementButton extends Component {
    handlebuttonclick = () => {
        this.props.onIncremente('+');
    }
    
    render() {
        return (
            <button onClick = {this.handlebuttonclick} 
                    className="waves-effect waves-light btn green darken-4"
            >
             +
            </button>
        )
    }
}
