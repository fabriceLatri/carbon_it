const Mountain = require('./Moutain');
const Treasure = require('./Treasure');
const Adventurer = require('./Adventurer');

class Map {
  constructor(parsedData) {
    this.parsedData = parsedData;
    this.mapData = parsedData.C;
    this.mountainsData = parsedData.M;
    this.treasuresData = parsedData.T;
    this.adventurersData = parsedData.A;
    this.outputGrid = null;
    this.grid = null;
  }

  initMap = () => {
    if (this.mapData.length !== 1) {
      throw 'Invalid parameters Map';
    }
    const elements = this.mapData[0].v
      .split('-')
      .map((element) => element.trim());

    // pattern of the map is a multidimensional array map[y][x]. x is horizontal axis and y is vertical axis

    let outputGrid = '';
    let map = [];

    for (let i = 0; i < parseInt(elements[2]); i++) {
      map[i] = [];
      for (let j = 0; j < parseInt(elements[1]); j++) {
        map[i][j] = [];
        if (j !== parseInt(elements[1]) - 1) {
          outputGrid += '.\t';
        } else {
          outputGrid += '.';
        }
      }
      if (i < parseInt(elements[2]) - 1) {
        outputGrid += '\n';
      }
    }

    this.outputGrid = outputGrid;
    this.grid = map;
  };

  renderMap = () => {
    // Reset outputGrid
    let output = '';
    this.grid.forEach((yAxis) => {
      yAxis.forEach((xAxis) => {
        if (xAxis.length === 0) {
          // nothing elements inside. It's a classic map
          output += '.\t';
        } else {
          const mountainsCount = xAxis.filter((item) => {
            return item instanceof Mountain;
          }).length;
          const treasuresArr = xAxis.filter((item) => {
            return item instanceof Treasure;
          });
          const adventurersArr = xAxis.filter((item) => {
            return item instanceof Adventurer;
          });

          if (mountainsCount > 0) {
            output += `M\t`;
          } else if (treasuresArr.length > 0) {
            const treasuresCount = treasuresArr.reduce((acc, current) => {
              return acc + current.count;
            }, 0);
            output += `T(${treasuresCount})\t`;
          } else if (adventurersArr.length === 1) {
            output += `A(${adventurersArr[0].name})\t`;
          }
        }
        output += '\t';
      });
      output += '\n';
    });
    this.outputGrid = output;
    return output;
  };

  makeMoutain = () => {
    this.mountainsData.forEach((mountainData) => {
      const mountain = new Mountain(mountainData);
      this.insertItem(mountain);
    });
  };

  makeTreasure = () => {
    this.treasuresData.forEach((treasureData) => {
      const treasure = new Treasure(treasureData);
      this.insertItem(treasure);
    });
  };

  makeAdventurer = () => {
    this.adventurersData.forEach((adventurerData) => {
      const adventurer = new Adventurer(adventurerData);
      this.insertItem(adventurer);
    });
  };

  insertItem = (item) => {
    if (this.existsMapCoordinates(item) && this.isAvailable(item)) {
      [...this.grid, this.grid[item.y][item.x].push(item)];
    }
  };

  existsMapCoordinates = (item) => {
    return item.y < this.grid.length && item.x < this.grid[0].length
      ? true
      : false;
  };

  isAvailable = (item) => {
    return this.grid[item.y][item.x].filter(
      (element) => element instanceof Mountain || element instanceof Adventurer
    ).length === 0
      ? true
      : false;
  };

  search = () => {
    const adventurers = this.getAdvendurersMap();
    adventurers.forEach((adventurer) => {
      // Récupérer les nouvelles coordonnées  ou direction de l'aventurier
      const newCoordinates = adventurer.newCoordinates(this.grid);

      // si la séquence était A, vérifier si la nouvelle coordonnées est valide

      // Si valide, sauvegarder les nouvelles coordonnées

      // Décrémenter la valeur de count de l'aventurier
    });
  };

  getOutputGrid = () => {
    return this.outputGrid;
  };

  getMapData = () => {
    return this.mapData;
  };

  getGrid = () => {
    return this.grid;
  };

  getAdvendurersMap = () => {
    const adventurers = [];
    this.grid.forEach((yAxis) => {
      yAxis.forEach((xAxis) => {
        xAxis.forEach((item) => {
          if (item instanceof Adventurer) {
            adventurers.push(item);
          }
        });
      });
    });
    return adventurers;
  };
}

module.exports = Map;
