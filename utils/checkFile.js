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
  return arrayFileTrim
    .filter((element) => element[0] !== '#')
    .reduce(
      (a, v) => {
        let regexp = null;
        switch (v[0]) {
          case 'C':
            regexp = new RegExp('C - [0-9]+ - [0-9]+');
            if (v.match(regexp)) {
              return { ...a, ...a.C.push({ v }) };
            } else {
              return { ...a };
            }

          case 'M':
            regexp = new RegExp('M - [0-9]+ - [0-9]+');
            if (v.match(regexp)) {
              return { ...a, ...a.M.push({ v }) };
            } else {
              return { ...a };
            }

          case 'T':
            regexp = new RegExp('T - [0-9]+ - [0-9]+ - [0-9]+');
            if (v.match(regexp)) {
              return { ...a, ...a.T.push({ v }) };
            } else {
              return { ...a };
            }

          case 'A':
            regexp = new RegExp(
              'A - [A-Za-z]+ - [0-9]+ - [0-9]+ - [SNOE] - [AGD]+'
            );
            if (v.match(regexp)) {
              return { ...a, ...a.A.push({ v }) };
            } else {
              return { ...a };
            }

          default:
            return { ...a };
        }
      },
      { A: [], C: [], M: [], T: [] }
    );
};

const dispatchData = (data) => {
  data.reduce((acc, current) => {
    switch (current[0]) {
      case 'C':
    }
  }, []);
};

module.exports = {
  exists,
  read,
  parseData,
};
