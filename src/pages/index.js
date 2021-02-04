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
  const ref = useRef(null)

  SweetScroll.create(
    {
      trigger: "a[href^='#']",
      horizontal: true,
      duration: 1500,
    },
    ref.current
  )

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
        className="fixed inset-0 bg-black text-white overflow-y-hidden flex flex-row"
      >
        <Header link="#subpage-0">
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
            <div className="font-sans text-base flex flex-wrap max-w-full mt-4">
              <span className="pr-4 underline">Email</span>
              <span className="pr-4 underline">Github</span>
              <span className="pr-4 underline">Instagram</span>
            </div>
          </Subpage>

          <Subpage title="Work" index={1} onChange={handleViewChange} px={0}>
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

          <Subpage
            title="Blog"
            index={2}
            onChange={handleViewChange}
            nextArrow={false}
          >
            {posts.edges.map(post => (
              <a className="py-2" href={post.node.fields.slug}>
                {post.node.frontmatter.title}
              </a>
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
      <div
        className={`sticky block p-2 -top-5 left-0 z-20 -mt-6 mb-1 pointer-events-none`}
      >
        <span className="float-left clear-left px-2 py-1 bg-black">
          {post.node.frontmatter.title}
        </span>
        <span className="float-left clear-left px-2 py-1 mt-2 bg-black">
          {post.node.frontmatter.date}
        </span>
      </div>
      <a
        href={post.node.fields.slug}
        onTouchStart={() => setActive(true)}
        onTouchMove={() => setActive(true)}
        onTouchEnd={() => setTimeout(() => setActive(false), 500)}
        onMouseEnter={() => setActive(true)}
        onMouseLeave={() => setTimeout(() => setActive(false), 500)}
        className={`transition-all duration-700`}
        style={{
          marginTop: "-6.5rem",
          filter: active ? "brightness(100%)" : "brightness(75%)",
        }}
      >
        <Img fluid={post.node.frontmatter.cover.childImageSharp.fluid} />
      </a>
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
          fields {
            slug
          }
          frontmatter {
            title
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
