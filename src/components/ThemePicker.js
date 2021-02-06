import React, { useState } from "react"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import { Box, Text, Anchor } from "grommet"
import Helmet from "./Helmet"
import baseTheme from "./theme"

const ThemePicker = ({ onChange }) => {
  const themes = {
    chiefs: {
      color: "#E31837",
      accent: "#FFB81C",
      team: "Chiefs",
    },
    buccaneers: {
      color: "#d50a0a",
      accent: "#34302b",
      team: "Buccaneers",
    },
  }

  const teams = [
    { label: "Chiefs", value: "chiefs" },
    { label: "Buccaneers", value: "buccaneers" },
  ]

  const handleChange = (team) => {
    trackCustomEvent({
      category: "Teams",
      action: "choose",
      label: team.label,
    })
    const merged = {
      ...baseTheme,
      global: {
        ...baseTheme.global,
        name: team.value,
        team: themes[team.value].team,
        colors: {
          ...baseTheme.global.colors,
          brand: themes[team.value].color,
          "accent-1": themes[team.value].accent,
        },
      },
    }
    onChange(merged)
  }

  return (
    <Box width="large" direction="row" align="center" justify="center">
      {teams.map((team) => (
        <Box key={team.value} width={{ max: "200px" }}>
          <Helmet
            team={team.value}
            onClick={() => handleChange(team)}
            alt={team.label}
            title={team.label}
          />
        </Box>
      ))}
    </Box>
  )
}

export default ThemePicker
