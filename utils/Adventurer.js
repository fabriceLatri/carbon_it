// Constants of direction: [x, y]
const north = [0, -1];
const east = [1, 0];
const south = [0, 1];
const west = [-1, 0];

class Adventurer {
  constructor(adventurerData) {
    const data = adventurerData.v.split(' - ');
    this.typeItem = data[0];
    this.name = data[1];
    this.x = parseInt(data[2]);
    this.y = parseInt(data[3]);
    this.direction = data[4];
    this.sequence = data[5];
    this.coordinatesOfDirection = this.getCoordinates(this.direction);
    this.countSequence = this.sequence.length;
    this.countTreasure = 0;
  }

  newCoordinates = () => {
    if (this.countSequence > -1) {
      const action = this.sequence[this.sequence.length - this.countSequence];
      switch (action) {
        case 'A':
          const x = this.coordinatesOfDirection[0] + this.x;
          const y = this.coordinatesOfDirection[1] + this.y;
          return [x, y];

        case 'D':
          this.direction = this.rotate(90);
          return [this.x, this.y];
        case 'G':
          this.direction = this.rotate(-90);
          return [this.x, this.y];

        default:
          return [this.x, this.y];
      }
    }
  };

  rotate = (deg) => {
    switch (this.direction) {
      case 'N':
        return deg < 0 ? 'O' : 'E';

      case 'E':
        return deg < 0 ? 'N' : 'S';

      case 'S':
        return deg < 0 ? 'E' : 'O';

      case 'O':
        return deg < 0 ? 'S' : 'N';

      default:
        return this.direction;
    }
  };

  getCoordinates = (direction) => {
    switch (direction) {
      case 'S':
        return this.getSouth();

      case 'N':
        return this.getNorth();

      case 'O':
        return this.getWest();

      case 'E':
        return this.getEast();

      default:
        return null;
    }
  };

  getSouth = () => {
    return south;
  };

  getNorth = () => {
    return north;
  };

  getWest = () => {
    return west;
  };

  getEast = () => {
    return east;
  };
}

module.exports = Adventurer;
