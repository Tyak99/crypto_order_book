import React, { PureComponent } from 'react'
import './asset/list.css';

const List = ({data, pairs}) => {
    let displayBids = <p> Waiting for orders </p>
    let displayAsks = <p> Waiting for orders </p>
    
    if(data.bids) {
        displayBids = data.bids.map((bid, i) => {
            return (
                <p key={i}> {bid[0]} -- {bid[1]} </p>
            )
        })
        displayAsks = data.asks.map((ask, i) => {
            return (
                <p key={i}> A: {ask[0]}, B: {ask[1]} </p>
            )
        })
    }
    
    return ( 
        <div className="list">
            <h2> {pairs.label} </h2>
            <div className="bids">
                <h2> Bids </h2>
                {displayBids}
            </div>
            <div className="asks">
                <h2> Asks </h2>
                {displayAsks}
            </div>
        </div>
     );
}
 
export default List;