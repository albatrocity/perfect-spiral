import React, { useEffect, useState } from "react"
import { Box, Heading, Text } from "grommet"
import Helmet from "./Helmet"
import styled from "styled-components"

const Title = styled(Heading)`
  text-shadow: 0px 1px 3px #000;
`

const SoundboardSound = ({ handleClick, sound, sprite, isPlaying }) => {
  return (
    <Box
      flex="grow"
      onClick={() => handleClick(sound)}
      align="center"
      basis="30%"
      pad="small"
      justify="center"
      focusIndicator={false}
      background={isPlaying ? "brand" : "transparent"}
      fill
    >
      {isPlaying ? (
        <Helmet />
      ) : (
        <Title level={2} margin="none" textAlign="center" color="white">
          {sound.title}
        </Title>
      )}
    </Box>
  )
}

export default SoundboardSound
