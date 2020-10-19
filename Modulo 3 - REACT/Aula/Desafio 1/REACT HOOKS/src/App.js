import React, { useEffect, useState } from 'react';
import { getNewTimeStamp } from './helpers/dateTimeHelpers.js';

export default function App () {

  const [clickarray , setClickarray] = useState([]);

  useEffect(() => {
    document.title = clickarray.length;
  })

  const handleClick = () => {
    const newClickArray = Object.assign( [] , clickarray );
    newClickArray.push(getNewTimeStamp());
    setClickarray(newClickArray);
    //this.setState({clickarray: newClickArray});
  };


  return( 
    <div>

    <h1>React With Hooks</h1>

    <button onClick={handleClick} >Clique Aqui</button>

    <ul>
      {clickarray.map((item) => {
        return <li key={item}>{item}</li>;
    })}
    </ul>

    </div>

    );

}
