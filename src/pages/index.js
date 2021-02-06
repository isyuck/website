import React, { useRef, useState, useEffect } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Render from "../components/render"

const TestIndex = ({ data, location }) => {
  const things = data.allMdx
  const [rerenderEmojis, setRerenderEmojis] = useState(0)

  return (
    <>
      {/* <div */}
      {/*   className="fixed inset-0 opacity-40 w-screen h-1/2 pointer-events-none bg-gradient-to-b from-white via-blue-500 to-pink-500 z-0" */}
      {/*   style={{ marginTop: "50vh" }} */}
      {/* /> */}
      <div className="fixed top-0 left-0 right-0 flex flex-row justify-between text-2xl z-10 pt-2 px-4 items-end">
        <p
          onClick={() => setRerenderEmojis(Math.random())}
          className="underline font-mond pb-1"
          style={{ color: "#0000ff" }}
        >
          isaac spicer
        </p>
        <p className="italic text-xl font-mont">
          artist
          <span className="font-bit text-2xl">/</span>
          programmer
        </p>
      </div>
      <div className="relative">
        <div className="text-xl ml-4 mt-16 font-mont z-10">
          <p>
            {"i have an "}
            <span
              className="px-1 underline font-bit text-2xl "
              style={{ color: "#00ff00" }}
            >
              E-MAIL
            </span>
          </p>
          <p className="flex flex-row">
            i am on{" "}
            <span
              className="px-2 underline font-bit text-2xl "
              style={{ color: "#ff0000" }}
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
            <marquee direction="right" className="w-4">
              <span className="font-sans pl-2">→</span>
            </marquee>
          </p>
        </div>
        <div className="mt-4">
          {things.nodes.map((thing, index) => (
            <div className="top-0 left-0 text-2xl py-1 border-black">
              <div className="flex flex-row space-x-8 px-4 overflow-x-scroll items-center">
                <span className="flex-shrink-0 font-bit pt-0.5 inline-block">
                  {thing.frontmatter.date}
                </span>
                <RandEmoji rerender={rerenderEmojis} />
                <span
                  className="flex-shrink-0 font-mond underline"
                  style={{ color: "#0000ff" }}
                >
                  {thing.frontmatter.title}
                </span>
                <div className="flex flex-row space-x-4">
                  <span
                    className="font-mont rounded-full px-3 pb-0.5 text-lg"
                    style={{ backgroundColor: "#00ff00" }}
                  >
                    {"text"}
                  </span>
                  {thing.frontmatter.tags.map(tag => (
                    <span className="flex-shrink-0 text-xl italic font-mont">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default TestIndex

const RandEmoji = ({ rerender }) => {
  const emojis = require("emoji.json/emoji-compact.json")
  return <span>{emojis[Math.floor(Math.random() * emojis.length)]}</span>
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
        body
        excerpt
        fields {
          slug
        }
        frontmatter {
          title
          tags
          cover {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
          date(formatString: "YYYY")
        }
      }
    }
  }
`
