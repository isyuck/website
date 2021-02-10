import React, { useRef, useState, useEffect, PropTypes } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Header from "../components/header"

const Index = ({ data, location }) => {
  const works = data.allMdx

  const [gamma, setGamma] = useState(0)
  const [beta, setBeta] = useState(0)
  const [alpha, setAlpha] = useState(0)

  const [motionGranted, setMotionGranted] = useState(false)

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
            setMotionGranted(true)
          }
        })
        .catch(console.error)
    } else {
      window.addEventListener("deviceorientation", handleOrientation)
      setMotionGranted(true)
    }
  }

  const handleOrientation = e => {
    setGamma(e.gamma)
    setBeta(e.beta)
    setAlpha(e.alpha)
  }

  const fadeRotateHelper = () => {}

  return (
    <>
      <Header>artist/programmer</Header>

      <div className="relative">
        <div className="text-lg ml-4 mt-20 font-sans z-10">
          <p>
            {"i have an"}
            <a
              href="mailto:isaac@isaac.ac"
              className="px-1 underline font-bit text-2xl"
              style={{ color: "#0000ff" }}
            >
              E-MAIL
            </a>
            {/* {" and a "} */}
            {/* <a */}
            {/*   href="" */}
            {/*   className="px-1 underline font-bit text-2xl" */}
            {/*   style={{ color: "#0000ff" }} */}
            {/* > */}
            {/*   BLOG */}
            {/* </a> */}
          </p>
          <p className="flex flex-row">
            {"i am on"}
            <a
              href="http://github.com/isyuck"
              className="px-1 underline font-bit text-2xl"
              style={{ color: "#0000ff" }}
            >
              GITHUB
            </a>
            <span className="">{" and "}</span>
            <a
              href="http://instagram.com/isyuck"
              className="px-1 underline font-bit text-2xl"
              style={{ color: "#0000ff" }}
            >
              INSTAGRAM
            </a>
          </p>
        </div>
        <div className="mt-4 grid w-screen justify-items-center relative h-8">
          <button
            className={`absolute transition-opacity lg:invisible delay-1000 duration-1000 text-base px-3 font-sans text-center rounded-full border-purple-300
  opacity-${motionGranted ? "0" : "100"}
`}
            style={{ backgroundColor: "#00ff00" }}
            onClick={() => requestMotionAccess()}
          >
            {motionGranted ? "← rotate device to scroll →" : "press me"}
          </button>
        </div>
        <div className="mt-2 flex flex-col">
          <Tile
            scroll={gamma}
            title={"emojis"}
            type={"web app"}
            tags={["Graphics", "Interactive"]}
            date={2021}
            slug={"/emoji"}
          />
          {works.nodes.map((info, index) => (
            <Tile
              scroll={gamma}
              title={info.frontmatter.title}
              type={info.frontmatter.type}
              tags={info.frontmatter.tags}
              date={info.frontmatter.date}
              slug={info.fields.slug}
            />
          ))}
        </div>
      </div>
    </>
  )
}

export default Index

const Tile = ({ scroll, title, type, tags, date, slug }) => {
  const [emojiSeed, setEmojiSeed] = useState(0)
  const [loaded, setLoaded] = useState(false)
  const ref = useRef()

  useEffect(() => {
    const el = ref.current
    const s = Math.sin(Math.abs(scroll) * 0.03)
    el.scrollLeft = s * (el.scrollWidth - el.offsetWidth)
  })

  return (
    <a href={slug} className="top-0 left-0 text-2xl py-1">
      <div
        ref={ref}
        className="flex flex-row space-x-8 px-4 overflow-x-auto items-center"
      >
        <a
          className="flex-shrink-0 font-mond underline"
          style={{ color: "#0000ff" }}
        >
          {title}
        </a>

        <div className="flex flex-row space-x-4">
          <span
            className={` font-mont whitespace-nowrap rounded-full px-3 mr-4 text-lg bg-gradient-to-r from-gray-300 via-purple-200 to-gray-400 `}
          >
            {type}
          </span>
          {tags.map((tag, index) => (
            <span className="flex-shrink-0 text-xl italic font-mont">
              {tag}
            </span>
          ))}
          <span className="flex-shrink-0 font-bit px-4 inline-block">
            {date}
          </span>
        </div>
      </div>
    </a>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        id
        fields {
          slug
        }
        frontmatter {
          title
          tags
          type
          date(formatString: "YYYY")
        }
      }
    }
  }
`
