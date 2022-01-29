class Map {
  constructor(data) {
    // data form : 'C - x - y'
    let dataParsed = data.split('-').trim();
    this._x = parseInt(dataParsed[1]) ?? null;
    this._y = parseInt(dataParsed[2]) ?? null;
  }

  createMap() {}
}
