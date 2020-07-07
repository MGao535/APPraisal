import React, { useState } from 'react';
import './Login.css';



const Register = (props) => {
  const [new_username, setUsername] = useState("");
  const [new_password, setPassword] = useState("");
  const [lengthPopup, setLengthPopup] = useState(false);
  const [errorPopup, setErrorPopup] = useState(false);
  const [alreadyRegisteredPopup, setAlreadyRegisteredPopup] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();
    let payload = {
      "new_username": new_username,
      "new_password": new_password
    }
  }

  return (
    <div className='register'>
      <form onSubmit={handleSubmit}>
      <h2>Register</h2>
        <label>
            <input className="standard_input" type="text" value={new_username} onChange={e => setUsername(e.target.value)} placeholder="Username"/>
        </label>
        <br></br><br></br>
        <label>
            <input className="standard_input" type="password" value={new_password} onChange={f => setPassword(f.target.value)} placeholder="Password"/>
        </label>
        <p></p>
        <input className="Button" type="submit" value="Sign up!" onClick={event => window.location.href='/'} />
        <button className="Button" onClick={event => window.location.href='/'}>Go back</button>
      </form>
    </div>
  );
}
export default Register;