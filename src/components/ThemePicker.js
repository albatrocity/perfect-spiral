import React, { useState } from "react"
import { Box, Text } from "grommet"
import Helmet from "./Helmet"
import baseTheme from "./theme"

const ThemePicker = ({ onChange }) => {
  const themes = {
    chiefs: {
      color: "#E31837",
      team: "Chiefs",
    },
    fourtyNiners: {
      color: "#AA0000",
      team: "49ers",
    },
  }

  const teams = [
    { label: "Chiefs", value: "chiefs" },
    { label: "49ers", value: "fourtyNiners" },
  ]

  const handleChange = team => {
    const merged = {
      ...baseTheme,
      global: {
        ...baseTheme.global,
        name: team,
        team: themes[team].team,
        colors: {
          ...baseTheme.global.colors,
          brand: themes[team].color,
        },
      },
    }
    onChange(merged)
  }

  return (
    <Box width="large" direction="row" align="center" justify="center">
      {teams.map(team => (
        <Box key={team.value}>
          <Helmet
            team={team.value}
            onClick={() => handleChange(team.value)}
            alt={team.label}
            title={team.label}
          />
        </Box>
      ))}
    </Box>
  )
}

export default ThemePicker
