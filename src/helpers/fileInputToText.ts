import { debug } from '../helpers/';
/**
 * Takes an array and returns a text form
 * To be used on the textarea value
 * @param fileContentsArray
 * @returns {string} textValue
 */

export default function fileInputToText(fileContentsArray: any): string {
  let textValue = ``;
  fileContentsArray.forEach((row: any) => {
    if (row[0].length === 5 && row[1].length === 5) {
      textValue += `${row[0]}, ${row[1]}\n`;
      debug(row[0], row[1]);
    }
  });
  return textValue;
}
