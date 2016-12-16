import React from 'react';
import { Link } from 'react-router';
// import 'antd/dist/antd.css'; 
import { Card } from 'antd';
import Waka from './Waka';

class SingleKigo extends React.Component {

  componentDidMount () {
  	console.log(this.props);
    const selectKigo = this.props.selectKigo;
    const kigoId = this.props.routeParams.kigoId;

    selectKigo(kigoId);
  }

  render() {
	  const kigo = this.props.selectedKigo;
	  return (
	    <div>
		  <Card title={kigo.name} extra={<Link to={`/kigo/${kigo.id}/waka_matches`}>例句を表示する</Link>} style={{ width: 300 }}>
		    <p>読み方：{kigo.reading}</p>
		    <p>季節：<Link to={`/kigo/season/${kigo.season}`} onClick={() => this.props.selectSeason(kigo.season)}>{kigo.season}</Link></p>
		    <p>意味：{kigo.definition}</p>
		    <p>分類：<Link to={`/kigo/category/${kigo.category}`} onClick={() => this.props.selectCategory(kigo.category)}>{kigo.category}</Link></p>
		    <ul>同義語・同類語：
			    {
			    	kigo.synonyms && kigo.synonyms.map(synonym => <li className="list-unstyled" key={kigo.synonyms.indexOf(synonym)}>{synonym}</li>)
			    }
		    </ul>
		  </Card>
	    </div>
	  );
  }  
}

export default SingleKigo;