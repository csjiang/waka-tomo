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

    this.selectKigo = this.selectKigo.bind(this);
    this.selectWaka = this.selectWaka.bind(this);
    this.selectAuthor = this.selectAuthor.bind(this);
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
    let theKigo;
    axios.get(`/api/kigo/${kigoId}`)
      .then(res => res.data)
      .then(foundKigo => {
        theKigo = foundKigo;
      })
      .then(() => axios.get(`/api/kigo/${kigoId}/waka_matches`))
      .then(res => res.data)
      .then(waka => this.setState({
        selectedKigo: theKigo,
        waka
      }))
    .catch(error => this.setState({ invalid: true }));  
  }

  selectWaka (wakaId){
    axios.get(`/api/waka/${wakaId}`)
    .then(res => res.data)
    .then(theWaka => this.setState({
      selectedWaka: theWaka
    }))
    .catch(error => this.setState({ invalid: true }));  
  }

  selectAuthor (authorName) {
    axios.get(`api/waka/author/${authorName}`)
    .then(res => res.data) 
    .then(wakaByAuthor => this.setState({
      waka: wakaByAuthor
    }))
    .catch(error => this.setState({ invalid: true }));
  }

  render () {
    const props = Object.assign({}, this.state, {
      selectKigo: this.selectKigo,
      selectWaka: this.selectWaka,
      selectAuthor: this.selectAuthor
    });

    if (this.state.invalid) {
      return (
        <div id="main" className="container-fluid">
          <div className="col-xs-12">
          <NotFound />
          </div>
        </div>
        )
    } else 
    return (
      <div id="main" className="container-fluid">
        <div className="col-xs-12">
        {
          this.props.children && React.cloneElement(this.props.children, props)
        }
        </div>
      </div>
    );
  }
}
