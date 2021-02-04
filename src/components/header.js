import React from "react"
import PI from "../components/pi"

const Header = ({ link, children, my = 2, mx = 2 }) => {
  return (
    <a
      href={link}
      className={`fixed my-${my} mx-${mx} z-30 h-9 text-white inset-0 text-xl flex flex-row bg-black space-x-4 justify-between`}
    >
      <div className="flex flex-row flex-shrink-0 px-2 py-1">
        <span>
          {"I"}
          <PI>{"s"}</PI>
          {"aac "}
          <PI>{"S"}</PI>
          {"pice"}
          <PI>{"r"}</PI>
        </span>
      </div>
      <span className="px-2 py-1">{children}</span>
    </a>
  )
}

export default Header
