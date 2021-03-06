import React, { useEffect, useState, useRef } from "react";

const Object = React.forwardRef((props, ref) => {
  const [rotationPosition, setRotationPosition] = useState({
    rotation: 0,
    direction: "clockwise",
  });
  const imgStyle = {
    position: "absolute",
    top: props.object.top,
    left: props.object.left,
    width: props.object.width,
    height: props.object.height,
  };
  const bugText = {
    position: "absolute",
    top: parseFloat(props.object.top) + 6 + "%",
    left: parseFloat(props.object.left) - 12 + "%",
    width: "auto",
    height: "auto",
    color: "red",
    backgroundColor: "white",
    fontFamily: "'Lucida Grande', sans-serif",
    fontSize: ".75vw",
    fontWeight: "bolder",
    padding: ".5%",
  };

  let rotationRef = useRef(rotationPosition);
  const setRefs = () => {
    rotationRef.current = rotationPosition;
  };
  setRefs();

  useEffect(() => {
    const bugAnimation = (rotationRef) => {
      setInterval(() => {
        if (
          ref.current[props.index].current &&
          ref.current[props.index].current.style.width !== "4%"
        ) {
          ref.current[
            props.index
          ].current.style.transform = `rotate(${rotationRef.current.rotation}deg)`;
          if (
            rotationRef.current.direction === "clockwise" &&
            rotationRef.current.rotation < 20
          ) {
            setRotationPosition({
              rotation: rotationRef.current.rotation + 2,
              direction: "clockwise",
            });
          } else if (
            rotationRef.current.direction === "counterClockwise" &&
            rotationRef.current.rotation > -20
          ) {
            setRotationPosition({
              rotation: rotationRef.current.rotation - 2,
              direction: "counterClockwise",
            });
          } else {
            if (rotationRef.current.direction === "counterClockwise") {
              setRotationPosition({
                rotation: rotationRef.current.rotation,
                direction: "clockwise",
              });
            } else {
              setRotationPosition({
                rotation: rotationRef.current.rotation,
                direction: "counterClockwise",
              });
            }
          }
        }
      }, 100);
    };
    bugAnimation(rotationRef);
  }, []);

  return (
    <div>
      <img
        key={`img${props.index}`}
        style={imgStyle}
        ref={ref.current[props.index]}
        src={require(`../images/${props.object.source}`)}
        alt={props.object.type}
      />
      <div style={bugText}>{props.object.text}</div>
    </div>
  );
});

export default Object;
