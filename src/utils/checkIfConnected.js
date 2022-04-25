const cross = [
  { height: "8%", width: "3%", top: "10%", left: "10%" },
  { height: "8%", width: "3%", top: "10%", left: "13%" },
  { height: "8%", width: "3%", top: "2%", left: "13%" },
  { height: "8%", width: "3%", top: "18%", left: "13%" },
  { height: "8%", width: "3%", top: "10%", left: "16%" },
];

const line = [
  { height: "8%", width: "3%", top: "10%", left: "10%" },
  { height: "8%", width: "3%", top: "10%", left: "13%" },
  { height: "8%", width: "3%", top: "10%", left: "16%" },
  { height: "8%", width: "3%", top: "10%", left: "19%" },
  { height: "8%", width: "3%", top: "10%", left: "22%" },
];

const brokenLine = [
  { height: "8%", width: "3%", top: "10%", left: "20%" },
  { height: "8%", width: "3%", top: "10%", left: "10%" },
  { height: "8%", width: "3%", top: "10%", left: "23%" },
  { height: "8%", width: "3%", top: "10%", left: "13.1%" },
  { height: "8%", width: "3%", top: "10%", left: "16%" },
];

const censored = [
  { height: "8%", width: "3%", top: "10%", left: "10%" },
  { height: "8%", width: "3%", top: "2%", left: "10%" },
  { height: "8%", width: "3%", top: "5%", left: "13%" },
  { height: "8%", width: "3%", top: "5%", left: "16%" },
  { height: "8%", width: "3%", top: "5%", left: "19%" },
];

const tetris = [
  { height: "8%", width: "3%", top: "10%", left: "10%" },
  { height: "8%", width: "3%", top: "2%", left: "10%" },
  { height: "8%", width: "3%", top: "5%", left: "13%" },
  { height: "8%", width: "3%", top: "10%", left: "19%" },
  { height: "8%", width: "3%", top: "10%", left: "16%" },
];

const checkIfConnected = (vaseLocations) => {
  const array = [];
  for (let i = 1; i < vaseLocations.length; i++) {
    const currentVase = vaseLocations[i];
    const arrayLength = array.length;
    for (let j = 0; j < i; j++) {
      if (j === i) continue;
      if (
        parseFloat(currentVase.top) - 8 <= parseFloat(vaseLocations[j].top) &&
        parseFloat(currentVase.top) + 8 >= parseFloat(vaseLocations[j].top) &&
        parseFloat(currentVase.left) - 3 <= parseFloat(vaseLocations[j].left) &&
        parseFloat(currentVase.left) + 3 >= parseFloat(vaseLocations[j].left)
      ) {
        array.push([i, j]);
      }
    }
    // if (arrayLength === array.length) return false;
  }
  return true;

  function checkPair() {
    checkArray = [];
    for (let i = 0; i < array.length; i++) {
      let check = 0;
      for (let j = 0; j < array.length; j++) {
        if (array[i][0] === array[j][0]) {
          check++;
          if (!checkArray.includes(array[i][0])) {
            checkArray.push(array[i][0]);
          }
          if (!checkArray.includes(array[j][0])) {
            checkArray.push(array[j][0]);
          }
        }
      }
      if (check === 1) {
        let check2 = 0;
        for (let k = 0; k < array.length; k++) {
          if (array[k][0] === array[i][1]) {
            check2++;
          }
        }
        if (check2 === 1) {
          checkArray = [];
        } else {
          check2 = 0;
        }
      } else {
        check = 0;
      }
    }
    if (checkArray.length === vaseLocations.length) {
      return true;
    } else {
      return false;
    }
  }
  return checkPair();
};

console.log(checkIfConnected(tetris));
// export { checkIfConnected };
