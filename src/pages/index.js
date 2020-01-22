import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Soundboard from "../components/Soundboard"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <Soundboard />
  </Layout>
)

export default IndexPage
