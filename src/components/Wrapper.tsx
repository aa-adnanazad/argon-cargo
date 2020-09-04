import React from 'react';
import { connect } from 'react-redux';
// Components
import SingleForm from './SingleForm';
import MultiForm from './MultiForm';
import DisplayTable from './DisplayTable';
// Type
// Image
import loading from '../images/loading.gif';

/**
 * Wrapper is the main app shell
 * Single form shows the single route form
 * Multi form shows the multi form textarea
 */

function Wrapper({ gettingInformation, currentVessels }: any) {
  return (
    <div className="wrapper">
      <h1>Cargo App</h1>
      <SingleForm />
      <hr />
      <MultiForm />
      <hr />
      {gettingInformation ? (
        <div className="loading">
          <img src={loading} alt="Loading..." />
        </div>
      ) : null}
      <DisplayTable vessels={currentVessels} />
      <footer>
        <p className="credits">Cargo App Beta 1.0 - 2020</p>
      </footer>
    </div>
  );
}

// Redux specific functionality
function mapStateToProps(state: any) {
  let { currentVessels, gettingInformation } = state;
  return { currentVessels, gettingInformation };
}

export default connect(mapStateToProps)(Wrapper);
