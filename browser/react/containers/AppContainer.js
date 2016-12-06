import React, { Component } from 'react';
import axios from 'axios';
import { hashHistory } from 'react-router';

import initialState from '../initialState';
import Kigo from '../components/Kigo';
import Waka from '../components/Waka';
import NotFound from '../components/NotFound';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount () {

    Promise
    .all([
      axios.get('/api/kigo/'),
      axios.get('/api/waka/')
    ])
    .then(res => res.map(r => r.data))
    .then(data => this.onLoad(...data));
  }

  onLoad (kigo, waka) {
    this.setState({
      kigo,
      waka,
    });
  }

  selectKigo (kigoId) {
    axios.get(`/api/kigo/${kigoId}`)
      .then(res => res.data)
      .then(kigo => this.setState({
        selectedKigo: kigo
      }))
    .catch(error => this.setState({ invalid: true }));  
  }

  selectWaka (wakaId){
      axios.get(`/api/waka/${wakaId}`)
      .then(res => res.data)
      .then(waka => this.setState({
        selectedWaka: waka
      }))
    .catch(error => this.setState({ invalid: true }));  
  }

  render () {
    const props = Object.assign({}, this.state, {
      kigo: this.state.kigo,
      waka: this.state.waka,
      selectedKigo: this.state.selectedKigo,
      selectedWaka: this.state.selectedWaka,
      selectedSeason: this.state.selectedSeason,
      selectedCategory: this.state.selectedCategory,
      savedKigo: this.state.savedKigo,
      savedWaka: this.state.savedWaka,
    });

    if (this.state.invalid) {
      return (
        <div id="main" className="container-fluid">
          <div className="col-xs-2">
            <Sidebar />
          </div>
          <div className="col-xs-10">
          <NotFound />
          </div>
        </div>
        )
    } else 
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-10">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
      </div>
    );
  }
}
