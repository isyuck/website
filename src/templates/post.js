import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import Layout from "../components/layout"
import Render from "../components/render"

const Post = ({ data, location }) => {
  const [linkActive, setLinkActive] = useState(false)
  const { previous, next } = data

  const handleLinkPress = () => {
    setLinkActive(true)
    setTimeout(() => {
      setLinkActive(false)
    }, 1000)
    const el = document.createElement("input")
    el.value = location.href ? location.href : ""
    el.id = "url-input"
    document.body.appendChild(el)
    el.select()
    document.execCommand("copy")
    el.remove()
  }

  const typeToColor = type => {
    switch (type) {
      case "post":
        return "#ffff00"
      case "music":
        return "#ff00ff"
      case "art":
        return "#00ff00"
      default:
        return "#ffffff"
    }
  }

  const mdx = data.mdx
  return (
    <Layout>
      <Header link="/#">{mdx.frontmatter.title}</Header>
      <div className="absolute flex flex-col w-screen max-w-screen space-y-8 text-black mt-11 text-lg overflow-y-auto overflow-x-hidden pb-64">
        <div className="px-4 mt-8">
          <span
            className="font-mont rounded-full px-3 pb-0.5 text-lg flex-shrink h-8 mt-2"
            style={{
              backgroundColor: `${typeToColor(mdx.frontmatter.type)}`,
            }}
          >
            {mdx.frontmatter.type}
          </span>
          <p
            onClick={() => handleLinkPress()}
            className="mb-1 flex-grow mr-16 py-2 mt-3"
          >
            <span aria-label="link" role="img">
              🔗
            </span>
            <span
              className={`pl-2 font-sans text-base transition-opacity duration-500 italic ${
                linkActive ? "opacity-100" : "opacity-0"
              } `}
            >
              {"copied"}
              <span className="text-base pl-2">💖</span>
            </span>
          </p>
          <span className="font-bit pt-1.5 inline-block text-2xl">
            {mdx.frontmatter.date}
          </span>

          <div className="flex mt-4 flex-row space-x-4 overflow-x-auto">
            {mdx.frontmatter.tags.map(tag => (
              <>
                <span className="flex-shrink-0 text-xl italic font-mont">
                  {tag}
                </span>
              </>
            ))}
          </div>
        </div>
        <article>
          <div className="flex flex-col pt-8 space-y-8 text-xl font-sans">
            <Render body={mdx.body} />
          </div>
        </article>
        <div className="flex flex-row justify-between pt-16 px-4">
          {previous && (
            <a href={previous.fields.slug} className="py-3 flex-grow">
              <span className="font-bold text-xl pr-2">←</span>
              {previous.frontmatter.title}
            </a>
          )}
          {next && (
            <a href={next.fields.slug} className="py-3 flex-grow text-right">
              {next.frontmatter.title}
              <span className="font-bold text-xl pl-2">→</span>
            </a>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Post

export const query = graphql`
  query postQuery($id: String!, $prevID: String, $nextID: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date(formatString: "DD MMMM YYYY")
        tags
        type
      }
      fields {
        slug
      }
    }
    previous: mdx(id: { eq: $prevID }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextID }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
