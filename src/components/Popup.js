import React from 'react';  
import './style.css';  

class Popup extends React.Component {  
  render() {  
	return (  
			<div className='popup'>  
			<div className='popup\_inner'>  
			<h1>Do you have any more appraisals to enter?</h1>  

			<button onClick={event => window.location.href='/Add'}>Yes</button>
			<button onClick={event => window.location.href='/Calendar'}>No</button>    
			</div>  
			</div>  
		);  
		}  
	}  

export default Popup;