const checkFile = require('./utils/checkFile');

// Check arguments of the program
const myArgs = process.argv.slice(2);

// Authorize only one argument (filename)
// switch (myArgs.length) {
//   case 0:
//     // No argument. Use example.txt filename
//     checkFile.test();
//     const filePath = path.resolve(__dirname, 'entryFiles', 'example.txt');
//     fs.readFile(filePath, 'utf-8', function (err, data) {
//       if (err) {
//         console.error(err);
//       }
//       console.log(data);
//     });

//   case 1:
// One arggument passed!! Check if the file exists in entryFiles folder

// const filePath = path.resolve(__dirname, 'entryFiles');
// fs.readFile(filePath, 'utf-8', function (err, data) {
//   if (err) {
//     console.error(err);
//   }
//   console.log(data);
// });
// }

// 1. Vérifier si le fichier est passé en argument et existe dans le dossier entryFiles

// 2. Lire le fichier et mettre les instructions non commentées dans un tableau

// 3. Construire la map

// 4. Mettre les montagnes dans la carte

// 5. Mettre les trésors dans la carte

// 6. Mettre les avanturiers sur la carte

// 7. Créer les mouvements Avance, Gauche, Droite

// 8. Récupérer les trésors (counter)

// 9. Indiquer les réponses dans le fichier de sortie output.txt

console.log('test asynchrone');
