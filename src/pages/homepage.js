import React, { useEffect, useContext, useRef } from "react";
import Character from "../components/character";
import Object from "../components/object";
import { LevelContext } from "../contexts/levelContext";
import object_locations from "../data/object_locations.json";
import Modal from "../components/modal";

function Homepage() {
  const level = useContext(LevelContext);
  const elementsRef = useRef(object_locations.map(() => React.createRef(null)));
  const characterRef = useRef(null);

  const backgroundStyle = {
    width: level.levelAttributes.width,
    height: level.levelAttributes.height,
    background:
      "linear-gradient(to bottom, #0078D7 0%, #0078D7 95%, #373737 95%, #373737 100%)",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  };

  useEffect(() => {
    if (window.innerHeight * 1.777 > window.innerWidth) {
      level.dispatch("RESIZE_PORTRAIT");
    } else {
      level.dispatch("RESIZE_LANDSCAPE");
    }
    window.onresize = () => {
      if (window.innerHeight * 1.777 > window.innerWidth) {
        level.dispatch("RESIZE_PORTRAIT");
      } else {
        level.dispatch("RESIZE_LANDSCAPE");
      }
    };
  }, []);

  return (
    <>
      <div style={backgroundStyle}>
        <Character block={elementsRef} ref={characterRef} />
        {object_locations.map((object, index) => {
          return (
            <Object
              ref={elementsRef}
              object={object}
              index={index}
              key={`object${index}`}
            />
          );
        })}
        <Modal character={characterRef} />
      </div>
    </>
  );
}

export default Homepage;
