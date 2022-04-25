import React, { createContext, useReducer } from "react";
import { levelReducer } from "../reducers/levelReducer";

export const LevelContext = createContext();

const screen = {
  width: window.innerHeight * 1.777,
  height: window.innerHeight,
  margin: "auto",
};

const LevelContextProvider = (props) => {
  const [levelAttributes, dispatch] = useReducer(levelReducer, screen);

  return (
    <LevelContext.Provider value={{ levelAttributes, dispatch }}>
      {props.children}
    </LevelContext.Provider>
  );
};

export default LevelContextProvider;
