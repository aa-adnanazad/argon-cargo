/**
 * A Vessel is a ship that carries containers
 * We are interested in the carrier name,
 * departure place, arrival place, transitTime and
 * few other details
 *
 * This type is used by typescript typechecking
 */
type Vessel = {
  carrier: string;
  departure: string;
  arrival: string;
  service: string;
  code: string;
  transitTime: number;
  depDate: Date;
  arvDate: Date;
};

export default Vessel;
