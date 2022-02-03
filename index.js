const checkFile = require('./utils/checkFile');
const Map = require('./utils/MapGrid');

// Check arguments of the program
const myArgs = process.argv.slice(2);

// 1. Check if the file is passed as an argument and exists in the entryFiles folder
const filename = myArgs[0] ?? 'example.txt';
checkFile
  .exists(filename)
  .then((fileExists) => {
    if (!fileExists) throw 'File not found';

    return checkFile.read(filename);
  })
  .then((data) => {
    // 2. Read the file and put the uncommented statements into an object
    return checkFile.parseData(data);
  })
  .then((parsedData) => {
    // 3. Build the map
    const mapClass = new Map(parsedData);
    mapClass.initMap();
    // 4. Put the mountains in the map
    mapClass.makeMoutain();
    // 5. Put the treasures in the map
    mapClass.makeTreasure();
    // 6. Put the adventurers on the map
    mapClass.makeAdventurer();
    // 7 & 8. Search for treasures and display of results.
    mapClass.search();
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
