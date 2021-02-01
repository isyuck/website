import React, { useState } from "react"
import PI from "../components/pi"
import Layout from "../components/layout"
import { graphql } from "gatsby"

const WorkArchive = ({ data, location }) => {
  const posts = data.allMdx
  const tags = data.allMdx.group
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
  return (
    <Layout>
      <div className="fixed p-4 pt-4 z-30 h-12 text-white inset-0 text-xl">
        <div className="flex flex-row space-x-4 justify-between">
          <div className="flex flex-row flex-shrink-0">
            <a href="/">
              {"Is"}
              <PI>{"aa"}</PI>
              {"c "}
              <PI>{"S"}</PI>
              {"pic"}
              <PI>{"e"}</PI>
              {"r"}
            </a>
          </div>
        </div>
      </div>

      <div className="w-screen h-full text-white">
        <div className="max-w-full mx-4 mt-16">
          <div className="w-full max-w-full pt-8 pb-8">
            <div className="flex flex-wrap">
              {data.allMdx.group.map(tag => (
                <span
                  onClick={() => handleTagChange(tag.fieldValue)}
                  className={`px-2 py-0.5 ${
                    tagFilter === tag.fieldValue ? "bg-white text-black" : ""
                  }`}
                >
                  <span className="underline">{tag.fieldValue}</span>
                  <PI> ( {tag.totalCount} )</PI>
                </span>
              ))}
            </div>
          </div>
          {posts.edges.map(post => (
            <>
              {post.node.frontmatter.tags !== null && (
                <>
                  <PostLink
                    title={post.node.frontmatter.title}
                    date={post.node.frontmatter.date}
                    tags={post.node.frontmatter.tags}
                    tagFilter={tagFilter}
                  />
                </>
              )}
            </>
          ))}
        </div>
      </div>
    </Layout>
  )
}

export default WorkArchive

const PostLink = ({ title, date, tags, tagFilter }) => {
  if (tags.includes(tagFilter)) {
    return (
      <a href="/" className="flex flex-cols-2 py-1 text-xl">
        <span className="flex-shrink pr-8">{date}</span>
        <span>{title}</span>
      </a>
    )
  } else if (tagFilter === null) {
    return (
      <a href="/" className="flex flex-cols-2 py-1 text-xl">
        <span className="flex-shrink pr-8">{date}</span>
        <span>{title}</span>
      </a>
    )
  } else {
    return null
  }
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMdx(
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { type: { eq: "work" } } }
    ) {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
      edges {
        node {
          frontmatter {
            title
            type
            tags
            date(formatString: "YYYY")
            url
          }
        }
      }
    }
  }
`
