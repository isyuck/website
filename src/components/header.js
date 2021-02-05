import React from "react"
import PI from "../components/pi"

const Header = ({
  link,
  children,
  my = 2,
  mx = 2,
  index = 0,
  arrows = false,
}) => {
  return (
    <>
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

      {arrows && (
        <div className="fixed w-screen flex z-30 bottom-5 flex-row justify-between h-8 z-30">
          <a
            className={`container transition-opacity duration-700 font-pixel h-9 w-9 text-white text-xl bg-black font-bold m-2 flex text-center content-center
            ${index > 0 ? "opacity-100" : "opacity-0"}
`}
            href={`#subpage-${index - 1}`}
          >
            <span className="m-auto pt-1">←</span>
          </a>
          <a
            className={`container font-pixel h-9 w-9 text-white text-xl bg-black font-bold m-2 flex text-center content-center`}
            href={`#subpage-${index + 1}`}
          >
            <span className="m-auto pt-1">→</span>
          </a>
        </div>
      )}
    </>
  )
}

export default Header
