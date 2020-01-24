import React, { useEffect, useState, useContext } from "react"
import { Box, Heading, Text } from "grommet"
import Helmet from "./Helmet"
import styled from "styled-components"
import { useHowl } from "rehowl"
import Spinner from "./Spinner"
import AudioContext from "./AudioContext"

const Title = styled(Heading)`
  text-shadow: 0px 1px 3px #000;
`

const SoundboardSound = ({ handleClick, sound }) => {
  const { howl, state, error, load } = useHowl({
    src: sound.files,
    autoplay: false,
  })

  const { currentlyPlaying } = useContext(AudioContext)
  const isPlaying = currentlyPlaying && currentlyPlaying.name === sound.name

  return (
    <Box
      flex="grow"
      onClick={() => handleClick(howl, sound)}
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
        <>
          <Title level={2} margin="none" textAlign="center" color="white">
            {state === "loading" ? (
              <Box animation="pulse">{"..."}</Box>
            ) : (
              sound.title
            )}
          </Title>
        </>
      )}
    </Box>
  )
}

export default SoundboardSound
