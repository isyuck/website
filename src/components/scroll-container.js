import React, { useRef } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import useSmoothScroll from "react-smooth-scroll-hook"

export const ScrollContainer = ({ children }) => {
  // A custom scroll container
  const ref = useRef(null)

  // Also support document.body / document.documentElement, and you don't need to set a ref passing to jsx
  // const ref = useRef(document.body)

  const { scrollTo } = useSmoothScroll({
    ref,
    speed: 75,
    direction: "y",
  })

  return (
    <>
      <div
        ref={ref}
        style={{
          overflowY: "scroll",
          maxHeight: "200px",
        }}
      >
        <button
          className="fixed inset-0 z-20 text-red-500 h-8 bg-black"
          onClick={() => scrollTo("#main")}
        >
          scrollTo('#item-46')
        </button>
        {children}
      </div>
    </>
  )
}

export default ScrollContainer
