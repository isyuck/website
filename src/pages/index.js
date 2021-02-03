import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import { MDXRenderer } from "gatsby-plugin-mdx"
import { InView } from "react-intersection-observer"
import { SwitchTransition, Transition } from "react-transition-group"
import SweetScroll from "sweet-scroll"
import Img from "gatsby-image"
import PI from "../components/pi"
import ReactPlayer from "react-player/lazy"
import Subpage from "../components/subpage"

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

  const [tagFilter, setTagFilter] = useState(null)

  const handleTagChange = val => {
    if (tagFilter === null) {
      setTagFilter(val)
    } else if (tagFilter === val) {
      setTagFilter(null)
    } else {
      setTagFilter(val)
    }
  }

  const handleViewChange = (inView, title) => {
    setActive(inView)
    if (inView) {
      setTitle(title)
    } else {
      setTitle("")
    }
  }

  return (
    <Layout>
      <div
        ref={ref}
        className="fixed inset-0 bg-black text-white overflow-y-hidden pointer-events-auto flex flex-row"
        style={{ scrollBehavior: "smooth" }}
      >
        <Header link="#subpage-0">
          <SwitchTransition mode="out-in">
            <FadeTransition
              key={active}
              timeout={250}
              unmountOnExit
              mountOnEnter
            >
              {/* {title.split("").map(char => { */}
              {/*   return <PIrand>{`${char}`}</PIrand> */}
              {/* })} */}
              {title}
            </FadeTransition>
          </SwitchTransition>
        </Header>

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
          {/*         <div className="mt-16 text-base">⚠ Flashing images</div> */}
          {/*         <a */}
          {/*           href={`#subpage-1`} */}
          {/*           className="absolute bottom-0 py-20 pr-16" */}
          {/*         > */}
          {/*           {"f"} */}
          {/*           <PI>{"e"}</PI> */}
          {/*           {"at"} */}
          {/*           <PI>{"u"}</PI> */}
          {/*           {"red "} */}
          {/*           <PI>{" w"}</PI> */}
          {/*           {"o"} */}
          {/*           {"r"} */}
          {/*           <PI>{"k "}</PI> */}
          {/*           <span className="pl-2 font-bold">→</span> */}
          {/*         </a> */}

          <Subpage index={0} onChange={handleViewChange} nextArrow={true}>
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
            <div className="font-sans text-base flex flex-wrap max-w-full mt-12">
              <a href="#subpage-4" className="pr-4 underline">
                Archive
              </a>
              <span className="pr-4 underline">Blog</span>
            </div>
            <div className="font-sans text-base flex flex-wrap max-w-full mt-4">
              <span className="pr-4 underline">Email</span>
              <span className="pr-4 underline">Github</span>
              <span className="pr-4 underline">Instagram</span>
            </div>
          </Subpage>

          <Subpage title="Work" index={1} onChange={handleViewChange} px={0}>
            {posts.edges.map(post => (
              <>
                {post.node.frontmatter.header !== null && (
                  <>
                    <div className="grid grid-cols-1 mt-8">
                      <WorkTile post={post} />
                      <WorkTile post={post} />
                      <WorkTile post={post} />
                      <WorkTile post={post} />
                      <WorkTile post={post} />
                      <WorkTile post={post} />
                    </div>
                  </>
                )}
              </>
            ))}
          </Subpage>

          <Subpage title="test2" index={2} onChange={handleViewChange}>
            <div>hello2</div>
          </Subpage>

          {/* {posts.edges.map((post, index) => ( */}
          {/*   <Subpage */}
          {/*     title={post.node.frontmatter.title} */}
          {/*     index={index + 3} */}
          {/*     onChange={handleViewChange} */}
          {/*   > */}
          {/*     <MobilePage data={data} pageID={index} post={post} /> */}
          {/*   </Subpage> */}
          {/* ))} */}

          <Subpage index={3} onChange={handleViewChange} nextArrow={false}>
            <div className="m-auto text-center">
              <a className="p-8" href={`#subpage-4`}>
                {"A"}
                <PI>{"r"}</PI>
                {"c"}
                <PI>{"h"}</PI>
                {"ive"}
                {" →"}
              </a>
            </div>
          </Subpage>

          <Subpage
            title="Archive"
            index={4}
            onChange={handleViewChange}
            nextArrow={false}
          >
            <div className="flex flex-wrap py-8">
              {data.allMdx.group.map(tag => (
                <span
                  onClick={() => handleTagChange(tag.fieldValue)}
                  className={`mr-2 px-1 py-0.5 ${
                    tagFilter === tag.fieldValue ? "bg-white text-black" : ""
                  }`}
                >
                  <span className="underline">{tag.fieldValue}</span>
                  <PI> ( {tag.totalCount} )</PI>
                </span>
              ))}
            </div>
            {posts.edges.map(post => (
              <>
                {post.node.frontmatter.tags !== null && (
                  <PostLink
                    title={post.node.frontmatter.title}
                    slug={post.node.fields.slug}
                    date={post.node.frontmatter.date}
                    tags={post.node.frontmatter.tags}
                    tagFilter={tagFilter}
                  />
                )}
              </>
            ))}
          </Subpage>
        </div>
      </div>
    </Layout>
  )
}
export default Index

const WorkTile = ({ post }) => {
  const [active, setActive] = useState(true)
  const dt = 500
  return (
    <>
      <div className={`sticky block p-2 -top-4 left-0 z-20 -mt-24`}>
        <span className="float-left clear-left px-2 py-1 bg-black">
          {post.node.frontmatter.title}
        </span>
        <span className="float-left clear-left px-2 py-1 mt-3 bg-black">
          {post.node.frontmatter.date}
        </span>
      </div>
      <div style={{ marginTop: "-6.5rem" }}>
        <Img fluid={post.node.frontmatter.header.childImageSharp.fluid} />
      </div>
    </>

    // <div
    //   className="relative"
    //   /* onTouchStart={() => setActive(true)} */
    //   /* onTouchMove={() => setActive(true)} */
    //   /* onTouchEnd={() => setTimeout(() => setActive(false), 500)} */
    // >
    //   <div className="absolute h-32">
    //     <div
    //       className={`sticky bg-red-500 block p-2 inset-y-0 z-20
    //       transition-opacity duration-700
    //        ${active ? "opacity-100" : `delay-${dt} opacity-0`} `}
    //     >
    //       <span className="float-left clear-left px-2 py-1 bg-black">
    //         {post.node.frontmatter.title}
    //       </span>
    //       <span className="float-left clear-left px-2 py-1 mt-2 bg-black">
    //         {post.node.frontmatter.date}
    //       </span>
    //     </div>
    //   </div>
    //   <div
    //     className={`relative inset-0 transition-opacity duration-700 ${
    //       active ? "opacity-60" : `delay-${dt} opacity-100`
    //     }`}
    //   >
    //     <Img fluid={post.node.frontmatter.header.childImageSharp.fluid} />
    //   </div>
    // </div>
  )
}

const MobilePage = ({ pageID, post, data }) => {
  const vidCount = 32 // try and obtain this number programmatically
  const [current, setCurrent] = useState(1)
  const [active] = useState([0, 1, 2]) // 0 prev, 1 current, 2 next
  const [showCopyLink, setShowCopyLink] = useState(false)

  const copyLink = () => {
    setShowCopyLink(true)
    setTimeout(() => {
      setShowCopyLink(false)
    }, 100)
  }

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
      {post.node.frontmatter.viddir !== null ? (
        <div
          className={`relative mt-8 w-full`}
          style={{ height: "calc(100vw - 2rem)" }}
        >
          <div className="flex flex-row absolute h-full w-full z-20">
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
          <Img fluid={post.node.frontmatter.header.childImageSharp.fluid} />
        </div>
      )}
      <div className="font-bold w-full pt-32 pb-16 mx-auto w-16 text-xl text-center">
        ↓
      </div>
      <div className="flex flex-col space-y-4 text-lg pb-16">
        <p>
          {post.node.frontmatter.date.split("").map(char => (
            <PIrep char={char} rep="0">{`${char}`}</PIrep>
          ))}
        </p>
        <div className="flex flex-row" onClick={() => copyLink()}>
          <p
            className={`transform origin-center text-center left-0 max-w-min duration-500 ${
              showCopyLink ? "scale-125" : "scale-100"
            }`}
          >
            {"🔗"}
          </p>
          <p
            className={`transition-opacity pl-4 text-base ${
              showCopyLink
                ? "invisible duration-0 opacity-100"
                : "visible delay-500 opacity-0 duration-1000"
            }
`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            Link copied!
          </p>
        </div>

        {post.node.frontmatter.tags !== null && (
          <>
            <div className="w-full text-base flex space-x-4 underline">
              {post.node.frontmatter.tags.map(tag => (
                <a href="#page-5">{tag}</a>
              ))}
            </div>
          </>
        )}
        <div>
          <MDXRenderer>{post.node.body}</MDXRenderer>
        </div>
      </div>
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
        className={`absolute w-full h-full ${
          state === 1 ? "opacity-100" : "opacity-0"
        }`}
      >
        <ReactPlayer
          playing={true}
          volume={0}
          muted={true}
          loop={true}
          playsinline={true}
          url={`vid/${viddir}/${url + 1}.mp4`}
          width="100%"
        />
      </div>
    </>
  )
}

const PostLink = ({ title, slug, date, tags, tagFilter }) => {
  if (tags.includes(tagFilter)) {
    return (
      <a href="/" className="flex flex-cols-2 py-1 text-xl">
        <span className="flex-shrink pr-8">{date}</span>
        <a href={slug}>{title}</a>
      </a>
    )
  } else if (tagFilter === null) {
    return (
      <a href="/" className="flex flex-cols-2 py-1 text-xl">
        <span className="flex-shrink pr-8">{date}</span>
        <a href={slug}>{title}</a>
      </a>
    )
  } else {
    return null
  }
}

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
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { template: { eq: "work-page" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
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
            template
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
