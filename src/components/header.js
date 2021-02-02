import React from "react"
import PI from "../components/pi"

const Header = ({ children }) => {
  return (
    <div className="fixed p-4 pt-4 z-30 h-12 text-white inset-0 text-xl">
      <div className="flex flex-row space-x-4 justify-between">
        <div className="flex flex-row flex-shrink-0">
          <a href="/">
            {"I"}
            <PI>{"s"}</PI>
            {"aac "}
            <PI>{"S"}</PI>
            {"pice"}
            <PI>{"r"}</PI>
          </a>
        </div>
        {children}
      </div>
    </div>
  )
}

export default Header
