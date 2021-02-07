import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"

const NotFoundPage = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title

  return (
    <Layout location={location} title={siteTitle}>
      <div className="container m-auto">
        <div className="my-16 space-y-4 place-items-center text-center flex flex-col">
          <span
            className={`w-16 font-mont rounded-full px-3 pb-0.5 text-lg bg-gradient-to-r from-gray-300 via-purple-200 to-gray-400`}
          >
            404
          </span>
          <span>you're lost! or i broke something</span>
          <a
            href="/"
            className="mx-4 text-xl font-mond underline"
            style={{ color: "#0000ff" }}
          >
            Go Home
          </a>
          <span>❓</span>
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`
