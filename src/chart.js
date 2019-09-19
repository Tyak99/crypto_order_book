import React, {useState} from 'react';
import CanvasJSReact from './asset/canvasjs.react';
var CanvasJS = CanvasJSReact.CanvasJS;

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Chart = (data) => {
    let asks = []
    let bids = []
    
    if(data.data.asks) {
        data.data.bids.forEach(val => {
            const points = {};
            points.x = parseFloat(val[0]);
            points.y = parseFloat(val[1]);
            bids.push(points)
        })
        data.data.asks.forEach(val => {
            const points = {};
            points.x = parseFloat(val[0]);
            points.y = parseFloat(val[1]);
            asks.push(points)
        })
    }

    const options = {
        theme: "light1",
        animationEnabled: true,
        title: {
            text: "Currency Update"
        },
        data: [
            {
                type: 'area',
                dataPoints: bids
            },
            {
                type: 'area', 
                dataPoints: asks
            }
        ]
    }

    return ( 
        <div>
            {data.data.asks ? <CanvasJSChart options = {options}
			/> : <h2> No data to show yet, choose a currency pair from the dropdown </h2>}
        </div>
     );
}
 
export default Chart;