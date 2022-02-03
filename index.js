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
    console.log('\x1b[32m', ' -  Map is created\n\n');
    // 4. Put the mountains in the map
    mapClass.makeMoutain();
    console.log('\x1b[32m', ' -  Mountains are implemented on the map\n\n');
    // 5. Put the treasures in the map
    mapClass.makeTreasure();
    console.log('\x1b[32m', ' - Treasures are well hidden hahaha\n\n');
    // 6. Put the adventurers on the map
    mapClass.makeAdventurer();
    console.log('\x1b[32m', " - Adventurers are ready!! Let's go!!\n\n");
    // 7 & 8. Search for treasures and display of results.
    mapClass.search();

    console.log(
      '\x1b[32m',
      ' - Everything is OK. Go to the dist folder and check the file ouput.env. Thank you!!\n\n'
    );
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
