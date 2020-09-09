import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import './App.css';

function Home() {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showRegister, setShowRegister] = useState(false);
  const [matchPopup, setMatchPopup] = useState(false);
  const [existPopup, setExistPopup] = useState(false);

  // function validateForm() {
  //   return email.length > 0 && password.length > 0;
  // }

function handleSubmit(event) {
    event.preventDefault();
    let payload = {
      "username": username,
      "password": password
    }
}

  return (
    <div className = "Login">
      <form onSubmit={handleSubmit}>
        <label> 
            <input className="standard_input" type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
        </label>
        <label> 
            <input className="standard_input" type="password" value={password} onChange={f => setPassword(f.target.value)} placeholder="Password"/>
        </label>
        <br></br><br></br>
        <button className="Button" onClick={event => window.location.href='/Calendar'}>Go</button>
        <br></br><br></br>
        <button className="Button" onClick={event => window.location.href='/register'}>Register</button>  
        </form>
      </div>
  );
}

export default Home;