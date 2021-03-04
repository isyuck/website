import React, { useState, useEffect, useRef } from "react";
import Control from "../components/emojis/control";
import { Helmet } from "react-helmet";
import {
  disableBodyScroll,
  enableBodyScroll,
  clearAllBodyScrollLocks,
} from "body-scroll-lock";

const Emoji = ({ data, location }) => {
  const [ctrlValues, setCtrlValues] = useState([
    {
      id: 0,
      name: "emoji count",
      value: 15,
      defaultVal: 15,
      minVal: 1,
      maxVal: 90,
      step: 1,
      comp: "SliderX",
    },
    {
      id: 1,
      name: "base size",
      value: 200,
      defaultVal: 200,
      minVal: 10,
      maxVal: 500,
      step: 3,
      comp: "SliderX",
    },
    {
      id: 2,
      name: "gamma/spin",
      value: 0.7,
      defaultVal: 0.7,
      minVal: 0,
      maxVal: 1,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 3,
      name: "spin speed",
      value: 1.5,
      defaultVal: 1.5,
      minVal: 0,
      maxVal: 10,
      step: 0.1,
      comp: "SliderX",
    },
    {
      id: 4,
      name: "step",
      defaultVal: 3,
      value: 3,
      minVal: 0,
      maxVal: 10,
      step: 0.1,
      comp: "SliderX",
    },
    {
      id: 5,
      name: "saturation",
      defaultVal: 100,
      value: 100,
      minVal: 0,
      maxVal: 500,
      step: 1,
      comp: "SliderX",
    },
    {
      id: 6,
      name: "blur step",
      defaultVal: 0,
      value: 0,
      minVal: 0,
      maxVal: 1,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 7,
      name: "hue step",
      defaultVal: 0,
      value: 0,
      minVal: 0,
      maxVal: 20,
      step: 0.1,
      comp: "SliderX",
    },
    {
      id: 8,
      name: "invert",
      defaultVal: 0,
      value: 0,
      minVal: 0,
      maxVal: 100,
      step: 1,
      comp: "SliderX",
    },
    {
      id: 9,
      name: "opacity",
      defaultVal: 100,
      value: 100,
      minVal: 0,
      maxVal: 100,
      step: 1,
      comp: "SliderX",
    },
    {
      id: 10,
      name: "brightness",
      defaultVal: 100,
      value: 100,
      minVal: 0,
      maxVal: 300,
      step: 1,
      comp: "SliderX",
    },
    {
      id: 11,
      name: "contrast step",
      defaultVal: 100,
      value: 100,
      minVal: 0,
      maxVal: 300,
      step: 1,
      comp: "SliderX",
    },
    {
      id: 12,
      name: "skew weight",
      defaultVal: 0,
      value: 0,
      minVal: 0,
      maxVal: 2,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 13,
      name: "skewX",
      defaultVal: 200,
      value: 0,
      minVal: -2,
      maxVal: 2,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 14,
      name: "skewY",
      defaultVal: 0,
      value: 0,
      minVal: -2,
      maxVal: 2,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 15,
      name: "scale weight",
      defaultVal: 0,
      value: 0,
      minVal: 0,
      maxVal: 2,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 16,
      name: "scaleX",
      defaultVal: 0.5,
      value: 0.5,
      minVal: -2,
      maxVal: 2,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 17,
      name: "scaleY",
      defaultVal: 0.5,
      value: 0.5,
      minVal: -2,
      maxVal: 2,
      step: 0.01,
      comp: "SliderX",
    },
    {
      id: 18,
      name: "translateX",
      defaultVal: 0.0,
      value: 0.0,
      minVal: -200,
      maxVal: 200,
      step: 0.5,
      comp: "SliderX",
    },
    {
      id: 19,
      name: "translateY",
      defaultVal: 0.0,
      value: 0.0,
      minVal: -200,
      maxVal: 200,
      step: 0.5,
      comp: "SliderX",
    },
    {
      id: 20,
      name: "translateZ",
      defaultVal: 0.0,
      value: 0.0,
      minVal: -50,
      maxVal: 50,
      step: 1,
      comp: "SliderX",
    },
  ]);

  const mainBodyRef = useRef();
  const ctrlRef = useRef();

  useEffect(() => {
    disableBodyScroll(ctrlRef.current);
    enableBodyScroll(mainBodyRef.current);
  }, []);

  // why doesn't js have linear interpolation?
  const lerp = (v0, v1, t) => {
    return v0 * (1 - t) + v1 * t;
  };

  const [motionGranted, setMotionGranted] = useState(false);

  // phone rotation
  const [gamma, setGamma] = useState(0);

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.ondeviceorientation = (e) => handleOrientation(e);
    }
  });

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

  const handleOrientation = (e) => {
    setGamma(e.gamma);
  };

  const newEmoji = () => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)].substring(0, 2));
  };

  const emojis = require("emoji.json/emoji-compact.json");
  const [emoji, setEmoji] = useState(emojis[0]);

  const [ctrlOpen, setCtrlOpen] = useState(false);

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>emojis | isaac.ac</title>
        <link rel="canonical" href="https://isaac.ac" />
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1"
        />
      </Helmet>
      <div
        onClick={() => setCtrlOpen(!ctrlOpen)}
        className="fixed top-0 left-0 right-0 flex flex-row justify-between text-2xl z-10 pt-2 px-4 items-end overflow-hidden"
      >
        <p className="underline font-mond pb-1" style={{ color: "#0000ff" }}>
          emojis
        </p>
        <p className="italic text-xl pb-1 font-mont">{emoji}</p>
      </div>
      {!motionGranted && (
        <div
          id={"motion-access-button"}
          className="fixed flex inset-0 w-screen h-screen"
          style={{ zIndex: 75 }}
        >
          <div className="text-center m-auto">
            <button
              onClick={() => requestMotionAccess()}
              className="mb-20 p-8 text-xl"
            >
              tap to allow motion and orientation
              <p className="text-sm mt-8">(nothing bad will happen)</p>
            </button>
          </div>
        </div>
      )}
      <div ref={mainBodyRef}>
        <div
          className="absolute flex flex-col inset-0 w-screen h-screen max-h-screen transform duration-500 z-30 overflow-hidden"
          style={{
            transform: `${
              ctrlOpen ? "translateY(0)" : `translateY(calc(50vh - 3.5rem))`
            }`,
          }}
        >
          <div
            onClick={() => setCtrlOpen(!ctrlOpen)}
            className={`h-1/2 w-screen flex pointer-events-auto`}
          ></div>
          <Control
            childRef={ctrlRef}
            ctrlValues={ctrlValues}
            emoji={emoji}
            newEmoji={newEmoji}
          />
        </div>
        {motionGranted && (
          <div
            className="absolute text-center w-screen max-w-screen transform duration-500 overflow-hidden pointer-events-none"
            style={{
              fontSize: `${ctrlValues[1].value}px`,
              transform: `${
                ctrlOpen ? "translateY(calc(-20vh))" : "translateY(0)"
              }`,
              height: `${ctrlOpen ? "70vh" : "100vh"}`,
            }}
          >
            <div style={{}} className="flex relative h-screen w-screen">
              {[...Array(parseInt(ctrlValues[0].value))].map((x, i) => (
                <button
                  className={`absolute my-auto z-0 h-full w-full overflow-hidden`}
                  style={{
                    willChange: "transform",
                    filter: `saturate(${ctrlValues[5].value}%)
                         blur(${i * ctrlValues[6].value}px)
                         hue-rotate(${i * ctrlValues[7].value}deg)
                         invert(${ctrlValues[8].value}%)
                         opacity(${ctrlValues[9].value}%)
                         brightness(${ctrlValues[10].value}%)
                         contrast(${ctrlValues[11].value}%)
`,
                    transform: `
rotateY(${
                      lerp(
                        (Date.now() * 0.05 + i) * ctrlValues[3].value,
                        gamma + i,
                        ctrlValues[2].value
                      ) * ctrlValues[4].value
                    }deg)
${
  ctrlValues[12].value > 0.0
    ? ` skew(${i * ctrlValues[13].value * ctrlValues[12].value}deg, ${
        i * ctrlValues[14].value * ctrlValues[12].value
      }deg)`
    : ""
}
translate3d(${ctrlValues[18].value}px, ${i * ctrlValues[19].value}px, ${
                      i * ctrlValues[20].value
                    }px)
${
  ctrlValues[15].value > 0.0
    ? ` scale(${i * ctrlValues[16].value * ctrlValues[15].value}, ${
        i * ctrlValues[17].value * ctrlValues[15].value
      })`
    : ""
}
`,
                  }}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Emoji;
