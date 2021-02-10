import React, { useRef, useState, useEffect, PropTypes } from "react"
import Header from "../components/header"

const Emoji = ({ data, location }) => {
  const [gamma, setGamma] = useState(0)
  const [beta, setBeta] = useState(0)
  const [alpha, setAlpha] = useState(0)

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.ondeviceorientation = e => handleOrientation(e)
    }
  })

  const requestMotionAccess = () => {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then(permissionState => {
          if (permissionState === "granted") {
            window.addEventListener("deviceorientation", handleOrientation)
            document.getElementById("reqbutton").remove()
          }
        })
        .catch(console.error)
    } else {
      window.addEventListener("deviceorientation", handleOrientation)
      document.getElementById("reqbut").remove()
    }
  }

  const handleOrientation = e => {
    setGamma(e.gamma)
    setBeta(e.beta)
    setAlpha(e.alpha)
  }

  const newEmoji = () => {
    setEmoji(emojis[Math.floor(Math.random() * emojis.length)].substring(0, 2))
  }

  const emojis = require("emoji.json/emoji-compact.json")
  // const emoji = emojis[Math.floor(Math.random() * emojis.length)].substring(0, 2)

  const [emoji, setEmoji] = useState(emojis[0])

  return (
    <>
      <Header>emojis</Header>
      <div
        onClick={() => requestMotionAccess()}
        className="text-center w-screen fixed h-screen overflow-hidden"
        style={{ fontSize: "12rem" }}
      >
        {[...Array(90)].map((x, i) => (
          <button
            onClick={() => newEmoji()}
            className="absolute top-20 left-0 w-screen"
            style={{
              transform: `rotateY(${gamma + i * 8}deg)
              skewX(${beta + i * 1}deg)
              skewY(${alpha + i * 1}deg)`,
            }}
          >
            {emoji}
          </button>
        ))}
        <div
          className="flex flex-col mx-4 space-y-8 text-xl"
          style={{ marginTop: "80vh" }}
        >
          <input
            value={emoji}
            onChange={evt => setEmoji(evt.target.value)}
            maxLength={3}
          />
        </div>
      </div>
    </>
  )
}

export default Emoji
