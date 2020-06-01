import React, { Component } from 'react';
import { Container } from 'reactstrap';


export class Layout extends Component {
    static displayName = Layout.name;

    render() {
        return (

            <div className="container">
                <main role="main" class="pb-3" >
                    {this.props.children}
                </main>
            </div>
        );
    }
}
