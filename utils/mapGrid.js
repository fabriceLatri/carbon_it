const initMap = (dataParsed) => {
  const mapData = dataParsed.C;

  if (mapData.length !== 1) {
    throw 'Invalid parameters Map';
  }
  const elements = mapData[0].v.split('-').map((element) => element.trim());

  // pattern of the map is a multidimensional array map[x][y]. x is horizontal axis and y is vertical axis

  let outputGrid = '';
  let map = [];

  for (let i = 0; i < parseInt(elements[2]); i++) {
    map[i] = [];
    for (let j = 0; j < parseInt(elements[1]); j++) {
      map[i][j] = '.';
      if (j === parseInt(elements[1]) - 1) {
        outputGrid += map[i].join('\t');
      }
    }
    if (i < parseInt(elements[2]) - 1) {
      outputGrid += '\n';
    }
  }

  return outputGrid;
};

module.exports = {
  initMap,
};
