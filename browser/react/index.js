import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import Waka from './components/Waka';
import Kigo from './components/Kigo';
import SingleKigo from './components/SingleKigo';
import SingleWaka from './components/SingleWaka';
import NotFound from './components/NotFound';
import {Router, Route, hashHistory, IndexRedirect} from 'react-router';

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path='/' component={AppContainer}>
      <IndexRedirect to='Kigo' />
      <Route path='Kigo' component={Kigo} />
      <Route path='Kigo/:kigoid' component={SingleKigo} /> 
      <Route path='Waka' component={Waka} />
      <Route path='Waka/:wakaid' component={SingleWaka} />
      <Route path='*' status={404} component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('app')
);