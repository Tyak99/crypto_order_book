import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import DropdownSelect from './dropdownSelect';
import './asset/index.css';
import Chart from './chart';
import usePrevious from './helper.js/previousState';

const App = () => {

  const [currencyPair, setcurrencyPair] = useState('');
  const [data, setData] = useState([])
  const [socket, setSocket] = useState(new WebSocket('wss://ws.bitstamp.net'));
  const previousCurrencyPair = usePrevious(currencyPair);
  
  const subscribeStreamData = {
    "event": "bts:subscribe",
    "data": {
        "channel": `order_book_${currencyPair}`
    }
  }
  const unsubscribeStreamData = {
    "event": "bts:unsubscribe",
    "data": {
        "channel": `order_book_${previousCurrencyPair}`
    }
  }

  useEffect(() => {
    console.log("TCL: App -> socket", socket)

    if (previousCurrencyPair) {
      socket.send(JSON.stringify(unsubscribeStreamData))
    }
    if (currencyPair) {
      if(socket.readyState == 0) {
        return socket.onopen = () => {
          socket.send(JSON.stringify(subscribeStreamData))
        }
      }
      socket.send(JSON.stringify(subscribeStreamData))
    }
    // handle message from socket
    socket.onmessage = (event) => {
      if (!JSON.parse(event.data).data.asks) {
        console.log("TCL: socket.onmessage -> event", JSON.parse(event.data))
      }
      setData(JSON.parse(event.data).data)
    }
    //handle errror from socket
    socket.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    }
  }, [currencyPair])

  const getCurrencyPair = (value) => {
    setcurrencyPair(value.value)
  }

  return (
      <div className='container'>
          <h1 className='header'> Welcome to Order Book </h1>
          <hr/>
          <DropdownSelect getCurrencyPair={getCurrencyPair}/>
          <Chart data={data}/>
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));