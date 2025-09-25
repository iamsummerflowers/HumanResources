import React from 'react';
import './Main.css';
import Card from './Card.js';
import logo from '../assets/logoBrain.svg'


function Main() {
  return (
    <div className="main">
      <div className="mainSubheader">
        <h1>startDEV</h1>
        <img src={logo} alt="Logo"/>
      </div>
      <div className="holdsAllCards">
          <Card 
            id="firstCard"
            header=" “Before you start...” "
            bodyItems= {['Know what you’re building', 'Understand the flow', 'Collect requirements', 'Ideate the implementation', 'Organized modules']}
          />
          <Card 
            id="secondCard"
            header=" “...This Template Includes” "
            bodyItems = {['Installed base react library', 'Installed react-router library', 'Installed react-router-dom library', 'Tested router links']}
          />
          <Card 
            id="thirdCard"
            header=" “Clone this template &...” "
            bodyItems={['Add unique github name','Update react app name','Placeholder favicon','Apple-touch-icon image','Website title','Meta description']}
          />
      </div>
    </div>
  );
}

export default Main;