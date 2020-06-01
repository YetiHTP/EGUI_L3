import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';


export class Calendar extends Component {

    constructor(props) {
        super(props);

        this.state = props.location.state;
        if (this.state === undefined || this.state === null) {
            let date = new Date();
            this.state = this.assign(date);
        }

        this.sync(this.state.date).then(o => {
            let state = {
                daysWithEvents: o
            };
            this.setState(state);
        });
    }

    async sync(date) {
        const response = await fetch(`controller/GetHighlights?year=${date.getFullYear()}&month=${date.getMonth() + 1}`);
        const data = await response.json();
        return data;
    }

    assign(date) {
        let today = new Date();
        let shift = moment(date).startOf('month').day();
        if (shift == 0) {
            shift = 7;
        }
        return {
            date: date,
            days: moment(date).daysInMonth(),
            shift: shift,
            curr: today.getFullYear() === date.getFullYear() && today.getMonth() === date.getMonth() ? today.getDate() : 0,
            daysWithEvents: []
        };
    };

    NextMonth() {
        let date = moment(this.state.date).add(1, 'months').toDate();
        this.sync(date).then(o => {
            let state = this.assign(date);
            state.daysWithEvents = o;
            this.setState(state);
        });
    };

    PrevMonth() {
        let date = moment(this.state.date).add(-1, 'months').toDate();
        this.sync(date).then(o => {
            let state = this.assign(date);
            state.daysWithEvents = o;
            this.setState(state);
        });
    };

    Month() {
        let rows = [];
        for (let i = 0; i < 6; i++) {
            let columns = [];
            for (let j = 0; j < 7; j++) {
                let id = i * 7 + j + 2;
                let day = id - this.state.shift;
                let style = `cell hyperlink ${day > 0 && day === this.state.curr ? "curr" : ""}  ${this.state.daysWithEvents.find(o => o === day) > 0 ? "highlight" : ""}`;
                let tile = id >= this.state.shift + 1 && id < this.state.shift + this.state.days + 1 ? <td className={style}> <Link to={this.Day(day)} >  {day}  </Link> </td> : <td className="cell"> </td>;
                columns.push(tile);
            }
            rows.push(columns);
        }
        return rows.map((d, i) => {
            return <tr>{d}</tr>;
        });
    }


    Day(day) {
        let date = moment(this.state.date).set('date', day).toDate();
        let state = this.assign(date);
        return { pathname: "Day", state: state };
    };



    render() {
        return (
            <table border="1">
                <thead>
                    <tr>
                        <th colspan="2"> <button onClick={this.PrevMonth.bind(this)}> {"<<"} </button>  </th>
                        <th colspan="3" className="header"> {moment(this.state.date).format('MMM - YYYY')} </th>
                        <th colspan="2"> <button onClick={this.NextMonth.bind(this)}> {">>"} </button>  </th>
                    </tr>
                    <tr>
                        <th className="cell">Mon</th>
                        <th className="cell">Tue</th>
                        <th className="cell">Wed</th>
                        <th className="cell">Thu</th>
                        <th className="cell">Fri</th>
                        <th className="cell">Sat</th>
                        <th className="cell">Sun</th>
                    </tr>
                </thead>
                <tbody> {this.Month()} </tbody>
            </table >
        );
    }
}





