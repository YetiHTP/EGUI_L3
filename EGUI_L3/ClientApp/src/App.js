import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Calendar } from './components/Calendar';
import { Day } from './components/Day';
import { Event } from './components/Event';

import './custom.css'

export default class App extends Component {
  static displayName = App.name;

  render () {
    return (
      <Layout>
        <Route exact path='/' component={Calendar} />
        <Route path='/Day' component={Day} />
        <Route path='/Event' component={Event} />
      </Layout>
    );
  }
}
