import React, { useState } from "react";
import axios from 'axios';
import './App.css';

class Add extends React.Component{

  constructor() {
    super();
    this.state = { 
      startDate: '',
      endDate: '' ,
      company: ''
    };
      // super();
      this.handleSubmit = this.handleSubmit.bind(this);   
  }

  // myChangeHandler  = (event) => {
  //  let temp = {startDate: '',endDate: '' ,company: ''};
  //  temp.startDate = event.target.sDate;
 //     temp.endDate = event.target.eDate;
 //     temp.company = event.target.company;
 //     console.log(temp);
 //     this.setState(state => {
 //         const list = state.list.concat(state.value);
 //         return{ list };
 //       });
  // }

  handleSubmit(event) {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/Add', {
      method: 'POST',
      body: data,
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { sDate, eDate, company } = this.state;
    console.log(this.state);

    axios.post('localhost:3000/Add', { sDate, eDate, company })
      .then((result) => {
        console.log(sDate + " " + eDate + " " + company);
      });
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

render(){
  const { startDate, endDate, company } = this.state;
  return(
    <div>
      <h1> Add Appraisal </h1>
      <form onSubmit={this.onSubmit}>
        <label>Start Date:</label>
              <input
                type="text"
                name="startDate"
                value={startDate}
                onChange={this.onChange}
              />
              <br></br>
              <label>End Date:</label>
              <input
                type="text"
                name="endDate"
                value={endDate}
                onChange={this.onChange}
              />
              <br></br>
              <label>Company:</label>
              <input
                type="text"
                name="company"
                value={company}
                onChange={this.onChange}
              />
              <br></br>
              <button type="submit">Submit</button>
          </form>
    </div>
    );
}

}


export default Add;