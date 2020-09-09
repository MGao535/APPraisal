import React, { useState } from "react";
import axios from 'axios';
import Popup from './Popup.js';  
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

class Add extends React.Component{

	constructor() {
		super();
		this.state = {
			data: [],
			appraisalID: Number,
			startDate: '',
			endDate: '' ,
			company: '',
			showPopup: false,
			companies: [],
			maturityLevel: Number,
			location: '',
			contactName: '',
			contactInfo: '',
			preAppraisalStart: '',
			preAppraisalFinish: '',
			readinessReviewStart: '',
			readinessReviewFinish: '',
			appraisalTrainingStart: '',
			appraisalTrainingFinish: '',
			confirmed: false,
			note: '', 
			displayErrors: false
		};
	    // super();
	    this.handleSubmit = this.handleSubmit.bind(this);		
	}

	componentDidMount() {
    axios.get("http://localhost:4000/").then(res => {
      this.setState({
        data: res.data,
        companies: res.data
      });
    });
  }

	togglePopup() {  
		this.setState({  
			showPopup: !this.state.showPopup
		});  
	}  

	// myChangeHandler  = (event) => {
	// 	let temp = {startDate: '',endDate: '' ,company: ''};
	// 	temp.startDate = event.target.sDate;
 //    	temp.endDate = event.target.eDate;
 //    	temp.company = event.target.company;
 //    	console.log(temp);
 //    	this.setState(state => {
 //      		const list = state.list.concat(state.value);
 //      		return{ list };
 //      	});
	// }

	handleSubmit(event) {
		event.preventDefault();
		const data = new FormData(event.target);

		  if (!event.target.checkValidity()) {
		    this.setState({ displayErrors: true });
		    return;
		  }
		  this.setState({ displayErrors: false });
	}

	onSubmit = (e, form) => {
		e.preventDefault();
		const { startDate, endDate, company, appraisalID, maturityLevel, location, contactName, contactInfo, preAppraisalStart, preAppraisalFinish, 
		readinessReviewStart, readinessReviewFinish, appraisalTrainingStart, appraisalTrainingFinish, confirmed, note } = this.state;

		// let newAppraisal = {
		// 	appraisals_company: company,
		// 	appraisals_startDate: sDate,
		// 	appraisals_endDate: eDate
		// };

		// console.log(this.state);

		// axios.post('localhost:3000/Add', { sDate, eDate, company })
		//   .then((result) => {
		//   	console.log(sDate + " " + eDate + " " + company);
		//   });

		if (!e.target.checkValidity()) {
			this.setState({ displayErrors: true });
			return;
		}
		this.setState({ displayErrors: false });

		// let MongoClient = require('mongodb').MongoClient;
		// let url = "mongodb://localhost:27017/";

		// MongoClient.connect(url, function(err, db) {
		//   if (err) throw err;
		//   let dbo = db.db("mydb");
		//   let myobj = { name: company, startDate: sDate, endDate: eDate };
		//   dbo.collection("appraisals").insertOne(myobj, function(err, res) {
		//     if (err) throw err;
		//     console.log("1 document inserted");
		//     db.close();
		//   });
		// });
		console.log(company);

		axios.post('http://localhost:4000/add', {company: company, startDate: startDate, endDate: endDate, appraisalID: appraisalID, maturityLevel: maturityLevel,
			location: location, contactName: contactName, contactInfo: contactInfo, preAppraisalStart:preAppraisalStart, preAppraisalFinish:preAppraisalFinish, 
			readinessReviewStart: readinessReviewStart, readinessReviewFinish: readinessReviewFinish, appraisalTrainingStart: appraisalTrainingStart, 
			appraisalTrainingFinish: appraisalTrainingFinish, confirmed: confirmed, note: note}).then(res => 
			console.log(res.data)).catch(function (error) {console.log(error)});

		axios.get("http://localhost:4000/").then(res => {
			this.setState({
				data: res.data
			});
		});

		console.log(this.state.data);

		let temp = this.state.data;

		temp.push({company: company, startDate: startDate, endDate: endDate, appraisalID: appraisalID, maturityLevel: maturityLevel, location: location, 
			contactName: contactName, contactInfo: contactInfo, preAppraisalStart:preAppraisalStart, preAppraisalFinish:preAppraisalFinish, 
			readinessReviewStart: readinessReviewStart, readinessReviewFinish: readinessReviewFinish, appraisalTrainingStart: appraisalTrainingStart, 
			appraisalTrainingFinish: appraisalTrainingFinish, confirmed: confirmed, note: note});

		console.log(temp);

		this.setState({
			data: temp,
			appraisalID: 0,
			startDate: '',
			endDate: '' ,
			company: '',
			showPopup: false,
			companies: [],
			maturityLevel: Number,
			location: '',
			contactName: '',
			contactInfo: '',
			preAppraisalStart: '',
			preAppraisalFinish: '',
			readinessReviewStart: '',
			readinessReviewFinish: '',
			appraisalTrainingStart: '',
			appraisalTrainingFinish: '',
			confirmed: false,
			note: '',
		// window.open('', 'formpopup', 'width=400,height=400,resizeable,scrollbars');
  //   	form.target = 'formpopup';
  		});

  		this.componentDidMount();
	}

	onChange = (e) => {
		this.setState({ [e.target.name]: e.target.value });
	}

render(){
	const { startDate, endDate, company, appraisalID, maturityLevel, location, contactName, contactInfo, preAppraisalStart, preAppraisalFinish, 
		readinessReviewStart, readinessReviewFinish, appraisalTrainingStart, appraisalTrainingFinish, confirmed, note } = this.state;
	const { displayErrors } = this.state;
	// console.log("state");
	// console.log(this.state);
	return(
		<div>
			<h3>Total Appraisals: {this.state.companies.length}</h3>
			{this.state.companies.map(data => {
            return (
              <React.Fragment>
                <p>
                  {" "}
                  <b>name</b> : {data.company} <b>start date</b> : {data.startDate} <b> end date</b> : {data.endDate}
                </p>
                <hr />
              </React.Fragment>
            );
          })}

			<h1> Add Appraisal </h1>
			<form onSubmit={this.onSubmit} noValidate className={displayErrors ? 'displayErrors' : ''} href="/Add">
	            <label>Appraisal ID:</label>
	            <input
	              type="text"
	              name="appraisalID"
	              value={appraisalID}
	              onChange={this.onChange}
	              placeholder="1	"
	            />
	            <br></br>
	            <label>Company:</label>
	            <input
	              type="text"
	              name="company"
	              value={company}
	              onChange={this.onChange}
	              placeholder="Apple"
	            />
	            <br></br>
	            <label>Start Date:</label>
	            <input
	              type="text"
	              name="startDate"
	              value={startDate}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
	              required
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <br></br>
	            <label>End Date:</label>
	            <input
	              type="text"
	              name="endDate"
	              value={endDate}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	              required
	            />
	            <br></br>
	            <label>Location:</label>
	            <input
	              type="text"
	              name="location"
	              value={location}
	              onChange={this.onChange}
	              placeholder="Beijing"
	            />
	            <br></br>
	            <label>Contact Name:</label>
	            <input
	              type="text"
	              name="contactName"
	              value={contactName}
	              onChange={this.onChange}
   				  placeholder="Steve Jobs"
	            />
	            <br></br>
	            <label>Contact Info:</label>
	            <input
	              type="text"
	              name="contactInfo"
	              value={contactInfo}
	              onChange={this.onChange}
   				  placeholder="steve.jobs@apple.org"
	            />
	            <br></br>
	            <label>Maturity Level:</label>
	            <input
	              type="text"
	              name="maturityLevel"
	              value={maturityLevel}
	              onChange={this.onChange}
   				  placeholder="1"
	            />
	            <br></br>
	            <h2>Pre-Appraisal Details</h2>
	            <label>Pre-Appraisal Start Date:</label>
	            <input
	              type="text"
	              name="preAppraisalStart"
	              value={preAppraisalStart}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <br></br>
	            <label>Pre-Appraisal End Date:</label>
	            <input
	              type="text"
	              name="preAppraisalFinish"
	              value={preAppraisalFinish}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <h2>Readiness Review Details</h2>
	            <label>Readiness Review Start Date:</label>
	            <input
	              type="text"
	              name="readinessReviewStart"
	              value={readinessReviewStart}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <br></br>
	            <label>Readiness Review End Date:</label>
	            <input
	              type="text"
	              name="readinessReviewFinish"
	              value={readinessReviewFinish}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <h2>Pre-Appraisal Details</h2>
	            <label>Appraisal Training Start Date:</label>
	            <input
	              type="text"
	              name="appraisalTrainingStart"
	              value={appraisalTrainingStart}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <br></br>
	            <label>Pre-Appraisal End Date:</label>
	            <input
	              type="text"
	              name="appraisalTrainingFinish"
	              value={appraisalTrainingFinish}
	              onChange={this.onChange}
	              data-parse="date"
	              placeholder="MM/DD//YYYY"
   				  pattern="\d{2}\/\d{2}/\d{4}"
	            />
	            <br/><br/>
	            <label>Confirmed?</label>
	            <br/><br/>
	            <input
	              type="radio"
	              id="true"
	              name="confirmed"
	              value={confirmed}
	              onChange={this.onChange}
	            />
	            <label for="true">Yes</label>
	            
	            <input
	              type="radio"
	              id="false"
	              name="confirmed"
	              value={confirmed}
	              
	            />
	            <label for="false">No</label>
	            <br/><br/>
	            <label>Notes:</label>
	            <input
	              type="text"
	              name="appraisalTrainingFinish"
	              value={appraisalTrainingFinish}
	              onChange={this.onChange}
	              placeholder="Made the iPhone"
	             />
	            <br/><br/>
	            <span>
	            <button type="submit">Submit</button>
	            <br/><br/>

	            </span>


	        </form>
	       	
	       	<Link to={{pathname: "/Calendar"}}>Back To Calendar</Link>
		</div>
		);
}

}

// 	            {this.state.showPopup ?  
// <Popup  
//           text='Click "Close Button" to hide popup'  
//           closePopup={this.togglePopup.bind(this)}  
// />  
// : null  
// }  
//<button type="link" onClick={event => window.location.href='/Calendar'}>Go Back to Calendar</button>

export default Add;