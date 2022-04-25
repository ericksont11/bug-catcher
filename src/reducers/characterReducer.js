export const characterReducer = (state, action) => {
  switch (action.type) {
    case "MOVE_LEFT":
      if (parseFloat(state.left) === 0) return state;
      return {
        ...state,
        left: parseFloat(state.left) - state.speed + "%",
      };
    case "MOVE_RIGHT":
      if (parseFloat(state.left) === 97) return state;
      return {
        ...state,
        left: parseFloat(state.left) + state.speed + "%",
      };
    case "MOVE_UP":
      if (parseFloat(state.top) === 0) return state;
      return {
        ...state,
        top: parseFloat(state.top) - state.speed + "%",
      };
    case "MOVE_DOWN":
      if (parseFloat(state.top) === 94.5) return state;
      return {
        ...state,
        top: parseFloat(state.top) + state.speed + "%",
      };
    case "RESET":
      return {
        ...state,
        top: "85%",
        left: "3%",
      };
    default:
      return state;
  }
};
