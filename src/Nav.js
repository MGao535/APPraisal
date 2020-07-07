import React from 'react';
import './App.css';
import {Link} from 'react-router-dom';

function Nav() {

	const navstyle = {color: 'white'};

  return (
    <nav className = "navigation">
    	<h3>Logo</h3>
    	<ul className="navLinks">
    		<Link style={navstyle} to='/'>
    			<li>Home</li>
    		</Link>
    		<Link style={navstyle} to='Calendar'>
    			<li>Calendar</li>
    		</Link>
    		<Link style={navstyle} to='Year'>
    			<li>Entire Year</li>
    		</Link>
    	</ul>
    </nav>
  );
}

export default Nav;