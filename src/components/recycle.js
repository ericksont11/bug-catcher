import React from "react";

const Recycle = (props) => {
  const imgStyle = {
    position: "absolute",
    top: props.object.top,
    left: props.object.left,
    width: props.object.width,
    height: props.object.height,
  };

  return (
    <>
      <img
        key={`img${props.index}`}
        style={imgStyle}
        src={props.source}
        alt={props.object.type}
      />
    </>
  );
};

export default Recycle;
