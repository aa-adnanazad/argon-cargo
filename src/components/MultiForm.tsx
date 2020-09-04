import React from 'react';
import { connect } from 'react-redux';
import XLSX from 'xlsx';

// Helpers
import { debug } from '../helpers/';
import { MULTI_LIMIT } from '../config/config';
import message from '../helpers/message';
import {
  fetchSinglePortDetails,
  MOCKfetchSinglePortDetails,
} from '../helpers/fetchSinglePortDetails';
import groupToVessels from '../helpers/groupToVessels';
import textToPortPairs from '../helpers/textToPortPairs';
import endsWith from '../helpers/endsWith';
import fileInputToText from '../helpers/fileInputToText';

import Vessel from '../types/Vessel';

import { MOCK_MODE } from '../config/config';

function MultiForm(props: any) {
  let { gettingInformation, textareaValue, dispatch } = props;

  return (
    <div className="multiForm">
      <h2>Multi Routes</h2>
      <p>Enter multiple origin, destination pairs</p>

      <form onSubmit={(event) => multiFormSubmitAction(event, props)}>
        <p>
          You can upload a file with from/to combinations (xls, xlsx, csv only)
        </p>
        <input
          onChange={(event) => fileUploadAction(event, dispatch)}
          type="file"
          name="excelFile"
          disabled={gettingInformation}
        />

        <p>Or type the routes manually like in the box (1 pair per line)</p>
        <textarea
          onChange={(event) => textareaChange(event, dispatch)}
          name="multiTextarea"
          id="multiTextarea"
          value={textareaValue}
          placeholder={`SGSIN, JPYOK\nCNSHA, SGSIN\nCNSHK, BDCGP`}
          disabled={gettingInformation}></textarea>
        <button className="submit" disabled={gettingInformation}>
          Get Multi Route Information
        </button>
      </form>
      <form></form>
    </div>
  );
}

/**
 * Small function to handle textarea with state
 * Important for setting the input values
 * @param event
 * @param dispatch
 */
function textareaChange(event: any, dispatch: any) {
  let { value } = event.target;
  dispatch({ type: 'CHANGE_TEXTAREA', value });
}

/**
 * File upload action
 * Uploads an excel file and gets the rows and columns
 * @param event
 */
function fileUploadAction(event: any, dispatch: any) {
  let file = event.target.files[0];
  // Get the extension
  let ext = endsWith(file.name);

  let reader = new FileReader();

  reader.onload = function (evt) {
    var data = evt.target?.result;
    let workbook = XLSX.read(data, {
      type: 'array',
    });
    var first_worksheet = workbook.Sheets[workbook.SheetNames[0]];
    var jsonArr = XLSX.utils.sheet_to_json(first_worksheet, { header: 1 });
    let textValue = fileInputToText(jsonArr);
    dispatch({ type: 'CHANGE_TEXTAREA', value: textValue });
  };
  // Acceptable file formats
  let acceptedFormats = ['xls', 'xlsx', 'xlsb', 'csv'];

  if (acceptedFormats.includes(ext)) {
    reader.readAsArrayBuffer(file);
  } else {
    // File not supported
    debug(ext, 'files not supported');
  }
}

/**
 * multi form submit action
 * Important to put it here for state change
 * Async func because I am relied on external data
 * handles the action after user submits the single form
 *
 * @param {Event} event
 *
 */
async function multiFormSubmitAction(event: any, props: any) {
  event.preventDefault();
  let { dispatch } = props;
  let { value } = event.target.multiTextarea;

  if (!value) return;
  document.title = message.LOADING_TEXT;

  // Convert the textarea input into port pairs
  let pair = textToPortPairs(value);

  let allData: any[] = [];
  let allPromises: any[] = [];
  let allReturnedPromises: any[] = [];
  let limit = MULTI_LIMIT;

  dispatch({ type: 'GETTING_INFO', value: true });

  pair.forEach((route) => {
    if (route.length >= 2 && limit) {
      // Run only limited number of routes
      // Ignore the rest
      limit--;
      debug('Adding a new promise');
      if (MOCK_MODE) {
        allPromises.push(MOCKfetchSinglePortDetails());
      } else {
        allPromises.push(fetchSinglePortDetails(route[0], route[1]));
      }
    }
  });

  // Wait for all promises to finish
  allReturnedPromises = await Promise.all(allPromises);

  debug('Got this data from promises', allReturnedPromises);

  allReturnedPromises.forEach((response) => {
    let { status, rawData } = response;

    if (status === 200 || status === 201) {
      if (rawData.length) {
        // Format the response
        let vessels = groupToVessels(rawData);
        allData.push(vessels);
      } else {
        // Nothing came back from the response
        debug('Nothing returned from the API');
      }
    } else {
      debug('The server responded with status', status);
    }
  });

  dispatch({ type: 'GET_MULTI_VESSELS', value: allData });

  // Make a new short array with first items from each responses
  let finalData: Vessel[] = [];

  allData.forEach((list) => finalData.push(list[0]));

  dispatch({ type: 'GET_NEW_VESSELS', value: finalData });

  // After getting the information, remove the loading state
  dispatch({ type: 'GETTING_INFO', value: false });
  document.title = `${message.FINISHED_LOADING} (${finalData.length})`;
}

// Redux specific functionality
function mapStateToProps(state: any) {
  return {
    gettingInformation: state.gettingInformation,
    textareaValue: state.textareaValue,
  };
}

export default connect(mapStateToProps)(MultiForm);
