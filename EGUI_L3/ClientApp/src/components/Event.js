import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import moment from 'moment';

export class Event extends Component {

    constructor(props) {
        super(props);
        this.ref_t = React.createRef();
        this.ref_d = React.createRef();
        this.state = props.location.state;
        if (this.state.event === null) {
            this.state.event = {
                id: null,
                time: "00:00",
                desc: ""
            };
        }
    }

    add() {
        let date = this.state.date;
        let time = this.ref_t.current.value;
        let desc = this.ref_d.current.value;
        fetch(`controller/Add?time=${time}&desc=${desc}&year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}`, {
            method: 'POST'
        }).then(() => {
            this.props.history.push({ pathname: "Day", state: this.state });
        });
    }

    edit() {
        let event = this.state.event;
        let date = this.state.date;
        let time = this.ref_t.current.value;
        let desc = this.ref_d.current.value;
        fetch(`controller/Edit?time=${time}&desc=${desc}&year=${date.getFullYear()}&month=${date.getMonth() + 1}&day=${date.getDate()}&id=${event.id}`, {
            method: 'POST'
        }).then(() => {
            this.props.history.push({ pathname: "Day", state: this.state });
        });
    }

    Submit = (event) => {
        event.preventDefault();
        if (this.state.event.id !== null) {
            this.edit();
        }
        else {
            this.add();
        }
    }

    render() {

        return (
            <form onSubmit={this.Submit}>
                <table>
                    <tr><th colspan="2" className="header">{moment(this.state.date).format('DD.MM.yyyy')} </th></tr>
                    <tr>
                        <td className="eventt">Time</td>
                        <td className="evente">
                            <input ref={this.ref_t} type="time" name="time" defaultValue={moment(this.state.event.time).format('HH:mm')}  required />
                        </td>
                    </tr>
                    <tr>
                        <td className="eventt">Description</td>
                        <td className="evente">
                            <input ref={this.ref_d} type="text" size="20" name="desc" defaultValue={this.state.event.desc} required />
                        </td>
                    </tr>
                    <tr>
                        <td className="ctrl">
                            <Link to={{ pathname: "Day", state: this.state }}><button> {"Back"}</button></Link>
                        </td>
                        <td className="ctrr"><input className="hyperlink submit" type="submit" value="Save" /></td>
                    </tr>
                </table >
            </form>
        );
    }
}
