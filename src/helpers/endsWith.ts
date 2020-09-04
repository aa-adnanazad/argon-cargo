/**
 * Takes a file name from the file.name
 * and gets the extension of the file
 * @param filename
 */
export default function endsWith(filename: string): string {
  let fileArray = filename.split('.');
  return fileArray[fileArray.length - 1];
}
