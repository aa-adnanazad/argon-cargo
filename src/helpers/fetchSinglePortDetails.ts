import apiUrlMaker from './apiUrlMaker';
import { debug } from './index';
import Response from '../types/Response';
import routeGroupsList from '../data/routeGroupsList.json';

/**
 * fetch single port details
 * Calls the external API for the vessel data
 * @param {string} origin string origin code
 * @param {string} destination string origin code
 * @returns {Promise} resolve or reject object
 */
function fetchSinglePortDetails(
  origin: string,
  destination: string
): Promise<any> {
  // Make the api endpoint url
  const URL = apiUrlMaker(origin, destination);

  let response: Response;

  response = {
    status: 0,
    rawData: [],
  };

  return new Promise(function (resolve, reject) {
    fetch(URL)
      .then((res) => {
        debug(res.status);
        response.status = res.status;
        return res.json();
      })
      .then(function (res) {
        debug('I GOT THE RESPONSE!!');
        if (res.routeGroupsList) {
          response.rawData = [...res.routeGroupsList];
        }
        resolve(response);
      })
      .catch(function (err) {
        debug('ERROR, when trying to fetch the API, see error --', err);
        resolve(response);
      });
  });
}

/**
 * A mock function that emulates the same functionality
 * without connecting to the api
 */
function MOCKfetchSinglePortDetails(): Promise<any> {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve({ status: 200, rawData: routeGroupsList });
    }, 500);
  });
}

export { fetchSinglePortDetails, MOCKfetchSinglePortDetails };
