/**
 * SingleForm will take origin and destination code
 * and process the API
 */
import React from 'react';
import { connect } from 'react-redux';
// Sub Components
import InputField from './InputField';

// Data
import ports from '../data/port_data.json';

// Type
import Response from '../types/Response';

// Utility functions
import { debug } from '../helpers';
import { MOCK_MODE } from '../config/config';
import message from '../helpers/message';
import {
  fetchSinglePortDetails,
  MOCKfetchSinglePortDetails,
} from '../helpers/fetchSinglePortDetails';
import groupToVessels from '../helpers/groupToVessels';

/**
 * SingleForm component for the user to enter two port codes
 * And get the results
 * Form will call this function and make state change
 */

function SingleForm(props: any) {
  let { gettingInformation } = props;
  return (
    <div className="singleForm">
      <h2>Single Route</h2>
      <form onSubmit={(event) => singleFormSubmitAction(event, props)}>
        <div className="fieldArea">
          <InputField name="origin" gettingInformation={gettingInformation} />
          <InputField
            name="destination"
            gettingInformation={gettingInformation}
          />
        </div>
        <datalist id="portList">
          {ports.map((port, index) => (
            <option key={index} value={port.code}>
              {port.name}
            </option>
          ))}
        </datalist>
        <div className="buttonArea">
          <button className="submit" disabled={gettingInformation}>
            Get Single Route Information
          </button>
        </div>
      </form>
    </div>
  );
}

/**
 * single form submit action
 * Important to put it here for state change
 * Async func because I am relied on external data
 * handles the action after user submits the single form
 *
 * @param {Event} event
 *
 */
async function singleFormSubmitAction(event: any, props: any) {
  event.preventDefault();

  let { dispatch } = props;

  let originCode = event.target.origin.value;
  let destinationCode = event.target.destination.value;

  if (!originCode || !destinationCode) return;
  debug('CALLING THE API');
  document.title = message.LOADING_TEXT;
  // event.target.reset();
  // Before getting the information, do the loading state
  dispatch({ type: 'GETTING_INFO', value: true });

  let response: Response;

  // Get the response object and make the state change!
  // Utility function from helpers/index
  if (MOCK_MODE) {
    // Mock data when net is down
    // Get's a set of saved data
    response = await MOCKfetchSinglePortDetails();
  } else {
    response = await fetchSinglePortDetails(originCode, destinationCode);
  }

  // Now store into the state and populate the table
  let { status, rawData } = response;
  let count = 0;

  if (status === 200 || status === 201) {
    if (rawData.length) {
      // Format the response
      let vessels = groupToVessels(rawData);
      count = vessels.length;
      dispatch({ type: 'GET_NEW_VESSELS', value: vessels });
    } else {
      // Nothing came back from the response
      debug('Nothing returned from the API');
    }
  } else {
    debug('The server responded with status', status);
  }

  debug('Got this response from the API', response);

  // After getting the information, remove the loading state
  dispatch({ type: 'GETTING_INFO', value: false });
  document.title = `${message.FINISHED_LOADING} (${count})`;
}

// Redux specific functionality
function mapStateToProps(state: any) {
  return { gettingInformation: state.gettingInformation };
}

export default connect(mapStateToProps)(SingleForm);
