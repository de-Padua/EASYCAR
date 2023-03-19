import React from "react";

export default function apresentation({ h2Text, paragText, image, direction }) {
  const test = direction
    ? { flexDirection: "rowReverse" }
    : { flexDirection: "row" };
  return (
    <div className="container-ap" style={test}>
      <div className="text-ap">
        <h1>{h2Text}</h1>
        <p>{paragText}</p>
      </div>
      <div className="pic-ap">
        <img src={image} />{" "}
      </div>
    </div>
  );
}
