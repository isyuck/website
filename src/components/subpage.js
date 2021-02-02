import React, { useRef, useState } from "react"
import { InView } from "react-intersection-observer"
import Img from "gatsby-image"
import ReactPlayer from "react-player/lazy"

const Subpage = ({ children, index, title, handleViewChange }) => {
  return (
    <InView
      onChange={inview => handleViewChange(inview, title, index)}
      threshold="0.6"
    >
      {({ inView, ref }) => (
        <div
          id={`page-${index}`}
          ref={ref}
          className={`flex h-screen flex-shrink-0 w-screen px-4 pt-16 pb-32 text-xl`}
        >
          {children}
        </div>
      )}
    </InView>
  )
}

export default Subpage
