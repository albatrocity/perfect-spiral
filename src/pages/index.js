import React, { useState } from "react"
import { Link } from "gatsby"
import theme from "../components/theme"
import { useStaticQuery, graphql } from "gatsby"
import { Box, Layer, Heading, Text, Anchor } from "grommet"
import styled from "styled-components"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Soundboard from "../components/Soundboard"
import ThemePicker from "../components/ThemePicker"
import Helmet from "../components/Helmet"

const Container = styled(Box)`
  background-repeat: repeat;
  background-size: auto;
`

const TeamContainer = styled(Box)`
  max-width: 60px;
  position: absolute;
  top: 10px;
  left: 10px;
  z-index: 20;
`

const IndexPage = () => {
  const [activeTheme, setTheme] = useState(theme)

  const data = useStaticQuery(graphql`
    query {
      background: file(relativePath: { eq: "grass.png" }) {
        childImageSharp {
          fixed(width: 34) {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  const teamNotChosen = theme === activeTheme
  const teamName = activeTheme.global.team
  return (
    <Layout theme={activeTheme}>
      <SEO title={teamName ? `Go ${teamName}!` : "Choose Your Team"} />
      <TeamContainer>
        <Helmet team={activeTheme.team} onClick={() => setTheme(theme)} />
      </TeamContainer>
      <Container
        justify="between"
        fill
        background={{
          image: `url(${data.background.childImageSharp.fixed.src})`,
        }}
      >
        {teamNotChosen && (
          <Layer background="blue">
            <Box pad="medium" fill justify="center" background="transparent">
              <Heading level={1} textAlign="center" color="white">
                Choose your team
              </Heading>
              <ThemePicker onChange={setTheme} />
            </Box>
          </Layer>
        )}
        <Soundboard />
        <Box>
          <Text color="white">
            <Link style={{ color: "white" }} to="/privacy">
              Privacy/Terms
            </Link>
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}

export default IndexPage
