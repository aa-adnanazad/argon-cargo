import React from 'react';
import '../css/display_table.css';
import { connect } from 'react-redux';

// External dependencies
import moment from 'moment';

// Helper functions
import downloadCSV from '../helpers/downloadCSV';

// Type
import Vessel from '../types/Vessel';

// Data
// import routeGroupsList from '../data/routeGroupsList.json';

// var vessels = groupToVessels(routeGroupsList);

/**
 * This component will take the data from the app
 * and display them as a table
 */

type TableProp = {
  vessels: Vessel[];
};

function DisplayTable({ vessels }: TableProp) {
  if (!vessels.length) {
    return (
      <div>
        <h3>Your information will show up here</h3>
      </div>
    );
  }

  return (
    <div className="displayTableArea">
      <div className="tableButton">
        <h2>Your Information is Ready for Download</h2>
        <div className="buttonSide">
          <a
            href="/"
            onClick={(event) => downloadCSV(event, vessels)}
            className="submit">
            Download CSV
          </a>
        </div>
      </div>
      <div className="mainTable">
        <table className="data-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Carrier</th>
              <th>Departure</th>
              <th>Arrival</th>
              <th>Service/Vessel</th>
              <th>Transit Time</th>
            </tr>
          </thead>
          <tbody>
            {vessels.map((vessel, index) => (
              <TableRow index={index} key={index} vessel={vessel} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

type TableRowProp = {
  vessel: Vessel;
  index: number;
};

function TableRow({ vessel, index }: TableRowProp) {
  let {
    carrier,
    departure,
    arrival,
    service,
    code,
    transitTime,
    arvDate,
    depDate,
  } = vessel;

  return (
    <tr>
      <td>{index + 1}</td>
      <td>{carrier}</td>
      <td>
        <div>{departure}</div>
        <small>{moment(depDate).format('D MMM, YYYY (ddd)')}</small>
      </td>
      <td>
        <div>{arrival}</div>
        <small>{moment(arvDate).format('D MMM, YYYY (ddd)')}</small>
      </td>
      <td>
        <div>{code}</div>
        <small>{service}</small>
      </td>
      <td>{transitTime} days</td>
    </tr>
  );
}

// Redux specific functionality
function mapStateToProps(state: any) {
  return { currentVessels: state.currentVessels };
}

export default connect(mapStateToProps)(DisplayTable);
