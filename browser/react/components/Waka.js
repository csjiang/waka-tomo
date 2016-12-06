import React, { Component } from 'react';
import Kigo from './Kigo';
import { Link } from 'react-router';

export default class Waka extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render() {
    return (
    <div className="waka">
    <h3>和歌</h3>
      {
        this.props.waka.map(waka => {
            return (
              <div className="list-group-item" key={waka.id}>
                <h4><Link to={`/waka/${waka.id}`}>{ waka.text }</Link></h4>
                <br></br>
                <Link to='#'>{ waka.author }</Link>
              </div>
            )
          })
      }
    </div>
    );
  }

}