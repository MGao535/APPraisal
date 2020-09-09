import './Calendar.css'; 
import React, { Component } from "react";
import moment from "moment";
import addMonths from 'date-fns/addMonths';
import addDays from 'date-fns/addDays';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import endOfWeek from 'date-fns/endOfWeek';
import isSameMonth from 'date-fns/isSameMonth';
import isSameDay from 'date-fns/isSameDay';
import subMonths from 'date-fns/subMonths';
import setDate from 'date-fns/setDate';
import eachDayOfInterval from 'date-fns/eachDayOfInterval';
// import ExcelRenderer from 'react-excel-renderer';
// import readXlsxFile from 'read-excel-file';
import axios from "axios";

class Calendar extends React.Component {
 constructor(props){
    super(props);
    this.state={
      data: [],
      currentMonth: new Date(),
      selectedDate: new Date(),
      isOpen: false,
      dataLoaded: false,
      isFormInvalid: false,
      rows: null,
      cols: null,
      appraisals: [],
      dayList: [],
      preList: [],
      readyList: [],
      appList: []
      // examples: ['Apple', 'Microsoft', 'Bungie', 'Google']
    }
    // this.fileHandler = this.fileHandler.bind(this);
    // this.toggle = this.toggle.bind(this);
    // this.openFileBrowser = this.openFileBrowser.bind(this);
    // this.renderFile = this.renderFile.bind(this);
    // this.openNewPage = this.openNewPage.bind(this);
    this.fileInput = React.createRef();
  }
  // state = {

  // };
  componentDidMount() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    axios.get("http://localhost:4000/").then(res => {
      this.setState({
        data: res.data
      });
      this.makeDayLists();
      // let temp = new Date(this.state.data[5].startDate);

      // // for(let i = 0; i < this.state.data.length; i++){
      // //   console.log(this.state.data[i].startDate);
      // //   temp.concat(this.state.data[i].startDate);
      // // }

      // this.setState({
      //   selectedDate: temp
      // });
    });
    this.makeDayLists();
  }

  makeDayLists(){
    console.log(this.state.data.length);
    for(let i = 0; i < this.state.data.length; i++){
      //console.log(this.state.data[i].startDate);
      let start = new Date(Date.parse(this.state.data[i].startDate));
      let end = new Date(Date.parse(this.state.data[i].endDate));
      //console.log(start + " " + end);
      let temp = eachDayOfInterval({start, end});
      for(let k = 0; k < temp.length; k++){
        this.state.dayList.push(temp[k]);
      }
      if(this.state.data[i].preAppraisalStart != "" && this.state.data[i].preAppraisalFinish != "" ){
        //console.log(this.state.data[i].preAppraisalStart)
        let start = new Date(Date.parse(this.state.data[i].preAppraisalStart));
        let end = new Date(Date.parse(this.state.data[i].preAppraisalFinish));
        //console.log(start + " " + end);
        let temp = eachDayOfInterval({start, end});
        let ret = this.state.preList;

        for(let k = 0; k < temp.length; k++){
          ret.push(temp[k]);
        }
        this.setState({
          preList: ret
        });
      }
      if(this.state.data[i].readinessReviewStart != "" && this.state.data[i].readinessReviewFinish != ""){
        let start = new Date(Date.parse(this.state.data[i].readinessReviewStart));
        let end = new Date(Date.parse(this.state.data[i].readinessReviewFinish));
        let temp = eachDayOfInterval({start, end});
        let ret = this.state.readyList;

        for(let k = 0; k < temp.length; k++){
          ret.push(temp[k]);
        }

        this.setState({
          readyList: ret
        });
      }
      if(this.state.data[i].appraisalTrainingStart != "" && this.state.data[i].appraisalTrainingFinish != ""){
        let start = new Date(Date.parse(this.state.data[i].appraisalTrainingStart));
        let end = new Date(Date.parse(this.state.data[i].appraisalTrainingFinish));
        let temp = eachDayOfInterval({start, end});
        let ret = this.state.appList;

        for(let k = 0; k < temp.length; k++){
          ret.push(temp[k]);
        }
        this.setState({
          appList: ret
        })
      }
    }
    console.log(this.state.dayList);
    console.log(this.state.appList);
  }

  isInDays(day){
    //this.makeDayLists();
    //console.log(appList);
    //console.log(this.state.dayList);
    for(let j = 0; j < this.state.dayList.length; j++){
      //console.log(this.state.dayList[j] + ": " + day)
      //console.log(j + " " + this.state.dayList.length);
      if(isSameDay(this.state.dayList[j], day)){
        //console.log("true");
        return "day";
      }
      if(isSameDay(this.state.appList[j], day)){
        //console.log("true");
        return "app";
      }
      if(isSameDay(this.state.preList[j], day)){
        //console.log("true");
        return "pre";
      }
      if(isSameDay(this.state.readyList[j], day)){
        //console.log("true");
        return "ready";
      }
    }

  }

  chooseColor(e, target){
    console.log(this.state.appList);
    console.log(target);
    const { currentMonth, selectedDate } = this.state;
    let currentMonth2 = addMonths(currentMonth, e);
    const monthStart = startOfMonth(currentMonth2);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    //console.log(monthStart + " " + monthEnd + " " + startDate + " " + endDate);
    const day = target;
    const dateFormat = "d";
    const rows = [];
    let formattedDate = "";
    formattedDate = format(day, dateFormat);
    //console.log(day);
    if(this.isInDays(day) == "day"){
        //console.log("true");
        let ret = (<div className={`col cell day`}
            key={day}
            onClick={() => this.onDateClick(parse(day))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>);
        return ret;
      }
      else if(this.isInDays(day) == "app"){
        //console.log("true");
        let ret = (<div className={`col cell app`}
            key={day}
            onClick={() => this.onDateClick(parse(day))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>);
        return ret;
      }
      else if(this.isInDays(day) == "pre"){
        //console.log("true");
        let ret = (<div className={`col cell pre`}
            key={day}
            onClick={() => this.onDateClick(parse(day))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>);
        return ret;
      }
      else if(this.isInDays(day) == "ready"){
        //console.log("true");
        let ret =  (<div className={`col cell ready`}
            key={day}
            onClick={() => this.onDateClick(parse(day))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>);
        return ret;
      }
      else{
        let ret =  (<div className={`col cell ${!isSameMonth(day, monthStart) ? "disabled" : this.isInDays(day) ? "day" :""}`}
            key={day}
            onClick={() => this.onDateClick(parse(day))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>);
        return ret;
      };
  }

  renderHeader() {
    const dateFormat = "MMMM yyyy";
    const input = document.getElementById('input')
 
    // input.addEventListener('change', () => {
    //   readXlsxFile(input.files[0]).then((rows) => {
    //     // `rows` is an array of rows
    //     // each row being an array of cells.
    //   })
    // })

    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderHeaderx(e) {
    const dateFormat = "MMMM yyyy";
    let currentMonth = this.state.currentMonth;
    let currentMonth2 = addMonths(currentMonth, e);
    return (
      <div className="header row flex-middle">
        <div className="col col-start">
          <div className="icon" onClick={this.prevMonth}>
            chevron_left
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentMonth2, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="icon">chevron_right</div>
        </div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "EEEE";
    const day = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const days = [];

    let startDate = startOfWeek(this.state.currentMonth);
    //console.log(startDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  renderCells() {
    const { currentMonth, selectedDate } = this.state;
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    console.log(monthStart + " " + monthEnd + " " + startDate + " " + endDate);


    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        //console.log(formattedDate);
        const cloneDay = day;
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay, 'd', new Date()))}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  renderCellsx(e) {
    
    const { currentMonth, selectedDate } = this.state;
    let currentMonth2 = addMonths(currentMonth, e);
    const monthStart = startOfMonth(currentMonth2);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);
    //console.log(monthStart + " " + monthEnd + " " + startDate + " " + endDate);

    const dateFormat = "d";
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        //console.log(formattedDate);
        const cloneDay = day;
        console.log(cloneDay);
        let color = this.chooseColor(e, cloneDay);
        days.push(color);
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  }

  // fileHandler = (event) => {
  //   let fileObj = event.target.files[0];

  //   ExcelRenderer(fileObj, (err, resp) => {
  //     if(err){
  //       console.log(err);            
  //     }
  //     else{
  //       this.setState({
  //         cols: resp.cols,
  //         rows: resp.rows
  //       });
  //     }
  //   });               

  // }

  onDateClick = day => {
    this.setState({
      selectedDate: day
    });
  };

  nextMonth = () => {
    this.setState({
      currentMonth: addMonths(this.state.currentMonth, 1)
    });
  };

  prevMonth = () => {
    this.setState({
      currentMonth: subMonths(this.state.currentMonth, 1)
    });
  };

  updateState = (location) => {
    try{
      let companies = location;
      //console.log(typeof(location) == undefined)   
      companies = location.data;
      for(let i = 0; i<companies.length; i++){
        if(!this.state.data.includes(companies[i])){
          this.state.data.push(companies[i])
        }
      }

    }
    catch{
      return; 
    }
  };

  addDay = () => {
    const { currentMonth, selectedDate } = this.state;
   const monthStart = startOfMonth(currentMonth);
    let test1 = this.state.selectedDate.concat(monthStart);
    this.setState({
      selectedDate: test1
    });
  }

  render() {
    
    this.updateState(this.props.location)
    console.log(this.state.data)
 
    return (
    <div>
              <h3>Total Appraisals: {this.state.data.length}</h3>
          {this.state.data.map(data => {
            return (
              <React.Fragment>
                <p>
                  {" "}
                  <b>name</b> : {data.company}
                </p>
                <hr />
              </React.Fragment>
            );
          })}
      <div className="page-format">
        <div className="calendar">


          {this.renderHeaderx(0)}
          {this.renderDays()}
          {this.renderCellsx(0)}
          {this.renderHeaderx(1)}
          {this.renderDays()}
          {this.renderCellsx(1)}
          {this.renderHeaderx(2)}
          {this.renderDays()}
          {this.renderCellsx(2)}

        </div>
        <p></p>
        <br></br>
        <p></p>
        <p></p>
      </div>
    </div>
    );
  }
            // {this.state.data.map(name => (
          //   <p>
          //     {this.state.data.indexOf(name) + 1}. {name}
          //   </p>
          // ))}

}

export default Calendar;