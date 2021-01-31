import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { InView } from "react-intersection-observer"
import { SwitchTransition, Transition } from "react-transition-group"
import SweetScroll from "sweet-scroll"
import Img from "gatsby-image"
import ReactPlayer from "react-player/lazy"

// TODO make active always false while scrolling back to page 0 to prevent titles popping up on their way past
// TODO ? animation on arrow press
// TODO ? text fade in after time (first view only)

const Index = ({ data, location }) => {
  const posts = data.allMdx
  const [title, setTitle] = useState("")
  const [active, setActive] = useState(true)
  const ref = useRef(null)

  SweetScroll.create(
    {
      trigger: "a[href^='#']",
      horizontal: true,
      duration: 1500,
    },
    ref.current
  )

  const handleViewChange = (inView, post, index) => {
    setActive(inView)
    if (inView && post != null) {
      setTitle(post.node.frontmatter.title)
    } else {
      setTitle("")
    }
  }

  return (
    <Layout>
      <div
        ref={ref}
        className="fixed inset-0 h-screen bg-black text-white overflow-y-hidden pointer-events-auto flex flex-row"
        style={{ scrollBehavior: "smooth" }}
      >
        <div className="fixed p-4 pt-4 z-30 h-12 text-white inset-0 text-xl">
          <div className="flex flex-row space-x-4 justify-between">
            <div className="flex flex-row flex-shrink-0">
              <a href="#page-0">
                {"Is"}
                <PI>{"aa"}</PI>
                {"c "}
                <PI>{"S"}</PI>
                {"pic"}
                <PI>{"e"}</PI>
                {"r"}
              </a>
            </div>
            <SwitchTransition mode="out-in">
              <FadeTransition
                key={active}
                timeout={250}
                unmountOnExit
                mountOnEnter
              >
                {title.split("").map(char => {
                  return <PIrand>{`${char}`}</PIrand>
                })}
              </FadeTransition>
            </SwitchTransition>
          </div>
        </div>

        {/* <a */}
        {/*   href={`#page-${currentPage + 1}`} */}
        {/*   className={`transition-all grid grid-cols-2 duration-500 left-0 fixed z-20 text-xl text-white bottom-0 px-4 text-center pb-16 pt-20`} */}
        {/*   style={ */}
        {/*     !currentPage */}
        {/*       ? { marginLeft: "0vw ", width: "12vw" } */}
        {/*       : { marginLeft: "86vw", width: "12vw" } */}
        {/*   } */}
        {/* > */}
        {/*   <span className="font-bold">→</span> */}
        {/* </a> */}

        <div className="flex space-x-8">
          <InView
            onChange={inview => handleViewChange(inview, null, 0)}
            threshold="0.6" // the % of the div that has to be onscreen to be 'visible'
          >
            {({ inView, ref }) => (
              <div
                id="page-0"
                ref={ref}
                className={`h-screen flex-shrink-0 w-screen px-4 pt-16 pb-32 text-xl`}
              >
                <div className="w-2/3 mt-8">
                  <p>
                    <PI>{"A"}</PI>
                    {"rti"}
                    <PI>{"s"}</PI>
                    {"t a"}
                    <PI>{"n"}</PI>
                    {"d pro"}
                    <PI>{"gr"}</PI>
                    {"am"}
                    <PI>{"m"}</PI>
                    {"er in P"}
                    <PI>{"ly"}</PI>
                    {"mo"}
                    <PI>{"u"}</PI>
                    {"th"}
                    <PI>{","}</PI>
                    {" U"}
                    <PI>{".K."}</PI>
                  </p>
                </div>
                <div className="font-sans flex flex-wrap max-w-full mt-12">
                  <span className="pr-4">Email</span>
                  <span className="pr-4">Blog</span>
                  <span className="pr-4">Github</span>
                  <span className="pr-4">Instagram</span>
                </div>

                <div className="mt-12 text-sm">⚠ Flashing images</div>
                <a href={`#page-1`} className="absolute bottom-0 py-24 pr-16">
                  <PI>{"v"}</PI>
                  {"ie"}
                  <PI>{"w"}</PI>
                  {" w"}
                  <PI>{"o"}</PI>
                  {"r"}
                  <PI>{"k "}</PI>
                  <span className="pl-2 font-bold">→</span>
                </a>
              </div>
            )}
          </InView>
          {posts.edges.map((post, index) => (
            <InView
              onChange={inview => handleViewChange(inview, post, index)}
              threshold="0.6" // the % of the div that has to be onscreen to be 'visible'
            >
              {({ inView, ref }) => (
                <MobilePage
                  data={data}
                  pageRef={ref}
                  pageID={index}
                  post={post}
                />
              )}
            </InView>
          ))}
        </div>
      </div>
    </Layout>
  )
}
export default Index

const MobilePage = ({ pageRef, pageID, post, data }) => {
  const vidCount = 32 // try and obtain this number programmatically
  const [current, setCurrent] = useState(1)
  const [active] = useState([0, 1, 2]) // 0 prev, 1 current, 2 next

  // rotate videos right
  const rotR = () => {
    active.unshift(active.pop())
    setCurrent(mod(current + 1, vidCount))
    console.log(current)
  }

  // rotate videos left
  const rotL = () => {
    active.push(active.shift())
    setCurrent(mod(current - 1, vidCount))
    console.log(current)
  }

  return (
    <>
      {"work" === post.node.frontmatter.type && (
        <div
          id={`page-${pageID}`}
          ref={pageRef}
          className={`overflow-y-scroll h-screen flex-shrink-0 w-screen px-4 pt-8 pb-32 `}
          style={{ height: "110vh" }}
        >
          <>
            {post.node.frontmatter.viddir !== null ? (
              <div
                className={`relative mt-8 w-full`}
                style={{ height: "calc(100vh - 8rem)" }}
              >
                <div className="flex flex-row absolute w-full h-full z-20">
                  <div className="w-1/2 h-full" onClick={() => rotL()}></div>
                  <div className="w-1/2 h-full" onClick={() => rotR()}></div>
                </div>
                <Video
                  viddir={post.node.frontmatter.viddir}
                  current={current}
                  state={active[0]}
                />
                <Video
                  viddir={post.node.frontmatter.viddir}
                  current={current}
                  state={active[1]}
                />
                <Video
                  viddir={post.node.frontmatter.viddir}
                  current={current}
                  state={active[2]}
                />
              </div>
            ) : (
              <div className="mt-8">
                <Img
                  fluid={post.node.frontmatter.header.childImageSharp.fluid}
                />
              </div>
            )}
          </>
          <p className="font-bold py-16 mx-auto w-16 text-xl text-center">↓</p>
          <div className="flex flex-col space-y-4 text-xl pb-16">
            <p>
              {post.node.frontmatter.date.split("").map(char => (
                <PIrep char={char} rep="0">{`${char}`}</PIrep>
              ))}
            </p>
            {post.node.frontmatter.tags !== null && (
              <>
                <div className="w-full text-base flex space-x-4 ">
                  {post.node.frontmatter.tags.map(tag => (
                    <p>{tag}</p>
                  ))}
                </div>
              </>
            )}
            <MDXRenderer>{post.node.body}</MDXRenderer>
            <a
              href={`#page-${pageID + 1}`}
              className="font-bold py-4 mx-auto w-16 text-center"
            >
              →
            </a>
          </div>
        </div>
      )}
    </>
  )
}

const Video = ({ current, color, state, viddir }) => {
  let url = current

  switch (state) {
    case 0:
      url = current - 1
      break
    case 1:
      break
    case 2:
      url = current + 1
      break
    default:
      break
  }

  return (
    <>
      <div
        className={`absolute w-full ${
          state === 1 ? "opacity-100" : "opacity-0"
        }`}
        style={{ height: "calc(100vh - 8rem)" }}
      >
        <ReactPlayer
          playing={true}
          volume={0}
          muted={true}
          loop={true}
          playsinline={true}
          url={`vid/${viddir}/${url + 1}.mp4`}
          width="100%"
          height="100%"
          style={{
            top: "0",
            left: "0",
            position: "absolute",
            width: "100%",
          }}
        />
      </div>
    </>
  )
}

// pix font inline
const PI = ({ children }) => {
  return (
    <span
      style={{
        fontSize: "1.17rem",
        /* fontSmooth: "never", */
        /* webkitFontSmoothing: "none", */
      }}
      className="font-pixel"
    >
      {children}
    </span>
  )
}
//
// replace char with rep styled as inline pixel font
const PIrep = ({ children, char, rep }) => {
  if (char !== rep) {
    return <span>{children}</span>
  } else {
    return <PI>{children}</PI>
  }
}

// return the child as inline pixel font some % of the time
const PIrand = ({ children }) => {
  if (Math.random() > 0.55) {
    return <PI>{children}</PI>
  } else {
    return <span>{children}</span>
  }
}

const FadeTransition = ({ children, ...rest }) => (
  <Transition {...rest}>
    {state => (
      <div
        className="transition-all duration-500 flex-initial"
        style={{ opacity: `${state === "entered" ? 1 : 0}` }}
      >
        {children}
      </div>
    )}
  </Transition>
)

// because in javascript '%' is remainder, not modulo...
const mod = (n, m) => {
  return ((n % m) + m) % m
}

export const pageQuery = graphql`
  query {
    allFile(filter: { extension: { eq: "mp4" } }) {
      edges {
        node {
          extension
          name
          relativePath
          relativeDirectory
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          id
          body
          excerpt(pruneLength: 100000)
          fields {
            slug
          }
          frontmatter {
            title
            type
            tags
            viddir
            header {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
            date(formatString: "YYYY")
            description
            url
          }
        }
      }
    }
  }
`
