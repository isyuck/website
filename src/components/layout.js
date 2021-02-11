import React from "react"
import { useLayoutEffect } from "react"
// import { useMediaQuery } from "react-responsive"
import { Helmet } from "react-helmet"

const Layout = ({ location, title, children }) => {
  // const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })
  // useLockBodyScroll() // for ios

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Isaac Spicer</title>
        <link rel="canonical" href="https://isaac.ac" />
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes, width = device-width, initial-scale = 1.0, minimum-scale = 1, maximum-scale = 1, user-scalable = no"
        />
      </Helmet>
      <main>{children}</main>
    </>
  )
}

export default Layout

function useLockBodyScroll() {
  useLayoutEffect(() => {
    // Get original body overflow
    const originalStyle = window.getComputedStyle(document.body).overflow
    // Prevent scrolling on mount
    document.body.style.overflow = "hidden"
    // Re-enable scrolling when component unmounts
    return () => (document.body.style.overflow = originalStyle)
  }, []) // Empty array ensures effect is only run on mount and unmount
}
