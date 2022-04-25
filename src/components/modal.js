import { useState, useEffect } from "react";

const Modal = (props) => {
  const [text, setText] = useState("");
  const [visibility, setVisibility] = useState("visible");

  const modalStyle = {
    position: "absolute",
    top: "30%",
    left: "30%",
    width: "40%",
    height: "40%",
    background:
      "linear-gradient(to top, black 0%, black 90%, #b4b4b4 90%, #b4b4b4 100%)",
    visibility: visibility,
  };

  useEffect(() => {
    const string = "cd bug-catcher/ && npm start ";
    let text = "";
    let time = 0;
    setTimeout(() => {
      for (let index = 0; index < string.length; index++) {
        setTimeout(() => {
          setText((text = text + string[index]).slice(0, -1) + " |");
        }, time);
        time = time + 100;
      }
    }, 2000);
    setTimeout(() => {
      setVisibility("hidden");
      props.character.current.style.display = "inline-block";
    }, 7000);
  }, []);

  return (
    <div style={modalStyle}>
      <span
        style={{
          position: "absolute",
          marginTop: "8%",
          marginLeft: "2%",
          color: "white",
          fontSize: "1vw",
        }}
      >
        <span
          style={{
            color: "#4CBB17",
          }}
        >
          kind-developer@DESKTOP-6b696e64&nbsp;
        </span>
        MINGW64&nbsp;
        <span
          style={{
            color: "gold",
          }}
        >
          /c
        </span>
      </span>
      <span
        style={{
          position: "absolute",
          marginTop: "12%",
          marginLeft: "2%",
          color: "white",
          fontSize: "1vw",
        }}
      >
        $ {text}
      </span>
    </div>
  );
};

export default Modal;
