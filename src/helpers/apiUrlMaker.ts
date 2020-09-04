import { API_KEY } from '../config/config';

/**
 * api url maker
 * Small utility for making the api url
 * @param {string} origin
 * @param {string} destination
 * @returns {string} the api url
 */
export default function apiUrlMaker(
  origin: string,
  destination: string
): string {
  return `https://apis.cargosmart.com/openapi/schedules/routeschedules?appKey=${API_KEY}&porID=${origin}&fndID=${destination}`;
}
