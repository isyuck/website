import React, { useRef, useState, useEffect, PropTypes } from "react";
import Header from "../components/header";
import Slider from "react-input-slider";

const Emoji = ({ data, location }) => {
  const [ctrlValues, setCtrlValues] = useState([
    {
      id: 0,
      name: "count",
      value: 30,
      minVal: 1,
      maxVal: 90,
      step: 1,
      active: true,
      hasCheckbox: false,
    },
    {
      id: 1,
      name: "scale",
      value: 200,
      minVal: 10,
      maxVal: 500,
      step: 3,
      active: true,
      hasCheckbox: false,
    },
    {
      id: 2,
      name: "gamma",
      value: 2.5,
      minVal: 0,
      maxVal: 10,
      step: 0.01,
      active: true,
      hasCheckbox: true,
    },
    {
      id: 3,
      name: "skew X",
      value: 0.08,
      minVal: 0,
      maxVal: 2,
      step: 0.01,
      active: true,
      hasCheckbox: true,
    },
    {
      id: 4,
      name: "skew Y",
      value: 0.08,
      minVal: 0,
      maxVal: 4.5,
      step: 0.01,
      active: true,
      hasCheckbox: true,
    },
    {
      id: 5,
      name: "scale X",
      value: 0.5,
      minVal: 0,
      maxVal: 1,
      step: 0.01,
      active: false,
      hasCheckbox: true,
    },
    {
      id: 6,
      name: "scale Y",
      value: 0.5,
      minVal: 0,
      maxVal: 1,
      step: 0.01,
      active: false,
      hasCheckbox: true,
    },
  ]);

  const [motionGranted, setMotionGranted] = useState(false);
  const [gamma, setGamma] = useState(0);

  // 'freeze' input from device rotation
  const [freeze, setFreeze] = useState(false);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.ondeviceorientation = (e) => handleOrientation(e);
    }
  });

  const handleOrientation = (e) => {
    if (!freeze) {
      setGamma(e.gamma);
    }
  };

  const requestMotionAccess = () => {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((permissionState) => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation);
            setMotionGranted(true);
          }
        })
        .catch(console.error);
    } else {
      window.addEventListener("deviceorientation", handleOrientation);
    }
  };

  const newEmoji = () => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)].substring(0, 2));
  };

  const emojis = require("emoji.json/emoji-compact.json");
  const [emoji, setEmoji] = useState(emojis[0]);

  const [ctrlOpen, setCtrlOpen] = useState(false);

  const updateOnCtrlChange = (index, value, active) => {
    let cv = [...ctrlValues];
    cv[index].value = value;
    cv[index].active = active;
    setCtrlValues(cv);
  };

  return (
    <>
      <Header href="/emojis">emojis</Header>
      {!motionGranted && (
        <div className="fixed flex inset-0 w-screen h-screen">
          <div className="text-center m-auto">
            <button
              onClick={() => requestMotionAccess()}
              className="mb-20 p-8 text-xl"
            >
              tap to allow motion and orientation
            </button>
          </div>
        </div>
      )}
      {motionGranted && (
        <div
          className="text-center w-screen fixed h-screen overflow-hidden"
          style={{ fontSize: `${ctrlValues[1].value}px` }}
        >
          <div>
            {[...Array(ctrlValues[0].value)].map((x, i) => (
              <button
                onClick={() => newEmoji()}
                className={`fixed z-0 left-0 pb-16 h-screen w-screen ${
                  ctrlOpen ? "pointer-events-none" : "pointer-events-auto"
                }`}
                style={{
                  transform: `
                        ${
                          ctrlValues[2].active
                            ? `rotateY(${(gamma + i) * ctrlValues[2].value}deg)`
                            : ""
                        }
                        ${
                          ctrlValues[3].active
                            ? `skewX(${i * ctrlValues[3].value}deg)`
                            : ""
                        }
                        ${
                          ctrlValues[4].active
                            ? `skewY(${i * ctrlValues[4].value}deg)`
                            : ""
                        }
                        ${
                          ctrlValues[5].active
                            ? `scaleX(${i * ctrlValues[5].value})`
                            : "scaleX(1)"
                        }
                        ${
                          ctrlValues[6].active
                            ? `scaleY(${i * ctrlValues[6].value})`
                            : "scaleY(1)"
                        }
          `,
                }}
              >
                {emoji}
              </button>
            ))}
            <div className="fixed flex flex-row bottom-0 justify-between w-screen text-xl">
              <span
                onClick={() => setCtrlOpen(!ctrlOpen)}
                className="text-left p-4 text-xl "
                style={{ zIndex: "9999" }}
              >
                {emoji}
              </span>
            </div>
          </div>
        </div>
      )}

      <div
        style={{ zIndex: "9999" }}
        className={`absolute flex flex-col transition-opacity duration-500 inset-0 w-screen px-2 pointer-events-none
${ctrlOpen ? "opacity-100" : "opacity-0"}
`}
      >
        <div
          onClick={() => setCtrlOpen(!ctrlOpen)}
          className={`sticky pointer-events-auto h-14`}
        />
        <div
          className={`overflow-hidden border flex-shrink flex flex-col rounded-xl bg-white bg-opacity-80 w-full pt-2 px-4
${ctrlOpen ? "pointer-events-auto" : "pointer-events-none"}
`}
          style={{ borderColor: "#0000ff" }}
        >
          <div
            onClick={() => setCtrlOpen(!ctrlOpen)}
            className="flex flex-row mt-1 mb-4 justify-between"
          >
            <span className="font-mond underline text-xl">controls</span>
            <span
              style={{ color: "#0000ff" }}
              className="p-1 text-right font-pixel"
            >
              X
            </span>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex flex-row">
              <input
                className="mr-4 mt-1"
                type="checkbox"
                defaultChecked={freeze}
                onChange={(e) => setFreeze(e.target.checked)}
              />
              <p
                className={`block transition-opacity duration-500 font-mont ${
                  freeze ? "opacity-100" : "opacity-30"
                }`}
              >
                freeze
              </p>
            </div>
            {ctrlValues.map((ctrl, index) => (
              <Control
                name={ctrl.name}
                onChange={(value, active) =>
                  updateOnCtrlChange(index, value, active)
                }
                min={ctrl.minVal}
                max={ctrl.maxVal}
                start={ctrl.value}
                step={ctrl.step}
                active={ctrl.active}
                hasCheckbox={ctrl.hasCheckbox}
              />
            ))}
          </div>

          <input
            className="inline-block border-none bg-transparent text-center mt-4 mb-2 shadow-none rounded-none text-5xl"
            value={emoji}
            onChange={(evt) => setEmoji(evt.target.value)}
            maxLength={3}
          />
          <a
            className="underline mb-2 font-mond"
            style={{ color: "#0000ff" }}
            href="https://github.com/isyuck/website/blob/master/src/pages/emojis.js"
          >
            view source
          </a>
        </div>
        <div
          onClick={() => setCtrlOpen(!ctrlOpen)}
          className={`sticky pointer-events-auto flex-grow`}
          style={{ zIndex: "99999" }}
        />
      </div>
    </>
  );
};

const Control = ({
  name,
  onChange,
  start,
  min,
  max,
  step,
  active,
  hasCheckbox,
}) => {
  const [val, setVal] = useState(start);
  const [compActive, setCompActive] = useState(active);

  const handleChangeActive = (e) => {
    setCompActive(e.target.checked);
    onChange(val, e.target.checked);
  };

  const handleChangeSlider = (e) => {
    setVal(e);
    onChange(e, compActive);
  };

  return (
    <div className="grid grid-cols-2 w-full">
      <div className="flex flex-row">
        {hasCheckbox && (
          <input
            className="mr-4 mt-1"
            type="checkbox"
            defaultChecked={active}
            onChange={handleChangeActive}
          />
        )}
        <p
          className={`block transition-opacity duration-500 font-mont ${
            compActive ? "opacity-100" : "opacity-30"
          }`}
        >
          {name}
          <span className="ml-2 font-mono text-sm">{`(${val.toFixed(
            2
          )})`}</span>
        </p>
      </div>
      <div
        className={`ml-1 w-full transition-opacity duration-500 ${
          compActive
            ? "opacity-100 pointer-events-auto"
            : "opacity-30 pointer-events-none"
        }`}
      >
        <Slider
          styles={{
            track: {
              backgroundColor: "#00000000",
              width: "100%",
              height: "8px",
              border: "1px solid #888",
            },
            active: {
              backgroundColor: "#ddd",
            },
            thumb: {
              width: 15,
              height: 15,
              border: "1px solid #444",
              boxShadow: "0",
            },
          }}
          axis="x"
          x={val}
          xmin={min}
          xmax={max}
          xstep={step}
          onChange={({ x }) => handleChangeSlider(x)}
        />
      </div>
    </div>
  );
};

export default Emoji;
