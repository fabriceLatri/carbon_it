const { promises: Fs, constants } = require('fs');
const path = require('path');

const DIR_FILE = 'entryFiles/';

/**
 * Check if the file exists in entryfiles folder
 * @function exists
 * @async
 * @param {string} filename
 * @return {boolean}
 */
const exists = async (filename) => {
  try {
    const absoluteFilePath = path.resolve(DIR_FILE + filename);
    await Fs.access(absoluteFilePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

const read = async (filename) => {
  try {
    const absoluteFilePath = path.resolve(DIR_FILE + filename);
    const result = await Fs.readFile(absoluteFilePath, 'utf-8');
    return result;
  } catch (error) {
    return error;
  }
};

const parseData = (data) => {
  let arrayFile = data.split('\n');
  let arrayFileTrim = arrayFile.map((element) => element.trim());
  return arrayFileTrim.filter((element) => element[0] !== '#');
};

module.exports = {
  exists,
  read,
  parseData,
};
