const checkFile = require('./utils/checkFile');

// Check arguments of the program
const myArgs = process.argv.slice(2);

// Authorize only one argument (filename)
switch (myArgs.length) {
  case 0:
    // No argument. Use example.txt filename
    checkFile.test();
    const filePath = path.resolve(__dirname, 'entryFiles', 'example.txt');
    fs.readFile(filePath, 'utf-8', function (err, data) {
      if (err) {
        console.error(err);
      }
      console.log(data);
    });

  case 1:
  // One arggument passed!! Check if the file exists in entryFiles folder

  // const filePath = path.resolve(__dirname, 'entryFiles');
  // fs.readFile(filePath, 'utf-8', function (err, data) {
  //   if (err) {
  //     console.error(err);
  //   }
  //   console.log(data);
  // });
}

console.log('test asynchrone');
