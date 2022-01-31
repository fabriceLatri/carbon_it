class Treasure {
  constructor(treasureData) {
    const data = treasureData.v.split(' - ');
    this.typeItem = data[0];
    this.x = parseInt(data[1]);
    this.y = parseInt(data[2]);
    this.count = parseInt(data[3]);
  }
}

module.exports = Treasure;
