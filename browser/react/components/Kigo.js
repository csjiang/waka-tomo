import React from 'react';
import { Link } from 'react-router';
import { Col, Row, Card } from 'antd';
import shuffle from 'shuffle-array';

const Kigo = (props) => {

  const kigo = props.kigo;

  return (
    <div>
      <h3>季語</h3>
        <Row>
        <div className="list-group">
        {
          shuffle(kigo).map(kigo => {
            return (
              <Col span="8" key={kigo.id}>
                <Link to={`/kigo/${kigo.id}`} >
                  <Card style={{ width: 240 }}>
                    <div className="vertical-text">
                      <h3>{kigo.name}</h3>
                      <p>{kigo.definition}</p>
                    </div>
                  </Card>
                </Link>
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
