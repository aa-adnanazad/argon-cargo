// type Vessel = {
//   carrier: string;
//   departure: string;
//   arrival: string;
//   service: string;
//   code: string;
//   transitTime: number;
// };

import Vessel from '../types/Vessel';

/**
 * This utility function will take the raw API object
 * and make a list of vessels to be displayed by the app
 * @param rawApiData object with vessel information
 */
export default function groupToVessels(rawApiData: object[]): Vessel[] {
  var vessels: Vessel[] = [];
  var vessel: Vessel;

  rawApiData.forEach((group: any) => {
    group.route.forEach((item: any) => {
      vessel = {
        carrier: group.carrier.name,
        departure: item.por.location.name,
        arrival: item.fnd.location.name,
        service: '',
        code: '',
        transitTime: item.transitTime,
        arvDate: item.fnd.eta,
        depDate: item.por.etd
      };

      if (item.leg[0] && item.leg[0].service) {
        vessel.service = item.leg[0].service.name;
      }

      if (item.leg[0] && item.leg[0].service) {
        vessel.code = item.leg[0].service.code;
      }

      vessels.push(vessel);
    });
  });

  return vessels;
}
