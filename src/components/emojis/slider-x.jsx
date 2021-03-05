import React from "react";

const SliderX = ({ ctrl }) => {
  return (
    <>
      {ctrl && (
        <>
          <div className="flex flex-row justify-between">
            <span
              onClick={() => (ctrl.value = ctrl.defaultVal)}
              className="min-w-max max-h-6 pl-1 text-base font-mont"
              style={{ color: "#0000ff" }}
            >
              {ctrl.name}
            </span>
            <input
              className="px-1 bg-transparent rounded-none max-w-full w-16 text-right"
              name=""
              type="tel"
              pattern="[0-9]*"
              onChange={(e) => (ctrl.value = e.target.value)}
              min={ctrl.minVal}
              max={ctrl.maxVal}
              value={ctrl.value}
            />
          </div>
          <div className={`w-full z-20 px-1 pt-1`}>
            <input
              className="w-full"
              value={ctrl.value}
              type="range"
              min={ctrl.minVal}
              max={ctrl.maxVal}
              step={ctrl.step}
              onChange={(e) => (ctrl.value = e.target.value)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default SliderX;
