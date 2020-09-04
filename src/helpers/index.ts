/**
 * The helper is a utility file that holds
 * many reusable functions
 * All the functions are in their own seperate files
 * This one only has a debug function
 */
import { DEBUG_MODE } from '../config/config';

function debug(...args: any) {
  if (DEBUG_MODE) {
    console.log('DEBUG: ', ...args);
  }
}

export { debug };
