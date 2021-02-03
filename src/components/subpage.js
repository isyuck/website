import React, { useRef, useState } from "react"
import { InView } from "react-intersection-observer"
import Img from "gatsby-image"
import ReactPlayer from "react-player/lazy"

const Subpage = ({
  children,
  index = -1,
  title,
  nextArrow = true,
  onChange,
  px = 4,
}) => {
  const idPrefix = "subpage-"

  return (
    <InView onChange={inview => onChange(inview, title)} threshold="0.6">
      {({ inView, ref }) => (
        <div
          id={idPrefix + index}
          ref={ref}
          className={`flex flex-col flex-shrink-0 w-screen max-w-screen px-${px} pt-16 text-xl overflow-y-scroll`}
        >
          {children}

          {nextArrow && (
            <a
              href={`#${idPrefix + (index + 1)}`}
              className="sticky bottom-0 mx-auto inset-x-0 font-bold text-xl p-8 w-32 text-center z-30"
            >
              →
            </a>
          )}
        </div>
      )}
    </InView>
  )
}

export default Subpage
