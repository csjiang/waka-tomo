import React, { Component } from 'react';
import axios from 'axios';

// import initialState from '../initialState';

import Kigo from '../components/Kigo';
import Waka from '../components/Waka';
import NotFound from '../components/NotFound';

export default class AppContainer extends Component {

  constructor (props) {
    super(props);
    this.state = {
      kigo: [],
      waka: [],
      selectedKigo: {},
      selectedWaka: {},
      selectedSeason: '',
      selectedCategory: '',
    };
  }

  componentDidMount () {
    axios.get('/api/kigo/')
    .then(res => res.data)
    .then(kigo => this.setState({ kigo }}));

    axios.get('/api/waka/')
      .then(res => res.data)
      .then(waka => this.setState({ waka }));
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
          this.props.children 
          ? React.cloneElement(this.props.children, {
              kigo: this.state.kigo,
              waka: this.state.waka,
              selectedKigo: this.state.selectedKigo,
              selectedWaka: this.state.selectedWaka,
              selectedSeason: this.state.selectedSeason,
              selectedCategory: this.state.selectedCategory,
            })
            : null
        }
        </div>
      </div>
    );
  }
}
