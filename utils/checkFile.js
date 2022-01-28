const { promises: Fs, constants } = require('fs');
const path = require('path');

/**
 * Check if the file exists in entryfiles folder
 * @function exists
 * @async
 * @param {string} filename
 * @return {boolean}
 */
const exists = async (filename) => {
  try {
    const absoluteFilePath = path.resolve('entryFiles/' + filename);
    await Fs.access(absoluteFilePath, constants.R_OK);
    return true;
  } catch {
    return false;
  }
};

module.exports = {
  exists,
};
