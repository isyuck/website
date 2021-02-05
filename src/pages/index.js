import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import Header from "../components/header"
import { InView } from "react-intersection-observer"
import { SwitchTransition, Transition } from "react-transition-group"
import SweetScroll from "sweet-scroll"
import Img from "gatsby-image"
import PI from "../components/pi"
import Subpage from "../components/subpage"

const Index = ({ data, location }) => {
  const posts = data.allMdx
  const [title, setTitle] = useState("")
  const [active, setActive] = useState(true)
  const [index, setIndex] = useState(0)
  const ref = useRef(null)

  SweetScroll.create(
    {
      trigger: "a[href^='#']",
      horizontal: true,
      duration: 1500,
    },
    ref.current
  )

  const handleViewChange = (inView, title, index) => {
    setActive(inView)
    setIndex(index)
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
        className="fixed inset-0 bg-white text-black overflow-y-hidden flex flex-row"
      >
        <Header link="#subpage-0" index={index} arrows={true}>
          <SwitchTransition mode="out-in">
            <FadeTransition
              key={active}
              timeout={250}
              unmountOnExit
              mountOnEnter
            >
              {title}
            </FadeTransition>
          </SwitchTransition>
        </Header>

        <div className="flex space-x-8">
          <Subpage index={0} onChange={handleViewChange} title="">
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
            <div className="font-sans text-base flex flex-wrap max-w-full mt-4">
              <span className="pr-4 underline">Email</span>
              <span className="pr-4 underline">Github</span>
              <span className="pr-4 underline">Instagram</span>
            </div>
          </Subpage>

          <Subpage
            title="Projects"
            index={1}
            onChange={handleViewChange}
            px={0}
            pt={0}
          >
            {posts.edges.map(post => (
              <>
                {post.node.frontmatter.cover !== null && (
                  <>
                    <div className="grid grid-cols-1 mt-6">
                      <WorkTile post={post} />
                    </div>
                  </>
                )}
              </>
            ))}
          </Subpage>

          <Subpage title="Music" index={2} onChange={handleViewChange} px={2}>
            <p className="px-2 text-lg">
              I sometimes make music. Usually I do this with code using the
              wonderful pattern language{" "}
              <a className="underline" href="https://tidalcycles.org/Welcome">
                TidalCycles
              </a>
              . I perform under the name isyuck, and you'll find any of my music
              related things here.
            </p>
            <div className="mt-8 px-2">
              <a className="underline" href="">
                Solstice Stream
              </a>
            </div>
          </Subpage>

          <Subpage title="Posts" index={3} onChange={handleViewChange} px={2}>
            <div className="flex flex-col space-y-16">
              {posts.edges.map(post => (
                <div className="border-l-2 border-black pl-2 py-2 flex flex-col flex-shrink-0 space-y-4">
                  <a href={post.node.fields.slug}>
                    {post.node.frontmatter.title}
                  </a>
                  <span className="flex-shrink">
                    {post.node.frontmatter.date}
                  </span>

                  <div className="flex flex-wrap justify-left content-start text-lg">
                    {post.node.frontmatter.tags.map(tag => (
                      <>
                        <a href="/" className="underline mr-2">
                          {tag}
                        </a>
                      </>
                    ))}
                  </div>
                  <p className="text-lg">{post.node.excerpt}</p>
                  <a className="text-lg underline" href={post.node.fields.slug}>
                    Read more
                  </a>
                </div>
              ))}
            </div>
          </Subpage>
        </div>
      </div>
    </Layout>
  )
}
export default Index

const WorkTile = ({ post, root }) => {
  const [active, setActive] = useState(true)
  return (
    <>
      <div
        className={`sticky block p-2 top-11 left-0 z-20 -mt-6 mb-1 text-white pointer-events-none`}
      >
        <span className="float-left clear-left px-2 py-1 bg-black">
          {post.node.frontmatter.title}
        </span>
        <span className="float-left clear-left px-2 py-1 mt-2 bg-black">
          {post.node.frontmatter.date}
        </span>
      </div>
      <InView onChange={inview => setActive(inview)} threshold="0.5">
        {({ inView, ref }) => (
          <>
            <a
              href={post.node.fields.slug}
              ref={ref}
              className={`transition-all duration-1000`}
              style={{
                marginTop: "-6.5rem",
                filter: active ? "brightness(100%)" : "brightness(75%)",
              }}
            >
              <Img fluid={post.node.frontmatter.cover.childImageSharp.fluid} />
            </a>
          </>
        )}
      </InView>
    </>
  )
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

export const pageQuery = graphql`
  query {
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
  }
`
