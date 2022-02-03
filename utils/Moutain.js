class Mountain {
  constructor(mountainData) {
    const data = mountainData.v.split(' - ');
    this.typeItem = data[0];
    this.x = parseInt(data[1]);
    this.y = parseInt(data[2]);
  }

  /**
   * Renderer infos of the mountain
   * @return {string}
   *
   * @memberof Mountain
   */
  getMountainInfo = () => {
    return (
      this.typeItem +
      ' - ' +
      this.x.toString() +
      ' - ' +
      this.y.toString() +
      '\n'
    );
  };
}

module.exports = Mountain;
