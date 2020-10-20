import React, { Component } from 'react';
import css from './counter.module.css';
import DecrementButton from './DecrementButton';
import IncrementButton from './IncrementButton';
import Steps from './Steps';
import Value from './Value';

export default class Counter extends Component {
    constructor(){
        super();

        this.state = {
            currentCounter: 2 ,
            steps: 0 ,
        };
    }

    handleButtonClick = (clicktype) => {
        const { currentCounter , steps } = this.state;
        this.setState({
            currentCounter: (clicktype === '+') ? currentCounter + 1 : currentCounter - 1 ,
            steps: steps + 1 ,
        });
    };

    render() {
        const { currentCounter , steps } = this.state;
        return (
            <div className={css.counterContainer} >
                <DecrementButton onDecremente ={this.handleButtonClick} />
                <Value Value = {currentCounter}  />
                <IncrementButton onIncremente={this.handleButtonClick}/>
                <Steps Steps={steps} />
            </div>
        )
    }
}
