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
    <IndexRedirect to='kigo' />
      <Route path='kigo' component={Kigo} />
      <Route path='kigo/:kigoId' component={SingleKigo} /> 
      <Route path='kigo/:kigoId/waka_matches' component={Waka} /> 
      <Route path='kigo/season/:seasonName' component={Kigo} /> 
      <Route path='kigo/category/:categoryName' component={Kigo} /> 
      <Route path='waka' component={Waka} />
      <Route path='waka/:wakaId' component={SingleWaka} />
      <Route path='waka/author/:authorName' component={Waka} />
      <Route path='*' status={404} component={NotFound} />
    </Route>
  </Router>,
  document.getElementById('app')
);
