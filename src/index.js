import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import DropdownSelect from './dropdownSelect';
import './asset/index.css';
import Chart from './chart';

const App = () => {
  const streamData = {
    "event": "bts:subscribe",
    "data": {
        "channel": "order_book_btcusd"
    }
  }

  const [data, setData] = useState([]) 

  useEffect(() => {
    const socket = new WebSocket('wss://ws.bitstamp.net');
    socket.onopen = () => {
      socket.send(JSON.stringify(streamData))
    }
    socket.onmessage = (event) => {
      setData(JSON.parse(event.data).data)
      
    }
  }, [])

  return (
      <div className='container'>
          <h1 className='header'> Welcome to Order App </h1>
          <hr/>
          <DropdownSelect />
          <Chart data={data}/>
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));