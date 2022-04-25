import React, { createContext, useReducer } from "react";
import { characterReducer } from "../reducers/characterReducer";

export const CharacterContext = createContext();

const characterState = {
  top: "90%",
  left: "3%",
  speed: 0.5,
  width: "3%",
  height: "5.33%",
};

const CharacterContextProvider = (props) => {
  const [characterAttributes, dispatch] = useReducer(
    characterReducer,
    characterState
  );

  return (
    <CharacterContext.Provider value={{ characterAttributes, dispatch }}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export default CharacterContextProvider;
