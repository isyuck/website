import React, { useRef, useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Header from "../components/header"

const TestIndex = ({ data, location }) => {
  const things = data.allMdx

  return (
    <>
      {/* <div */}
      {/*   className="fixed inset-0 opacity-80 w-screen h-screen pointer-events-none bg-gradient-to-b from-pink-400 to-purple-400 z-0" */}
      {/*   /\* style={{ marginTop: "50vh" }} *\/ */}
      {/* /> */}
      <Header>artist/programmer</Header>

      <div className="relative">
        <div className="text-lg ml-4 mt-16 font-sans z-10">
          <p>
            {"i have an "}
            <span
              className="px-1 underline font-bit text-2xl "
              style={{ color: "#ff0000" }}
            >
              E-MAIL
            </span>
          </p>
          <p className="flex flex-row">
            i am on{" "}
            <span
              className="px-2 underline font-bit text-2xl "
              style={{ color: "#00ff00" }}
            >
              GITHUB
            </span>
            {" and "}
            <span
              className="px-2 underline font-bit text-2xl "
              style={{ color: "#ff00ff" }}
            >
              INSTAGRAM
            </span>
          </p>
        </div>
        <div className="mt-4">
          {things.nodes.map((thing, index) => (
            <Tile info={thing} />
          ))}
        </div>
      </div>
    </>
  )
}

export default TestIndex

const Tile = ({ info }) => {
  const [emojiSeed, setEmojiSeed] = useState(0)
  const newEmoji = () => {
    setEmojiSeed(Math.random())
  }
  return (
    <div
      className="top-0 left-0 text-2xl py-1 border-black"
      onTouchStart={newEmoji}
      onMouseEnter={newEmoji}
    >
      <div className="flex flex-row space-x-8 px-4 overflow-x-auto items-center">
        <RandEmoji rerender={emojiSeed} />
        <a
          href={info.fields.slug}
          className="flex-shrink-0 font-mond underline"
          style={{ color: "#0000ff" }}
        >
          {info.frontmatter.title}
        </a>
        <div className="flex flex-row space-x-4">
          <span
            className={` font-mont rounded-full px-3 mr-4 pb-0.5 text-lg bg-gradient-to-r from-gray-300 via-purple-200 to-gray-400 `}
          >
            {info.frontmatter.type}
          </span>
          {info.frontmatter.tags.map((tag, index) => (
            <span className="flex-shrink-0 text-xl italic font-mont">
              {tag}
            </span>
          ))}
          <span className="flex-shrink-0 font-bit px-4 inline-block">
            {info.frontmatter.date}
          </span>
        </div>
      </div>
    </div>
  )
}

const RandEmoji = ({ rerender }) => {
  const emojis = require("emoji.json/emoji-compact.json")
  return (
    <span>
      {emojis[Math.floor(Math.random() * emojis.length)].substring(0, 2)}
    </span>
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
          date(formatString: "MMM, YYYY")
        }
      }
    }
  }
`
