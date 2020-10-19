import React, { Component } from 'react';
import {getNewTimeStamp} from './helpers/dateTimeHelpers.js';

export default class App extends Component {
  constructor(){
    super();

    this.state = {
        clickarray: [],
    };
  }
  
  handleClick = () => {
    const newClickArray = Object.assign( [] , this.state.clickarray );
    newClickArray.push(getNewTimeStamp());
    this.setState({clickarray: newClickArray});
  };

  componentDidUpdate(){
    document.title = this.state.clickarray.length.toString();
  };
  
  render() {
      const {clickarray} = this.state; 
    return( 
      <div>

      <h1>React With Class components</h1>

      <button onClick={this.handleClick} >Clique Aqui</button>

      <ul>
        {clickarray.map((item) => {
          return <li key={item}>{item}</li>;
      })}
      </ul>

      </div>

      );
    //return <ProjetoBase />;
  }
}
