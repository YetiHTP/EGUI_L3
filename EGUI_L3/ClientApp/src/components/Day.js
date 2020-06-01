import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';

export class Day extends Component {


    constructor(props) {
        super(props);
        this.state = props.location.state;
        this.state.events = [];
        this.sync(this.state.date).then(o => {
            let state = {
                events: o
            };
            this.setState(state);
        });
    }

    async sync(date) {
        const response = await fetch(`controller/GetEvents?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`);
        const data = await response.json();
        return data;
    }

    NewEvent() {
        let state = Object.assign({}, this.state);
        state.event = null;
        return { pathname: "Event", state: state };
    }

    GetEvent(event) {
        let state = Object.assign({}, this.state);
        state.event = event;
        return { pathname: "Event", state: state };
    }

    delete(event) {
        let date = this.state.date;
        fetch(`controller/Delete?year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}&id=${event.id}`, {
            method: 'POST'
        }).then(() => {
            this.sync(this.state.date).then(o => {
                let state = {
                    events: o
                };
                this.setState(state);
            });
        });
    }

    events() {
        let rows = [];
        for (let i = 0; i < this.state.events.length; i++) {
            rows.push(
                [<td className="dayt">{moment(this.state.events[i].time).format('HH:mm')}</td>,
                <td className="desc"> {this.state.events[i].desc}</td>,
                <Link to={this.GetEvent(this.state.events[i])} className="hyperlink"> <button> Edit </button> </Link>,
                <button className="hyperlink" onClick={() => this.delete(this.state.events[i])}> Delete </button>]
            );
        }
        return rows.map((d, i) => {
            return <tr>{d}</tr>;
        });
    }

    render() {
        return (
            <table>
                <tr><th colspan="4" className="header">{`Events for ${moment(this.state.date).format('DD.MM.yyyy')}`} </th></tr>
                <tr>
                    <th className ="dayt">Time</th>
                    <th className="desc">Description</th>
                    <th> </th>
                    <th> </th>
                </tr>
                {this.events()}
                <tr>
                    <td colspan="2" className="ctrl"> <Link to={{ pathname: "/", state: this.state }}> <button> Back </button> </Link> </td>
                    <td colspan="2" className="ctrr"> <Link to={this.NewEvent()} > <button> Add  </button> </Link>  </td>
                </tr>
            </table>
        );
    }
}
