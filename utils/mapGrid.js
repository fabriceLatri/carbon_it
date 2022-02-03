const Mountain = require('./Moutain');
const Treasure = require('./Treasure');
const Adventurer = require('./Adventurer');
const checkFile = require('./checkFile');

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

  /**
   * Grid Initialization
   * @return {void}
   *
   *
   * @memberof Map
   */
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

  /**
   * Renderer the map with mountains, treasures and adventurers positions
   * @return {string}
   *
   * @memberof Map
   */
  renderMap = () => {
    let output = '';
    this.grid.forEach((yAxis) => {
      yAxis.forEach((xAxis) => {
        if (xAxis.length === 0) {
          // nothing elements inside. It's a classic map
          output += '.'.padEnd(15);
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
            output += 'M'.padEnd(15);
          } else if (adventurersArr.length === 1) {
            output += `A(${
              adventurersArr[0].name.length < 5
                ? adventurersArr[0].name
                : adventurersArr[0].name.substring(0, 3) + '...'
            })`.padEnd(15);
          } else if (treasuresArr.length > 0) {
            const treasuresCount = treasuresArr.reduce((acc, current) => {
              return acc + current.count;
            }, 0);
            output += `T(${treasuresCount})`.padEnd(15);
          }
        }
      });
      output += '\n';
    });
    this.outputGrid = output;
    return output;
  };

  /**
   * Insert a mountain in the map
   * @return {void}
   *
   * @memberof Map
   */
  makeMoutain = () => {
    this.mountainsData.forEach((mountainData) => {
      const mountain = new Mountain(mountainData);
      this.insertItem(mountain);
    });
  };

  /**
   * Insert a treasure in the map
   * @return {void}
   *
   * @memberof Map
   */
  makeTreasure = () => {
    this.treasuresData.forEach((treasureData) => {
      const treasure = new Treasure(treasureData);
      this.insertItem(treasure);
    });
  };

  /**
   * Insert an adventurer in the map
   * @return {void}
   *
   * @memberof Map
   */
  makeAdventurer = () => {
    this.adventurersData.forEach((adventurerData, index) => {
      adventurerData.id = index;
      const adventurer = new Adventurer(adventurerData);
      this.insertItem(adventurer);
    });
  };

  /**
   * Insert item (mountain, treasure, adventurer) in the map
   * @param {Mountain|Treasure|Adventurer} item instance of Mountain or Treasure or Adventurer
   * @return {void}
   *
   * @memberof Map
   */
  insertItem = (item) => {
    if (this.existsMapCoordinates(item) && this.isAvailable(item)) {
      // Check if a treasure with the same coordinates exists
      const treasuresItems = this.grid[item.y][item.x].filter(
        (element) => element instanceof Treasure
      );
      if (item instanceof Treasure && treasuresItems.length > 0) {
        treasuresItems[0].count += item.count;
      } else {
        [...this.grid, this.grid[item.y][item.x].push(item)];
      }
    }
  };

  /**
   * Check if the coordinates exists on the map
   * @param {number[]} item Coordinates to check
   * @return {boolean}
   *
   * @memberof Map
   */
  existsMapCoordinates = (item) => {
    return item.y < this.grid.length &&
      item.y > -1 &&
      item.x < this.grid[0].length &&
      item.x > -1
      ? true
      : false;
  };

  /**
   * Check if the coordinates is not occuped by a mountain or an other adventurer
   * @param {Adventurer} item an adventurer
   * @return {boolean}
   *
   * @memberof Map
   */
  isAvailable = (item) => {
    return this.grid[item.y][item.x].filter(
      (element) => element instanceof Mountain || element instanceof Adventurer
    ).length === 0
      ? true
      : false;
  };

  /**
   * Sequence for all adventurers: move - search treasure. At the end, write the result on the file example.env on the dist folder.
   * @return {void}
   *
   * @memberof Map
   */
  search = () => {
    const adventurers = this.getAdvendurersMap();
    const maxSequence = adventurers.reduce((acc, current) => {
      return current.countSequence > acc ? current.countSequence : acc;
    }, 0);

    for (let i = 0; i < maxSequence; i++) {
      adventurers.map((adventurer) => {
        if (adventurer.countSequence > -1) {
          // Récupérer les nouvelles coordonnées  ou direction de l'aventurier
          const newCoordinates = adventurer.newCoordinates();

          const newCoordinatesObj = {
            x: newCoordinates[0],
            y: newCoordinates[1],
          };

          if (
            adventurer.getLetterOfSequence(i) === 'A' &&
            this.existsMapCoordinates(newCoordinatesObj) &&
            this.isAvailable(newCoordinatesObj)
          ) {
            // Save the new coordinates of the adventurer on the map
            this.moveAdventurerOnTheMap(adventurer, newCoordinates);

            // Check if a treasure has been found
            this.findTreasure(adventurer);
          }

          adventurer.countSequence -= 1;
        }
      });

      // console.log(this.renderMap());
    }

    // End of the hunt!! Show the result
    checkFile.write(this.resultHunt());
    checkFile.write(this.renderMap());
  };

  /**
   * Give the treasure hunt results
   * @return {string}
   *
   * @memberof Map
   */
  resultHunt = () => {
    const adventurers = this.getAdvendurersMap();
    const treasures = this.getTreasuresMap();
    const mountains = this.getMountainsMap();

    let output = this.mapData[0].v + '\n';

    const outputMountains = mountains.reduce((acc, current) => {
      return acc + current.getMountainInfo();
    }, '');

    const outputTreasures = treasures.reduce((acc, current) => {
      return acc + current.getTreasureInfo();
    }, '# {T comme Trésor} - {Axe horizontal} - {Axe vertical} - {Nb. de trésors restants}\n');

    const outputAdventurers = adventurers.reduce((acc, current) => {
      return acc + current.getAdventurerInfo();
    }, '# {A comme Aventurier} - {Nom de l’aventurier} - {Axe horizontal} - {Axe vertical} - {Orientation} - {Nb. trésors ramassés}\n');

    output += outputMountains + outputTreasures + outputAdventurers;

    return output;
  };

  /**
   * Move adventurers on the map
   * @param {Adventurer} adventurer Adventurer to move
   * @param {number[]} newCoordinates new coordinates of the adventurer
   * @return {void}
   *
   * @memberof Map
   */
  moveAdventurerOnTheMap = (adventurer, newCoordinates) => {
    let newGrid = this.grid.map((yAxis) =>
      yAxis.map((xAxis) =>
        xAxis.filter((item) => {
          return item.id !== adventurer.id;
        })
      )
    );

    [adventurer.x, adventurer.y] = newCoordinates;

    newGrid[adventurer.y][adventurer.x].push(adventurer);

    this.grid = newGrid;
  };

  /**
   * Search for treasure on map location
   * @param {Adventurer} adventurer Adventurer to move
   * @return {void}
   *
   * @memberof Map
   */
  findTreasure = (adventurer) => {
    const itemsTreasure = this.grid[adventurer.y][adventurer.x].filter(
      (item) => item instanceof Treasure
    );

    if (itemsTreasure.length > 0) {
      // We found a treasure
      if (itemsTreasure[0].count > 0) {
        itemsTreasure[0].count -= 1;
        adventurer.countTreasure += 1;
      }
    }
  };

  /**
   * @return {string}
   *
   * @memberof Map
   */
  getOutputGrid = () => {
    return this.outputGrid;
  };

  /**
   * @return {array}
   *
   * @memberof Map
   */
  getMapData = () => {
    return this.mapData;
  };

  /**
   * @return {array}
   *
   * @memberof Map
   */
  getGrid = () => {
    return this.grid;
  };

  /**
   * Get all adventurers on the map
   * @return {Adventurer[]}
   *
   * @memberof Map
   */
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

  /**
   * Get all treasures on the map
   * @return {Treasure[]}
   *
   * @memberof Map
   */
  getTreasuresMap = () => {
    const treasures = [];
    this.grid.forEach((yAxis) => {
      yAxis.forEach((xAxis) => {
        xAxis.forEach((item) => {
          if (item instanceof Treasure) {
            treasures.push(item);
          }
        });
      });
    });
    return treasures;
  };

  /**
   * Get all mountains on the map
   * @return {Mountain[]}
   *
   * @memberof Map
   */
  getMountainsMap = () => {
    const mountains = [];
    this.grid.forEach((yAxis) => {
      yAxis.forEach((xAxis) => {
        xAxis.forEach((item) => {
          if (item instanceof Mountain) {
            mountains.push(item);
          }
        });
      });
    });
    return mountains;
  };
}

module.exports = Map;
