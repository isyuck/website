import React from "react";
import Slider from "react-input-slider";

const SliderX = ({ ctrl, colors }) => {
  return (
    <>
      {ctrl && (
        <div className={`relative flex flex-row h-6`}>
          <div>
            <div
              className={`absolute inset-0 px-1 pt-0.5 z-20 pointer-events-none flex flex-row font-mono text-sm justify-between`}
            >
              <span style={{ color: colors.primary }}>{ctrl.name}</span>
              <span style={{ color: colors.secondary }}>{`${ctrl.value.toFixed(
                2
              )}`}</span>
            </div>
            <div className={`absolute inset-0 w-full z-10 pointer-events-auto`}>
              <Slider
                styles={{
                  track: {
                    backgroundColor: "#00000000",
                    width: "100%",
                    height: 24,
                    boxSizing: "border-box",
                    border: `1px solid ${colors.background}`,
                    borderRadius: 0,
                  },
                  active: {
                    width: "100%",
                    backgroundColor: colors.background,
                    height: 23,
                    borderRadius: 0,
                  },
                  thumb: {
                    width: 0,
                    height: 0,
                  },
                }}
                axis="x"
                xstep={ctrl.step}
                xmin={ctrl.minVal}
                xmax={ctrl.maxVal}
                x={ctrl.value}
                onChange={({ x }) => (ctrl.value = x)}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SliderX;
