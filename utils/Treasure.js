class Treasure {
  constructor(treasureData) {
    const data = treasureData.v.split(' - ');
    this.typeItem = data[0];
    this.x = parseInt(data[1]);
    this.y = parseInt(data[2]);
    this.count = parseInt(data[3]);
  }

  getTreasureInfo = () => {
    if (this.count === 0) {
      return '';
    } else {
      return (
        this.typeItem +
        ' - ' +
        this.x.toString() +
        ' - ' +
        this.y.toString() +
        ' - ' +
        this.count.toString() +
        '\n'
      );
    }
  };
}

module.exports = Treasure;
