import React from "react"
import { Box } from "grommet"

import SoundboardSound from "./SoundboardSound"

const SoundboardRow = ({ sounds, onPlay }) => {
  return (
    <Box direction="row" fill border={{ color: "white", side: "horizontal" }}>
      {sounds.map(x => (
        <SoundboardSound handleClick={onPlay} sound={x} key={x.name} />
      ))}
    </Box>
  )
}

export default SoundboardRow
