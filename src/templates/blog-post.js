import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import { useMediaQuery } from "react-responsive"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" })

  if (isTabletOrMobile) {
    return (
      <Layout location={location} title={siteTitle}>
        {/* <p className="fixed w-8 h-screen inset-0 text-xl text-center z-20 mt-10 pt-10"></p> */}
        {/*   <p className="text-right border-black border-b"> */}
        {/*     {/\* {post.frontmatter.date} *\/}← */}
        {/*   </p> */}
        {/*   <p className="border-black border-b">{post.frontmatter.title}</p> */}
        {/* </div> */}

        <Link to="/">
          <div className="fixed inset-0 flex h-28 pt-20 px-8 text-xl">
            <p className="w-8 border-black border-b">←</p>
            <p className="flex-grow border-black border-b">
              <p className="pl-0">{post.frontmatter.title}</p>
            </p>
          </div>
        </Link>
        <div className="flex fixed overflow-scroll inset-0 top-28 w-screen px-8 text-xl h-auto">
          <article
            className="blog-post"
            itemScope
            itemType="http://schema.org/Article"
          >
            {/* <section */}
            {/*   MDXRenderer={{ __html: post.html }} */}
            {/*   itemProp="articleBody" */}
            {/* /> */}
          </article>
        </div>
      </Layout>
    )
  } else {
    return (
      <Layout location={location} title={siteTitle}>
        <div className="flex overflow-scroll fixed inset-0">
          <div className="container w-1/3 mx-auto">
            <article
              className="blog-post"
              itemScope
              itemType="http://schema.org/Article"
            >
              <header className="text-2xl z-20">
                <h1 itemProp="headline">{post.frontmatter.title}</h1>
                <p>{post.frontmatter.date}</p>
              </header>
              <section
                dangerouslySetInnerHTML={{ __html: post.html }}
                itemProp="articleBody"
              />
              <hr />
            </article>
            <nav className="blog-post-nav">
              <ul
                style={{
                  display: `flex`,
                  flexWrap: `wrap`,
                  justifyContent: `space-between`,
                  listStyle: `none`,
                  padding: 0,
                }}
              >
                <li>
                  {previous && (
                    <Link to={previous.fields.slug} rel="prev">
                      ← {previous.frontmatter.title}
                    </Link>
                  )}
                </li>
                <li>
                  {next && (
                    <Link to={next.fields.slug} rel="next">
                      {next.frontmatter.title} →
                    </Link>
                  )}
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    mdx(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      frontmatter {
        title
        date(formatString: "MMM YYYY")
        description
      }
    }
    previous: mdx(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: mdx(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
