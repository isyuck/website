import React, { useRef, useState, useEffect, PropTypes } from "react";
import SliderX from "./slider-x.jsx";
import SliderXY from "./slider-xy.jsx";
import Toggle from "./toggle.jsx";

const Control = ({ ctrlValues, setCtrlValues }) => {
  // map string values denoting what component to use
  // to the actual component to use
  const compKey = {
    SliderX: SliderX,
    SliderXY: SliderXY,
  };

  const colors = {
    background: "#d1d5db",
    primary: "#222",
    secondary: "#999",
  };

  return (
    <div
      className="bg-gray-100 overflow-y-scroll h-screen"
      style={{ width: "50vw" }}
    >
      <div className="w-full px-4 pt-4 flex flex-col space-y-4">
        <Toggle colors={colors} />
        {ctrlValues.map((ctrl) => (
          <>
            {React.createElement(compKey[ctrl.comp], {
              ctrl: ctrl,
              colors: colors,
            })}
          </>
        ))}
      </div>
    </div>
  );
};

export default Control;
