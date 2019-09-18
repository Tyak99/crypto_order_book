import React from "react";
import ReactDOM from "react-dom";
import DropdownSelect from './dropdownSelect';
import './asset/index.css';

const App = () => {
  return (
      <div className='container'>
          <h1 className='header'> Welcome to Order App </h1>
          <hr/>
          <DropdownSelect />
      </div>
  )
};

ReactDOM.render(<App />, document.getElementById("app"));