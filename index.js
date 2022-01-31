const checkFile = require('./utils/checkFile');
const Map = require('./utils/MapGrid');

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
    // 3. Construire la map
    const mapClass = new Map(parsedData);
    mapClass.initMap();
    // 4. Mettre les montagnes dans la carte
    mapClass.makeMoutain();
    // 5. Mettre les trésors dans la carte
    mapClass.makeTreasure();
    // 6. Mettre les avanturiers sur la carte
    mapClass.makeAdventurer();
    // 7. Créer les mouvements Avance, Gauche, Droite
    mapClass.search();

    console.log(mapClass.renderMap());
  })
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });

// 8. Récupérer les trésors (counter)

// 9. Indiquer les réponses dans le fichier de sortie output.txt
