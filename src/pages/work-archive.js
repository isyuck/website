import React, { useState } from "react"
import PI from "../components/pi"
import Layout from "../components/layout"
import Header from "../components/header"
import { graphql } from "gatsby"

const WorkArchive = ({ data, location }) => {
  const posts = data.allMdx
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
      <Header>
        <a href="/">
          {"Wo"}
          <PI>{"rk"}</PI>
          {" Arc"}
          <PI>{"h"}</PI>
          {"ive"}
        </a>
      </Header>
      <div className="w-screen h-full text-white">
        <div className="max-w-full mx-4 mt-16">
          <div className="w-full max-w-full pt-8 pb-8">
            <div className="flex flex-wrap">
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
