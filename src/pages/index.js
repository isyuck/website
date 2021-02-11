import React, { useRef, useState, useEffect, PropTypes } from "react"
import { StaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import Header from "../components/header"
import Layout from "../components/layout"

const Index = ({ data, location }) => {
  return (
    <>
      <Layout>
        <Header>artist/programmer</Header>
      </Layout>
    </>
  )
}

export default Index
