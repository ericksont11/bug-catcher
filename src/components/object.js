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
    <>
      <img
        key={`img${props.index}`}
        ref={ref.current[props.index]}
        style={imgStyle}
        src={require(`../images/${props.object.source}`)}
        alt={props.object.type}
      />
    </>
  );
});

export default Object;
