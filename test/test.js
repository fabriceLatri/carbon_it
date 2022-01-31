const assert = require('assert');
const Adventurer = require('../utils/Adventurer');
const checkFile = require('../utils/checkFile');
const Map = require('../utils/MapGrid');

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
    it('create a map from dataParsed', function () {
      const dataParsed = {
        A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
        C: [{ v: 'C - 3 - 4' }],
        M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
        T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
      };
      const grid = new Map(dataParsed);
      grid.initMap();

      assert.equal('.\t.\t.\n.\t.\t.\n.\t.\t.\n.\t.\t.', grid.getOutputGrid());
    });
  });
});

describe('mapGrid TU', function () {
  describe('#makeMountain()', function () {
    it('should implement mountains in the map', function () {
      const dataParsed = {
        A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
        C: [{ v: 'C - 3 - 4' }],
        M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
        T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
      };
      const grid = new Map(dataParsed);
      grid.initMap();
      grid.makeMoutain();
      assert.equal(
        grid.renderMap(),
        '.\t\tM\t\t.\t\t\n.\t\t.\t\tM\t\t\n.\t\t.\t\t.\t\t\n.\t\t.\t\t.\t\t\n'
      );
    });
  });
});

describe('mapGrid TU', function () {
  describe('#makeTreasure()', function () {
    it('should implement treasures in the map', function () {
      const dataParsed = {
        A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
        C: [{ v: 'C - 3 - 4' }],
        M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
        T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
      };
      const grid = new Map(dataParsed);
      grid.initMap();
      grid.makeMoutain();
      grid.makeTreasure();
      assert.equal(
        grid.renderMap(),
        '.\t\tM\t\t.\t\t\n.\t\t.\t\tM\t\t\n.\t\t.\t\t.\t\t\nT(2)\t\tT(3)\t\t.\t\t\n'
      );
    });
  });
});

describe('mapGrid TU', function () {
  describe('#makeAdventurer()', function () {
    it('should implement adventurers in the map', function () {
      const dataParsed = {
        A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
        C: [{ v: 'C - 3 - 4' }],
        M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
        T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
      };
      const grid = new Map(dataParsed);
      grid.initMap();
      grid.makeMoutain();
      grid.makeTreasure();
      grid.makeAdventurer();
      assert.equal(
        grid.renderMap(),
        '.\t\tM\t\t.\t\t\n.\t\tA(Lara)\t\tM\t\t\n.\t\t.\t\t.\t\t\nT(2)\t\tT(3)\t\t.\t\t\n'
      );
    });
  });
});

describe('mapGrid TU', function () {
  describe('#makeAdventurer()', function () {
    it('should implement adventurers in the map, but ignore if the start position is the same of an other', function () {
      const dataParsed = {
        A: [
          { v: 'A - Lara - 1 - 1 - S - AADADAGGA' },
          { v: 'A - Nathan - 0 - 1 - S - AADADAGGA' },
          { v: 'A - Lara2 - 1 - 1 - S - AADADAGGA' },
        ],
        C: [{ v: 'C - 3 - 4' }],
        M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
        T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
      };
      const grid = new Map(dataParsed);
      grid.initMap();
      grid.makeMoutain();
      grid.makeTreasure();
      grid.makeAdventurer();
      assert.equal(
        grid.renderMap(),
        '.\t\tM\t\t.\t\t\nA(Nathan)\t\tA(Lara)\t\tM\t\t\n.\t\t.\t\t.\t\t\nT(2)\t\tT(3)\t\t.\t\t\n'
      );
    });
  });
});

describe('Adventurer TU', function () {
  describe('#newCoordinates() - All directions for A', function () {
    it('should return new coordinates of Adventurer', function () {
      const adventurer = new Adventurer({
        v: 'A - Lara - 1 - 1 - S - AADADAGGA',
      });
      const adventurer2 = new Adventurer({
        v: 'A - Lara - 1 - 1 - N - AADADAGGA',
      });
      const adventurer3 = new Adventurer({
        v: 'A - Lara - 1 - 1 - O - AADADAGGA',
      });
      const adventurer4 = new Adventurer({
        v: 'A - Lara - 1 - 1 - E - AADADAGGA',
      });
      assert.deepEqual(adventurer.newCoordinates(), [1, 2]);
      assert.deepEqual(adventurer2.newCoordinates(), [1, 0]);
      assert.deepEqual(adventurer3.newCoordinates(), [0, 1]);
      assert.deepEqual(adventurer4.newCoordinates(), [2, 1]);
    });
  });
});

describe('Adventurer TU', function () {
  describe('#newCoordinates() - All directions for G', function () {
    it('should return new coordinates of Adventurer', function () {
      const adventurer = new Adventurer({
        v: 'A - Lara - 1 - 1 - S - GADADAGGA',
      });
      const adventurer2 = new Adventurer({
        v: 'A - Lara - 1 - 1 - O - GADADAGGA',
      });
      const adventurer3 = new Adventurer({
        v: 'A - Lara - 1 - 1 - N - GADADAGGA',
      });
      const adventurer4 = new Adventurer({
        v: 'A - Lara - 1 - 1 - E - GADADAGGA',
      });
      assert.deepEqual(adventurer.newCoordinates(), [1, 1]);
      assert.deepEqual(adventurer2.newCoordinates(), [1, 1]);
      assert.deepEqual(adventurer3.newCoordinates(), [1, 1]);
      assert.deepEqual(adventurer4.newCoordinates(), [1, 1]);
      assert.equal(adventurer.direction, 'E');
      assert.equal(adventurer2.direction, 'S');
      assert.equal(adventurer3.direction, 'O');
      assert.equal(adventurer4.direction, 'N');
    });
  });
});

describe('Adventurer TU', function () {
  describe('#newCoordinates() - All directions for D', function () {
    it('should return new coordinates of Adventurer', function () {
      const adventurer = new Adventurer({
        v: 'A - Lara - 1 - 1 - S - DADADAGGA',
      });
      const adventurer2 = new Adventurer({
        v: 'A - Lara - 1 - 1 - O - DADADAGGA',
      });
      const adventurer3 = new Adventurer({
        v: 'A - Lara - 1 - 1 - N - DADADAGGA',
      });
      const adventurer4 = new Adventurer({
        v: 'A - Lara - 1 - 1 - E - DADADAGGA',
      });
      assert.deepEqual(adventurer.newCoordinates(), [1, 1]);
      assert.deepEqual(adventurer2.newCoordinates(), [1, 1]);
      assert.deepEqual(adventurer3.newCoordinates(), [1, 1]);
      assert.deepEqual(adventurer4.newCoordinates(), [1, 1]);
      assert.equal(adventurer.direction, 'O');
      assert.equal(adventurer2.direction, 'N');
      assert.equal(adventurer3.direction, 'E');
      assert.equal(adventurer4.direction, 'S');
    });
  });
});

// describe('mapGrid TU', function () {
//   describe('#isEmptyAdventurer()', function () {
//     it('should return true if the tile of the map is valid to implement adventurer, false else', function () {
//       const dataParsed = {
//         A: [{ v: 'A - Lara - 1 - 1 - S - AADADAGGA' }],
//         C: [{ v: 'C - 3 - 4' }],
//         M: [{ v: 'M - 1 - 0' }, { v: 'M - 2 - 1' }],
//         T: [{ v: 'T - 0 - 3 - 2' }, { v: 'T - 1 - 3 - 3' }],
//       };
//       const grid = new Map(dataParsed);
//       grid.initMap();
//       grid.makeMoutain();
//       grid.makeTreasure();
//       grid.makeAdventurer();
//       assert.equal(
//         grid.renderMap(),
//         '.\t\tM\t\t.\t\t\n.\t\tA(Lara)\t\tM\t\t\n.\t\t.\t\t.\t\t\nT(2)\t\tT(3)\t\t.\t\t\n'
//       );
//     });
//   });
// });
