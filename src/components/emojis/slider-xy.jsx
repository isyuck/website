import React from "react";
import Slider from "react-input-slider";

const SliderXY = ({ ctrl, colors }) => {
  return (
    <div
      className={`relative flex flex-col text-gray-800 transition-opacity duration-500`}
      style={{ height: "calc(50vw - 1.25rem)" }}
    >
      <div
        className={`absolute inset-0 w-full z-20 flex pointer-events-none font-mono text-sm flex-row justify-between`}
      >
        <div className="absolute top-0 left-0 px-1 pt-0.5 pointer-events-auto">
          <span style={{ color: colors.primary }}>{ctrl.name}</span>
        </div>
        <div className="absolute bottom-0 w-full flex justify-between px-1">
          <span style={{ color: colors.secondary }}>{`X ${ctrl.value.x.toFixed(
            2
          )}`}</span>
          <span style={{ color: colors.secondary }}>{`Y ${ctrl.value.y.toFixed(
            2
          )}`}</span>
        </div>
      </div>
      <div className="absolute inset-0 w-full z-10">
        <Slider
          styles={{
            track: {
              backgroundColor: colors.background,
              height: "100%",
              width: "calc(50vw - 1.5rem)",
              boxSizing: "border-box",
              border: `1px solid ${colors.background}`,
              borderRadius: 0,
            },
            active: {
              height: "calc(50vw - 1.25rem)",
              width: "calc(50vw - 1.25rem)",
              backgroundColor: colors.background,
              height: 23,
              borderRadius: 0,
            },
            thumb: {
              width: 16,
              height: 16,
              border: "0px solid #000",
              borderStyle: "solid",
              backgroundColor: "#f3f4f6",
              boxShadow: "inset 0px 0px 0px 0px red",
              borderRadius: 0,
            },
          }}
          axis="xy"
          x={ctrl.value.x}
          y={ctrl.value.y}
          xmin={ctrl.minVal}
          xmax={ctrl.maxVal}
          ymin={ctrl.minVal}
          ymax={ctrl.maxVal}
          xstep={ctrl.step}
          ystep={ctrl.step}
          onChange={({ x, y }) => (ctrl.value = { x, y })}
        />
      </div>
    </div>
  );
};

export default SliderXY;
