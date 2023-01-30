/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { Grommet, Main } from "grommet"
import styled from "styled-components"
import "./layout.css"

const StlyedMain = styled(Main)`
  height: 100vh;
`

const Layout = ({ children, theme }) => {
  return (
    <Grommet theme={theme}>
      <StlyedMain>{children}</StlyedMain>
    </Grommet>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
