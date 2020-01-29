import React from "react"
import { Link } from "gatsby"
import { Box, Heading, Paragraph, Text, Anchor } from "grommet"
import theme from "../components/theme"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SecondPage = () => (
  <Layout theme={theme}>
    <SEO title="Privacy Policy/Terms of Use" />
    <Box pad="medium">
      <Heading level={1}>Privacy/Terms</Heading>
      <Paragraph>
        In short, we're using Google Analytics to track basic stuff, like your
        general location and if you've been here before. We also track how many
        times a song is played and which team is chosen. We do this for our own
        personal enjoyment and curiosity. We will never sell your personal
        information or disclose it to third parties.
      </Paragraph>
      <Box>
        <Text>
          <Anchor
            target="_blank"
            href="https://app.termly.io/document/cookie-policy/06dd3879-9259-493c-bf2e-f6e7e7246ac2"
          >
            Privacy Policy
          </Anchor>
        </Text>
        <Text>
          <Anchor
            href="https://app.termly.io/document/terms-of-use-for-website/6542c099-88da-4ad3-ba31-0c22322809a9"
            target="_blank"
          >
            Terms of Use
          </Anchor>
        </Text>
      </Box>
      <Box margin={{ vertical: "medium" }}>
        <Text>
          <Link to="/">Return to the field</Link>
        </Text>
      </Box>
    </Box>
  </Layout>
)

export default SecondPage
