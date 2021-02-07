import React from "react"

const Header = ({ onClick, children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 flex flex-row justify-between text-2xl z-10 pt-2 px-4 items-end">
      {/* <p */}
      {/*   onClick={() => onClick()} */}
      {/*   className="underline font-mond pb-1" */}
      {/*   style={{ color: "#0000ff" }} */}
      {/* > */}
      <a
        href="/"
        className="underline font-mond pb-1"
        style={{ color: "#0000ff" }}
      >
        isaac spicer
      </a>
      {/* </p> */}

      <p className="italic text-xl pb-1 font-mont">{children}</p>
    </div>
  )
}
export default Header
