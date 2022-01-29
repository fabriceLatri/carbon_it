const assert = require('assert');
const checkFile = require('../utils/checkFile.js');
const mapGrid = require('../utils/mapGrid.js');

describe('checkFile TU', function () {
  describe('#exists()', function () {
    it('should return true when the file exists, false else', async function () {
      assert.equal(await checkFile.exists('example.txt'), true);
      assert.equal(await checkFile.exists('example.php'), false);
    });
  });
});

// describe('checkFile', function () {
//   describe('#read()', function () {
//     it('should return correct content of the file', async function () {
//       const testResult = `# {C comme Carte} - {Nb. de case en largeur} - {Nb. de case en hauteur}\nC - 3 - 4`;
//       assert.equal(await checkFile.read('example.txt'), testResult);
//     });
//   });
// });

describe('checkfile TU', function () {
  describe('#parseData()', function () {
    it('should return a object sorted by type for each lines of file', function () {
      const testData =
        '# {C comme Carte} - {Nb. de case en largeur} - {Nb. de case en hauteur}\n\t# {C comme Carte} - {Nb. de case en largeur} - {Nb. de case en hauteur}\nC - 3 - 4\nM - 1 - 0\nM - 2 - 1\nT - 0 - 3 - 2\nT - 1 - 3 - 3\n# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Séquence de mouvement}\nA - Lara - 1 - 1 - S - AADADAGGA';
      assert.deepEqual(
        {
          A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
          C: [{ v: 'C - 3 - 4' }],
          M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
          T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
        },
        checkFile.parseData(testData)
      );
    });
  });
});

describe('mapGrid TU', function () {
  describe('#initMap()', function () {
    it('should return a map from dataParsed', function () {
      const dataParsed = {
        A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
        C: [{ v: 'C - 3 - 4' }],
        M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
        T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
      };
      assert.equal(
        '.\t.\t.\n.\t.\t.\n.\t.\t.\n.\t.\t.',
        mapGrid.initMap(dataParsed)
      );
    });
  });
});

// describe('makeMap TU', function () {
//   describe('#createMap()', function () {
//     it('should return a map from data parsed of the file', function () {
//       const data = [
//         'C - 3 - 4',
//         'M - 1 - 0',
//         'M - 2 - 1',
//         'T - 0 - 3 - 2',
//         'T - 1 - 3 - 3',
//         'A - Lara - 1 - 1 - S - AADADAGGA',
//       ];
//       assert.equal('. . .\n. . .\n. . .\n. . .');
//     });
//   });
// });
