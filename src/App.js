import React from 'react';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import Calendar from './Calendar2';
import Register from './Register';
import Year from './Year';
import Excel from './Excel';
import Add from './components/Add';
import New from './NewUser';
import Popup from './components/Popup';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
  	<Router>
	    <div className="App">
			<Nav />
			<Switch>
				<Route path='/' exact component={Home} />
				<Route path='/Calendar' component={Calendar} />
				<Route path="/Register" component={Register} />
				<Route path="/Year" component={Year} />
				<Route path="/Excel" component={Excel} />
				<Route path="/Add" component={Add} />
				<Route path="/New" component={New} />
				<Route path="/Popup" component={Popup} />
			</Switch>
	    </div>
	</Router>
  );
}

export default App;
