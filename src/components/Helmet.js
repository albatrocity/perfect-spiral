import React, { useEffect, useState } from "react"
import { Box, Heading, Text, ThemeContext } from "grommet"
import { useStaticQuery, graphql } from "gatsby"
import styled from "styled-components"

const Image = styled.img`
  display: block;
  cursor: pointer;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-bottom: 0;
`

const Helmet = ({ team, onClick, ...rest }) => {
  const name =
    team || (ThemeContext._currentValue || { global: {} }).global.name
  const data = useStaticQuery(graphql`
    query {
      chiefs: file(relativePath: { eq: "chiefs.gif" }) {
        publicURL
      }
      buccaneers: file(relativePath: { eq: "buccaneers.gif" }) {
        publicURL
      }
    }
  `)

  return (
    <>
      {name && <Image src={data[name].publicURL} onClick={onClick} {...rest} />}
    </>
  )
}

export default Helmet
