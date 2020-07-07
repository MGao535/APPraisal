
import React from "react";
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
import startOfYear from 'date-fns/startOfYear';

// import "Calendar.css";

class Year extends React.Component {
  state = {
    dateContext: new moment(),
    currentMonth: new Date(),
    selectedDate: new Date()
  };

  renderHeader() {
    const dateFormat = "MMMM yyyy";

    return (
      <div className="header row flex-middle">
        <div className="col col-start">

        </div>
        <div className="col col-center">
          <span>{format(this.state.currentMonth, dateFormat)}</span>
        </div>

      </div>
    );
  }

  renderHeaderx(e) {
    const dateFormat = "MMMM yyyy";
    let currentYear = startOfYear(this.state.currentMonth);
    //console.log(currentYear);
    let currentMonth2 = addMonths(currentYear, e);
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

  renderDays(e) {
    const dateFormat = "EEEE";
    const days = [];


    let currentYear = startOfYear(this.state.currentMonth);
    //console.log(currentYear);
    let currentMonth2 = addMonths(currentYear, e);
    //console.log("current month: " + e + " " + currentMonth2);
    let startDate = startOfWeek(currentMonth2);
    //console.log("start date: " + startDate);


    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  }

  

  renderCellsx(e) {
    
    const { currentMonth, selectedDate } = this.state;
    let currentYear = startOfYear(this.state.currentMonth);
    console.log(currentYear);
    let currentMonth2 = addMonths(currentYear, e);
    console.log("current month: " + e + " " + currentMonth2);
    let startDate = startOfWeek(currentMonth2);
    console.log("start date: " + startDate);

    const monthStart = startOfMonth(currentMonth2);
    const monthEnd = endOfMonth(monthStart);
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
        days.push(
          <div
            className={`col cell ${
              !isSameMonth(day, monthStart)
                ? "disabled"
                : isSameDay(day, selectedDate) ? "selected" : ""
            }`}
            key={day}
            onClick={() => this.onDateClick(parse(cloneDay))}
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

  render() {
    return (
      <div className="page-format">
        <div className="calendar">
          {this.renderHeaderx(0)}
          {this.renderDays(0)}
          {this.renderCellsx(0)}
          {this.renderHeaderx(1)}
          {this.renderDays(1)}
          {this.renderCellsx(1)}
          {this.renderHeaderx(2)}
          {this.renderDays(2)}
          {this.renderCellsx(2)}
          {this.renderHeaderx(3)}
          {this.renderDays(3)}
          {this.renderCellsx(3)}
          {this.renderHeaderx(4)}
          {this.renderDays(4)}
          {this.renderCellsx(4)}
          {this.renderHeaderx(5)}
          {this.renderDays(5)}
          {this.renderCellsx(5)}
          {this.renderHeaderx(6)}
          {this.renderDays(6)}
          {this.renderCellsx(6)}
          {this.renderHeaderx(7)}
          {this.renderDays(7)}
          {this.renderCellsx(7)}
          {this.renderHeaderx(8)}
          {this.renderDays(8)}
          {this.renderCellsx(8)}
          {this.renderHeaderx(9)}
          {this.renderDays(9)}
          {this.renderCellsx(9)}
          {this.renderHeaderx(10)}
          {this.renderDays(10)}
          {this.renderCellsx(10)}
          {this.renderHeaderx(11)}
          {this.renderDays(11)}
          {this.renderCellsx(11)}
        </div>
      </div>
    );
  }
}

export default Year;