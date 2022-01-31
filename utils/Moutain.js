class Mountain {
  constructor(mountainData) {
    const data = mountainData.v.split(' - ');
    this.typeItem = data[0];
    this.x = parseInt(data[1]);
    this.y = parseInt(data[2]);
  }
}

module.exports = Mountain;
