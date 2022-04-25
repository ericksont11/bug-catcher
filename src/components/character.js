import React, { useContext, useEffect, useState, useRef } from "react";
import { CharacterContext } from "../contexts/characterContext";
import object_locations from "../data/object_locations.json";
import CharacterFront from "../images/tim-front.png";

const Character = React.forwardRef((props, ref) => {
  let recentKey = "";
  let intervalSpeed = 33.33;
  let interval = "";

  let [canPickupItem, setCanPickupItem] = useState({
    pickup: false,
    index: "",
  });
  let [holdingItem, setHoldingItem] = useState({ pickup: false, index: "" });
  let character = useContext(CharacterContext);
  let characterRef = useRef(character);
  let pickupRef = useRef(canPickupItem);
  let holdingRef = useRef(holdingItem);

  const setRefs = () => {
    characterRef.current = character;
    pickupRef.current = canPickupItem;
    holdingRef.current = holdingItem;
  };
  setRefs();

  const characterStyle = {
    position: "absolute",
    left: character.characterAttributes.left,
    top: character.characterAttributes.top,
    height: "5.33%",
    width: "3%",
    zIndex: 2,
    display: "none",
  };

  const checkObjects = (character, adjustment, pickupRef) => {
    for (let index = 0; index < object_locations.length; index++) {
      const object = object_locations[index];
      const characterLeftPosition = parseFloat(
        character.characterAttributes.left
      );
      const characterWidth = parseFloat(character.characterAttributes.width);
      const characterHeight = parseFloat(character.characterAttributes.height);
      const characterTopPosition = parseFloat(
        character.characterAttributes.top
      );
      const blockLeftPosition = parseFloat(
        props.block.current[index].current.style.left
      );
      const blockTopPosition = parseFloat(
        props.block.current[index].current.style.top
      );
      const blockWidth = parseFloat(object.width);
      const blockHeight = parseFloat(object.height);

      if (
        characterLeftPosition + adjustment < blockLeftPosition + blockWidth &&
        characterLeftPosition + adjustment >
          blockLeftPosition - characterWidth &&
        characterTopPosition + adjustment >
          blockTopPosition - characterHeight &&
        characterTopPosition + adjustment < blockTopPosition + blockHeight
      ) {
        props.block.current[index].current.style.filter =
          "drop-shadow(0px 0px 20px white)";
        setCanPickupItem({ pickup: true, index: index });
        break;
      } else {
        props.block.current[index].current.style.filter = "none";
        setCanPickupItem(false, index);
      }
    }
  };

  const characterControls = (
    e,
    character,
    characterRef,
    pickupRef,
    holdingRef
  ) => {
    if (e.repeat || ref.current.style.display === "none") return;
    if (e.key === "ArrowRight" || e.key.toLowerCase() === "d") {
      e.preventDefault();
      clearInterval(interval);
      if (e.key.toLowerCase() === "d") recentKey = "d";
      if (e.key === "ArrowRight") recentKey = "ArrowRight";
      interval = setInterval(() => {
        character.dispatch({ type: "MOVE_RIGHT" });
        checkObjects(characterRef.current, 0.5, pickupRef);
      }, intervalSpeed);
    } else if (e.key === "ArrowLeft" || e.key.toLowerCase() === "a") {
      e.preventDefault();
      clearInterval(interval);
      if (e.key.toLowerCase() === "a") recentKey = "a";
      if (e.key === "ArrowLeft") recentKey = "ArrowLeft";
      interval = setInterval(() => {
        character.dispatch({ type: "MOVE_LEFT" });
        checkObjects(characterRef.current, -0.5, pickupRef);
      }, intervalSpeed);
    } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
      e.preventDefault();
      clearInterval(interval);
      if (e.key.toLowerCase() === "s") recentKey = "s";
      if (e.key === "ArrowDown") recentKey = "ArrowDown";
      interval = setInterval(() => {
        character.dispatch({ type: "MOVE_DOWN" });
        checkObjects(characterRef.current, 0.5, pickupRef);
      }, intervalSpeed);
    } else if (e.key === "ArrowUp" || e.key.toLowerCase() === "w") {
      e.preventDefault();
      clearInterval(interval);
      if (e.key.toLowerCase() === "w") recentKey = "w";
      if (e.key === "ArrowUp") recentKey = "ArrowUp";
      interval = setInterval(() => {
        character.dispatch({ type: "MOVE_UP" });
        checkObjects(characterRef.current, -0.5, pickupRef);
      }, intervalSpeed);
    } else if (e.key === " " || e.key === "Enter") {
      const testCase =
        parseFloat(characterRef.current.characterAttributes.top) < 9 &&
        parseFloat(characterRef.current.characterAttributes.left) < 6;
      if (
        pickupRef.current.pickup === true &&
        holdingRef.current.pickup === false &&
        !testCase
      ) {
        setHoldingItem({ pickup: true, index: pickupRef.current.index });
        props.block.current[pickupRef.current.index].current.style.visibility =
          "hidden";
        props.block.current[
          pickupRef.current.index
        ].current.nextSibling.style.visibility = "hidden";
      } else if (
        holdingRef.current.pickup === true &&
        parseFloat(characterRef.current.characterAttributes.top) < 9 &&
        parseFloat(characterRef.current.characterAttributes.left) < 6
      ) {
        props.block.current[
          holdingRef.current.index
        ].current.nextSibling.style.visibility = "hidden";

        props.block.current[pickupRef.current.index].current.style.filter =
          "drop-shadow(0px 0px 10px green) brightness(3)";
        setHoldingItem({ pickup: false, index: "" });
      } else if (holdingRef.current.pickup === true) {
        setHoldingItem({ pickup: false, index: "" });
        props.block.current[holdingRef.current.index].current.style.left =
          characterRef.current.characterAttributes.left;
        props.block.current[
          holdingRef.current.index
        ].current.nextSibling.style.left =
          parseFloat(characterRef.current.characterAttributes.left) - 12 + "%";
        props.block.current[holdingRef.current.index].current.style.top =
          characterRef.current.characterAttributes.top;
        props.block.current[
          holdingRef.current.index
        ].current.nextSibling.style.top =
          parseFloat(characterRef.current.characterAttributes.top) + 6 + "%";
        props.block.current[holdingRef.current.index].current.style.visibility =
          "visible";
        props.block.current[
          holdingRef.current.index
        ].current.nextSibling.style.visibility = "visible";
      }
    }
  };

  const movement = (e) => {
    characterControls(e, character, characterRef, pickupRef, holdingRef);
  };

  useEffect(() => {
    const remove = (e) => {
      if (e.key === recentKey) {
        clearInterval(interval);
      }
    };

    window.addEventListener("keydown", movement);
    window.addEventListener("keyup", remove);
    return () => {
      window.removeEventListener("keydown", movement);
      // window.removeEventListener("keyup", remove);
    };
  }, []);

  return (
    <>
      <img
        ref={ref}
        style={characterStyle}
        src={CharacterFront}
        alt={"character model"}
      />
    </>
  );
});

export default Character;
