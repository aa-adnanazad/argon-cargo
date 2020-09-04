import { debug } from '../helpers/';
import Vessel from '../types/Vessel';

export default function downloadCSV(event: any, vessels: Vessel[]) {
  var csvData: any[] = [];

  var from, to: string;

  if (vessels.length) {
    from = vessels[0].departure;
    to = vessels[0].arrival;
  } else {
    from = 'unknown';
    to = 'unknown';
  }

  vessels.forEach((vessel) => {
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

    debug(service);

    csvData.push([
      carrier,
      departure,
      depDate,
      arrival,
      arvDate,
      code,
      transitTime,
    ]);
  });

  var csv =
    'Carrier,Departure,Dep. Date,Arrival,Arv. Date,Service/Vessel,Transit Time(days)\n';
  csvData.forEach((item) => {
    csv += item.join(',');
    csv += '\n';
  });

  // var hiddenElement = document.createElement('a');
  var downloadButton = event.target;

  downloadButton.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
  downloadButton.target = '_blank';
  downloadButton.download = `${from}_to_${to}.csv`;
}
