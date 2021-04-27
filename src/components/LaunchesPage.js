import React from 'react';
import Launches from './Launches';


function LaunchesPage() {

  return (
    <div>
      <h3 className='my-3'>Launches</h3>
      <div className="boxStyle" >
          <div style={{backgroundColor: 'green', width: '40px', height: '20px'}} className='mr-1'></div>
          <p>= Success</p>
      </div>
      <div className="boxStyle">
          <span style={{backgroundColor: 'red', width: '40px', height: '20px'}} className='mr-1'></span>
          <p>= Failure</p>
      </div>
      <Launches/>
    </div>
  );
}

export default LaunchesPage;
