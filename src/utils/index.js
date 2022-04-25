const checkIfConnected = (vaseLocations) => {
  for (let i = 0; i < vaseLocations.length; i++) {
    let currentVase = vaseLocations[i];
    for (let j = 0; j < i; j++) {
      if (j === i) continue;
      if (
        parseFloat(currentVase.top) - 8 <= parseFloat(vaseLocations[j].top) &&
        parseFloat(currentVase.top) + 8 >= parseFloat(vaseLocations[j].top) &&
        parseFloat(currentVase.left) - 3 <= parseFloat(vaseLocations[j].left) &&
        parseFloat(currentVase.left) + 3 >= parseFloat(vaseLocations[j].left)
      ) {
        return array.push([i, j]);
      }
    }
  }
  return false;
};
