import React, { useState, useEffect } from 'react';
import Select from "react-select";
import axios from 'axios';
import './asset/dropdown.css';

const DropdownSelect = () => {

    const setValues = (values) => {
        console.log(values.value)
    }

    const [dropdownOption, setDropdownOption] = useState([]);

    useEffect(() => {
        axios.get('https://www.bitstamp.net/api/v2/trading-pairs-info/')
        .then(res => {
            const options = []
            res.data.map(data => {
                const select = {
                    value: data.name,
                    label: data.name
                }
                options.push(select)
            })
            setDropdownOption(options)
        })
    }, [])

    return ( 
        <div>
            <h4> Select currency pair </h4>
            <div className='selectDropdown'>
                <Select options={dropdownOption} onChange={(values) => setValues(values)} />
            </div>
        </div>
     );
}
 
export default DropdownSelect;