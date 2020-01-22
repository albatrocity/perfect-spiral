import React, { useEffect } from "react"
import { Box } from "grommet"

const SoundboardSound = ({ handleClick, sound, sprite, isPlaying }) => {
  return (
    <Box
      flex="grow"
      onClick={() => handleClick(sound.name)}
      align="center"
      basis="30%"
      pad="medium"
      justify="center"
      background={isPlaying ? "brand" : "black"}
      fill
    >
      <h2>{sound.title}</h2>
    </Box>
  )
}

export default SoundboardSound
