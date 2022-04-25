// Require algo file
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
        return true;
      }
    }
  }
  return false;
};

describe("CheckIfConnected", () => {
  it("Should return true if inputs are connected", () => {
    const input = [
      { height: "8%", width: "3%", top: "10%", left: "10%" },
      { height: "8%", width: "3%", top: "10%", left: "13%" },
    ];

    const output = true;

    expect(checkIfConnected(input)).toEqual(output);
  });

  it("Should return true if inputs are connected", () => {
    const input = [
      { height: "8%", width: "3%", top: "18%", left: "10%" },
      { height: "8%", width: "3%", top: "10%", left: "13%" },
    ];

    const output = true;

    expect(checkIfConnected(input)).toEqual(output);
  });

  it("Should return false if inputs are not connected", () => {
    const input = [
      { height: "8%", width: "3%", top: "10%", left: "10%" },
      { height: "8%", width: "3%", top: "10%", left: "13.1%" },
    ];

    const output = false;

    expect(checkIfConnected(input)).toEqual(output);
  });

  it("Should return false if inputs are not connected", () => {
    const input = [
      { height: "8%", width: "3%", top: "18.1%", left: "10%" },
      { height: "8%", width: "3%", top: "10%", left: "13.1%" },
    ];

    const output = false;

    expect(checkIfConnected(input)).toEqual(output);
  });
});
