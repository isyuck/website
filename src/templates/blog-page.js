import React from "react"
import { Link, graphql } from "gatsby"
import Header from "../components/header"
import Layout from "../components/layout"
import { MDXRenderer } from "gatsby-plugin-mdx"

const BlogPost = ({ data, location }) => {
  const mdx = data.mdx
  return (
    <Layout>
      <Header my={0} link="/">
        {mdx.frontmatter.title}
      </Header>
      <div className="flex flex-col space-y-8 text-white mt-16 px-4 text-lg overflow-y-auto overflow-x-hidden pb-64">
        <MDXRenderer title="My Stuff!">{mdx.body}</MDXRenderer>
      </div>
    </Layout>
  )
}

export default BlogPost

export const query = graphql`
  query SingleBlogQuery($id: String!) {
    mdx(id: { eq: $id }) {
      id
      body
      frontmatter {
        title
      }
    }
  }
`
