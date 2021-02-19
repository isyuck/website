import React, { useRef, useState, useEffect, PropTypes } from "react"
import Header from "../components/header"
import Slider from "react-input-slider"

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
      axis: "y",
    },
    {
      id: 1,
      name: "size",
      value: 200,
      minVal: 10,
      maxVal: 500,
      step: 3,
      active: true,
      axis: "y",
    },
    {
      id: 2,
      name: "gamma",
      value: 2.5,
      minVal: 0,
      maxVal: 10,
      step: 0.01,
      active: true,
      axis: "y",
    },
    {
      id: 3,
      name: "saturation",
      value: 100,
      minVal: 0,
      maxVal: 500,
      step: 1,
      active: true,
      axis: "y",
    },
    {
      id: 4,
      name: "blur step",
      value: 0,
      minVal: 0,
      maxVal: 3,
      step: 0.01,
      active: true,
      axis: "y",
    },
    {
      id: 5,
      name: "hue step",
      value: 0,
      minVal: 0,
      maxVal: 20,
      step: 0.1,
      active: true,
      axis: "y",
    },
    {
      id: 6,
      name: "invert",
      value: 0,
      minVal: 0,
      maxVal: 100,
      step: 1,
      active: true,
      axis: "y",
    },
    {
      id: 7,
      name: "opacity",
      value: 100,
      minVal: 0,
      maxVal: 100,
      step: 1,
      active: true,
      axis: "y",
    },
    {
      id: 8,
      name: "brightness step",
      value: 100,
      minVal: 0,
      maxVal: 300,
      step: 1,
      active: true,
      axis: "y",
    },
    {
      id: 9,
      name: "contrast step",
      value: 100,
      minVal: 0,
      maxVal: 300,
      step: 1,
      active: true,
      axis: "y",
    },
    {
      id: 10,
      name: "skew",
      value: { x: 0.5, y: 0.5 },
      minVal: -2,
      maxVal: 2,
      step: 0.01,
      active: false,
      axis: "xy",
    },
    {
      id: 11,
      name: "scale",
      value: { x: 0.5, y: 0.5 },
      minVal: -1,
      maxVal: 1,
      step: 0.001,
      active: false,
      axis: "xy",
    },
  ])

  const [motionGranted, setMotionGranted] = useState(false)
  const [gamma, setGamma] = useState(0)

  // 'freeze' input from device rotation
  const [freeze, setFreeze] = useState(false)

  useEffect(() => {
    document.body.style.overflow = "hidden"
    if (window.DeviceOrientationEvent) {
      window.ondeviceorientation = e => handleOrientation(e)
    }
  })

  const handleOrientation = e => {
    if (!freeze) {
      setGamma(e.gamma)
    }
  }

  useEffect(() => {
    setCtrlOpen(true)
    setTimeout(setCtrlOpen(false), 3000)
  }, [])

  const requestMotionAccess = () => {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation)
            setMotionGranted(true)
          }
        })
        .catch(console.error)
    } else {
      window.addEventListener("deviceorientation", handleOrientation)
    }
  }

  const newEmoji = () => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)].substring(0, 2))
  }

  const emojis = require("emoji.json/emoji-compact.json")
  const [emoji, setEmoji] = useState(emojis[0])

  const [ctrlOpen, setCtrlOpen] = useState(false)

  const updateOnCtrlChange = (index, value, active) => {
    let cv = [...ctrlValues]
    cv[index].value = value
    cv[index].active = active
    setCtrlValues(cv)
  }

  const emojiInput = useRef(null)

  return (
    <>
      <div className="fixed flex inset-0 w-screen h-screen pointer-events-none z-0">
        <div
          onClick={() => newEmoji()}
          className="m-auto w-2/3 h-2/3 pointer-events-auto"
        ></div>
      </div>
      <div
        onClick={() => setCtrlOpen(!ctrlOpen)}
        className="fixed top-0 left-0 right-0 flex flex-row justify-between text-2xl z-10 pt-2 px-4 items-end"
      >
        <p className="underline font-mond pb-1" style={{ color: "#0000ff" }}>
          emojis
        </p>
        {/* </p> */}

        <p className="italic text-xl pb-1 font-mont">{emoji}</p>
      </div>
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
      <div
        className="absolute flex flex-row inset-0 w-screen h-screen transform duration-500 z-30"
        style={{
          transform: `${ctrlOpen ? "translateX(0)" : "translateX(calc(80vw))"}`,
        }}
      >
        <div
          onClick={() => setCtrlOpen(!ctrlOpen)}
          className={`h-screen w-1/2 flex pointer-events-auto`}
        ></div>
        <div className="w-1/2 pt-4 px-3 flex flex-col space-y-4 overflow-y-auto bg-gray-100 border-l border-gray-300 text-gray-600">
          <div
            className="flex-shrink-0 h-8 relative w-full"
            style={{ maxWidth: "50vw" }}
          >
            <input
              className="absolute inset-0 pl-14 h-7 bg-transparent pb-1 text-left"
              onFocus={e => (e.value = "")}
              value={emoji}
              onChange={evt => setEmoji(evt.target.value)}
              maxLength={3}
            />
            <span className="absolute inset-0 pointer-events-none">emoji:</span>
            <span className="absolute inset-0 pointer-events-none"></span>
          </div>
          <div className="flex-shrink-0 w-full" style={{ maxWidth: "50vw" }}>
            <div className="flex flex-col w-full space-y-8 mb-16">
              <button onClick={() => newEmoji()} className="text-left">
                randomise
              </button>
              {ctrlValues.map((ctrl, index) => (
                <>
                  {ctrl.axis === "y" && (
                    <ControlSingle
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
                  )}
                  {ctrl.axis === "xy" && (
                    <ControlDouble
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
                  )}
                </>
              ))}
              <p>
                use your phone's rotation and the controls above to manipulate
                the emoji(s)
              </p>
              <p>
                {
                  "this webpage can/will crash your browser or phone. to help prevent this, keep the emoji count low, and avoid zooming in."
                }
              </p>
              <p>designed for and tested on iOS 14.</p>
              <p>
                {"developed by "}
                <a className="underline" href="/">
                  {"isaac spicer"}
                </a>
                {"."}
              </p>
              <a
                className="underline"
                href="https://github.com/isyuck/website/blob/master/src/pages/emojis.js"
              >
                {"view source"}
              </a>
            </div>
          </div>
        </div>
      </div>
      {motionGranted && (
        <div
          className="absolute text-center max-h-screen h-screen transform duration-500 overflow-hidden pointer-events-none"
          style={{
            fontSize: `${ctrlValues[1].value}px`,
            transform: `${
              ctrlOpen ? "translateX(calc(-20vw - 0rem))" : "translateX(0)"
            }`,
            width: `${ctrlOpen ? "70vw" : "100vw"}`,
          }}
        >
          <div className="flex relative h-screen w-screen">
            {[...Array(ctrlValues[0].value)].map((x, i) => (
              <button
                className={`absolute my-auto z-0 h-full w-full overflow-hidden`}
                style={{
                  filter: `saturate(${ctrlValues[3].value}%)
                         blur(${i * ctrlValues[4].value}px)
                         hue-rotate(${i * ctrlValues[5].value}deg)
                         invert(${ctrlValues[6].value}%)
                         opacity(${ctrlValues[7].value}%)
                         brightness(${ctrlValues[8].value}%)
                         contrast(${ctrlValues[9].value}%)
`,
                  transform: `
/* rotateY(${(gamma + i) * ctrlValues[2].value}deg) */
rotateY(${Date.now() * 0.05 + i * 4}deg)
${
  ctrlValues[10].active
    ? ` skew(${i * ctrlValues[10].value.x}deg, ${
        i * ctrlValues[10].value.y
      }deg)`
    : ""
}
${
  ctrlValues[11].active
    ? ` scale(${i * ctrlValues[11].value.x}, ${i * ctrlValues[11].value.y})`
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
    </>
  )
}

const ControlSingle = ({
  name,
  onChange,
  start,
  min,
  max,
  step,
  active,
  hasCheckbox,
}) => {
  const [val, setVal] = useState(start)
  const [compActive, setCompActive] = useState(active)

  const handleChangeActive = e => {
    setCompActive(e.target.checked)
    onChange(val, e.target.checked)
  }

  const handleChangeSlider = e => {
    setVal(e)
    onChange(e, compActive)
  }

  return (
    <div className={`relative flex flex-row h-6 text-gray-800`}>
      <div>
        <div
          className={`absolute inset-0 px-1 pt-0.5 z-20 pointer-events-none flex font-mono text-sm flex-row justify-between`}
        >
          <span>{name}</span>
          <span className="text-gray-400">{`${val.toFixed(2)}`}</span>
        </div>
        <div className={`absolute inset-0 w-full z-10`}>
          <Slider
            styles={{
              track: {
                backgroundColor: "#00000000",
                width: "100%",
                height: 24,
                boxSizing: "border-box",
                border: "1px solid #d1d5db",
                borderRadius: 0,
              },
              active: {
                width: "100%",
                backgroundColor: "#d1d5db",
                height: 23,
                borderRadius: 0,
              },
              thumb: {
                width: 0,
                height: 0,
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
    </div>
  )
}

const ControlDouble = ({
  name,
  onChange,
  start,
  min,
  max,
  step,
  active,
  hasCheckbox,
}) => {
  const [val, setVal] = useState(start)
  const [compActive, setCompActive] = useState(active)

  const handleChangeActive = e => {
    setCompActive(e)
    onChange({ x: val.x, y: val.y }, e)
  }

  const handleChangeSlider = (x, y) => {
    setVal({ x: x, y: y })
    onChange({ x: x, y: y }, compActive)
  }

  return (
    <div
      className={`relative flex flex-col text-gray-800 transition-opacity duration-500 ${
        compActive ? "" : "opacity-50"
      }
`}
      style={{ height: "calc(50vw - 1.25rem)" }}
    >
      <div
        className={`absolute inset-0 w-full z-20 flex pointer-events-none font-mono text-sm flex-row justify-between
`}
      >
        <div
          onClick={() => handleChangeActive(!compActive)}
          className="absolute top-0 left-0 px-1 pt-0.5 pointer-events-auto"
        >
          <span>{name}</span>
        </div>
        <div className="absolute bottom-0 w-full flex justify-between px-1">
          <span className="text-gray-400">{`X ${val.x.toFixed(2)}`}</span>
          <span className="text-gray-400">{`Y ${val.y.toFixed(2)}`}</span>
        </div>
      </div>
      <div className="absolute inset-0 w-full z-10">
        <Slider
          styles={{
            track: {
              backgroundColor: "#d1d5db",
              height: "100%",
              width: "calc(50vw - 1.5rem)",
              boxSizing: "border-box",
              border: "1px solid #d1d5db",
              borderRadius: 0,
            },
            active: {
              height: "calc(50vw - 1.25rem)",
              width: "calc(50vw - 1.25rem)",
              backgroundColor: "#d1d5db",
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
          x={val.x}
          y={val.y}
          xmin={min}
          xmax={max}
          ymin={min}
          ymax={max}
          xstep={step}
          ystep={step}
          disabled={!compActive}
          onChange={({ x, y }) => handleChangeSlider(x, y)}
        />
      </div>
    </div>
  )
}
export default Emoji
