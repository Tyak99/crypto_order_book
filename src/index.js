import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import DropdownSelect from './dropdownSelect';
import './asset/index.css';
import Chart from './chart';
import usePrevious from './helper/previousState';
import List from './list';

const App = () => {

  const [currencyPair, setcurrencyPair] = useState({});
  const [data, setData] = useState([])
  const [socket, setSocket] = useState(new WebSocket('wss://ws.bitstamp.net'));
  const previousCurrencyPair = usePrevious(currencyPair);
  
  let subscribeStreamData, unsubscribeStreamData;
  if (currencyPair && currencyPair.value) {
    subscribeStreamData = {
      "event": "bts:subscribe",
      "data": {
          "channel": `order_book_${currencyPair.value}`
      }
    }
    unsubscribeStreamData = {
      "event": "bts:unsubscribe",
      "data": {
          "channel": `order_book_${previousCurrencyPair.value}`
      }
    }
  }

  useEffect(() => {
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
      setData(JSON.parse(event.data).data)
    }
    //handle error from socket
    socket.onerror = (event) => {
      console.error("WebSocket error observed:", event);
    }
  }, [currencyPair])

  const getCurrencyPair = (value) => {
    setcurrencyPair(value)
  }

  return (
      <div className='container'>
          <h1 className='header'> Welcome to Order Book </h1>
          <hr/>
          <DropdownSelect getCurrencyPair={getCurrencyPair}/>
          <Chart data={data}/>
          <List data={data} pairs={currencyPair}/>
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));