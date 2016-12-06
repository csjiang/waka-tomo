import React from 'react';
import { Link } from 'react-router';

const Kigo = (props) => {

  const kigo = props.kigo;

  return (
    <div>
      <h3>季語</h3>
        <div className="list-group">
        {
          kigo.map(kigo => {
            return (
              <div className="list-group-item" key={kigo.id}>
                <Link to={`/kigo/${kigo.id}`}>{ kigo.name }</Link>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default Kigo;
