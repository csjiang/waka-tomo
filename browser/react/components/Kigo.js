import React from 'react';
import { Link } from 'react-router';
// import { Card } from 'antd';
import Col from 'antd/lib/col';
import Row from 'antd/lib/row';
import Card from 'antd/lib/card';  
import 'antd/dist/antd.css'; 

const Kigo = (props) => {

  const kigo = props.kigo;

  return (
    <div>
      <h3>季語</h3>
        <Row>
        <div className="list-group">
        {
          kigo.map(kigo => {
            return (
              <Col span="8" key={kigo.id}>
              <Link to={`/kigo/${kigo.id}`} ><Card style={{ width: 240 }}  bodyStyle={{ padding: 0 }}>
                <div className="kigo-card vertical-text">
                  <h3>{kigo.name}</h3>
                  <p>{kigo.definition}</p>
                </div>
              </Card></Link>
              </Col>
            )
          })
        }
      </div>
      </Row>
    </div>
  );
}

export default Kigo;
