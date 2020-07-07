import React from 'react';
import './App.css';
import Home from './Home';
import Nav from './Nav';
import Calendar from './Calendar';
import Register from './Register';
import Year from './Year';
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
			</Switch>
	    </div>
	</Router>
  );
}

export default App;
