const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Define a template for blog post
  const blogPage = path.resolve(`./src/templates/blog-page.js`)
  const workPage = path.resolve("./src/templates/work-page.js")

  // Get all markdown blog posts sorted by date
  const blogQ = await graphql(
    `
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "/blog/" } }) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )
  if (blogQ.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      result.errors
    )
    return
  }

  const workQ = await graphql(
    `
      query {
        allMdx(filter: { fileAbsolutePath: { regex: "/work/" } }) {
          nodes {
            id
            fields {
              slug
            }
          }
        }
      }
    `
  )

  if (workQ.errors) {
    reporter.panicOnBuild(
      `There was an error loading your work posts`,
      result.errors
    )
    return
  }

  const bq = blogQ.data.allMdx.nodes
  const wq = workQ.data.allMdx.nodes

  if (bq.length > 0) {
    bq.forEach((node, index) => {
      const prevID = index === 0 ? null : bq[index - 1].id
      const nextID = index === bq.length - 1 ? null : bq[index + 1].id
      createPage({
        path: node.fields.slug,
        component: blogPage,
        context: { id: node.id, prevID, nextID },
      })
    })
  }

  if (wq.length > 0) {
    wq.forEach((node, index) => {
      const prevID = index === 0 ? null : wq[index - 1].id
      const nextID = index === wq.length - 1 ? null : wq[index + 1].id
      createPage({
        path: node.fields.slug,
        component: workPage,
        context: { id: node.id, prevID, nextID },
      })
    })
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions
  if (node.internal.type === `Mdx`) {
    const value = createFilePath({ node, getNode })

    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  // Explicitly define the siteMetadata {} object
  // This way those will always be defined even if removed from gatsby-config.js

  // Also explicitly define the Markdown frontmatter
  // This way the "MarkdownRemark" queries will return `null` even when no
  // blog posts are stored inside "content/blog" instead of returning an error
  createTypes(`
    type SiteSiteMetadata {
      author: Author
      siteUrl: String
      social: Social
    }

    type Author {
      name: String
      summary: String
    }

    type Social {
      twitter: String
    }

    type Mdx implements Node {
      frontmatter: Frontmatter
      fields: Fields
    }

    type Frontmatter {
      title: String
      description: String
      date: Date @dateformat
    }

    type Fields {
      slug: String
    }
  `)
}
