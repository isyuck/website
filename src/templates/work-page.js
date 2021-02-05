import React, { useState } from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import Layout from "../components/layout"
import Render from "../components/render"

const WorkPage = ({ data, location }) => {
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

  const mdx = data.mdx
  return (
    <Layout>
      <Header link="/#">{mdx.frontmatter.title}</Header>
      <div className="absolute flex flex-col w-screen max-w-screen space-y-8 text-black mt-11 text-lg overflow-y-auto overflow-x-hidden pb-64">
        <div className="mb-4 mt-8 px-4">
          <div className="flex flex-row justify-between">
            <p
              onClick={() => handleLinkPress()}
              className="mb-2 flex-grow mr-16 py-2"
            >
              <span aria-label="link" role="img">
                🔗
              </span>
              <span
                className={`pl-4 transition-opacity duration-700 ${
                  linkActive ? "opacity-100" : "opacity-0"
                } `}
              >
                Link copied!
              </span>
            </p>
            <span className="text-right flex-shrink py-2">
              {mdx.frontmatter.date}
            </span>
          </div>
          <div className="flex flex-wrap justify-left content-start text-lg">
            {mdx.frontmatter.tags.map(tag => (
              <>
                <a href="/" className="underline mr-2">
                  {tag}
                </a>
              </>
            ))}
          </div>
        </div>
        <article>
          <div className="flex flex-col space-y-8">
            <Render body={mdx.body} />
          </div>
        </article>
        <div className="flex flex-row justify-between pt-16">
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

export default WorkPage

export const query = graphql`
  query SingleWorkQuery($id: String!, $prevID: String, $nextID: String) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
        date
        tags
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
