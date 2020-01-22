import React, { useEffect, useState } from "react"
import { Box, Heading, Text } from "grommet"
import styled from "styled-components"

const SoundboardSound = ({ handleClick, sound, sprite, isPlaying }) => {
  return (
    <Box
      flex="grow"
      onClick={() => handleClick(sound.name)}
      align="center"
      basis="30%"
      pad="medium"
      justify="center"
      background={isPlaying ? "brand" : "transparent"}
      fill
    >
      <Heading level={2} textAlign="center">
        {sound.title}
      </Heading>
    </Box>
  )
}

export default SoundboardSound
