import React, { useRef, useState } from "react"
import { InView } from "react-intersection-observer"
import Img from "gatsby-image"
import ReactPlayer from "react-player/lazy"

const Subpage = ({
  children,
  index = -1,
  title,
  onChange,
  px = 4,
  pt = 16,
}) => {
  const idPrefix = "subpage-"

  return (
    <InView onChange={inview => onChange(inview, title, index)} threshold="0.6">
      {({ inView, ref }) => (
        <div
          id={idPrefix + index}
          ref={ref}
          className={`flex flex-col flex-shrink-0 w-screen max-w-screen px-${px} pt-${pt} text-xl overflow-y-scroll`}
        >
          {children}
        </div>
      )}
    </InView>
  )
}

export default Subpage
