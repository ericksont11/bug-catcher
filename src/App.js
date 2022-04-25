import "./App.css";
import LevelContextProvider from "./contexts/levelContext";
import CharacterContextProvider from "./contexts/characterContext";
import Homepage from "./pages/homepage";

function App() {
  return (
    <LevelContextProvider>
      <CharacterContextProvider>
        <Homepage />
      </CharacterContextProvider>
    </LevelContextProvider>
  );
}

export default App;
