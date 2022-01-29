const path = require('path');
const fs = require('fs');

const checkFile = require('./utils/checkFile');

// Check arguments of the program
const myArgs = process.argv.slice(2);

// 1. Vérifier si le fichier est passé en argument et existe dans le dossier entryFiles
const filename = myArgs[0] ?? 'example.txt';
checkFile
  .exists(filename)
  .then((fileExists) => {
    if (!fileExists) throw 'File not found';

    return checkFile.read(filename);
  })
  .then((data) => {
    // 2. Lire le fichier et mettre les instructions non commentées dans un objet
    return checkFile.parseData(data);
  })
  .then((parsedData) => {
    console.log(parsedData);
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// 3. Construire la map

// 4. Mettre les montagnes dans la carte

// 5. Mettre les trésors dans la carte

// 6. Mettre les avanturiers sur la carte

// 7. Créer les mouvements Avance, Gauche, Droite

// 8. Récupérer les trésors (counter)

// 9. Indiquer les réponses dans le fichier de sortie output.txt
