import React, { useState } from "react";

const Toggle = ({ ctrl, colors }) => {
  const [active, setActive] = useState(false);
  return (
    <div
      onClick={() => setActive(!active)}
      className={`relative flex flex-row h-6`}
    >
      <div
        className={`absolute inset-0 px-1 pt-0.5 z-20 pointer-events-none flex font-mono text-sm flex-row justify-between`}
      >
        <span style={{ color: colors.primary }}>name</span>
        <span style={{ color: colors.secondary }}>{active ? "ON" : "OFF"}</span>
      </div>
      <div
        className={`absolute transition duration-150 inset-0 w-full z-10`}
        style={
          active
            ? { backgroundColor: colors.background }
            : { backgroundColor: "#00000000" }
        }
      ></div>
    </div>
  );
};

export default Toggle;
