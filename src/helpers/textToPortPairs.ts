import { debug } from '../helpers/';

export default function textToPortPairs(rawValue: string) {
  let output = rawValue.split('\n').map((item) => {
    item.trim();
    return item.split(',').map((code) => code.trim().toUpperCase());
  });
  debug(output);
  return output;
}
