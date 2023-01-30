import React, { useContext } from "react"
import { Box, Heading } from "grommet"
import Helmet from "./Helmet"
import styled from "styled-components"
import { useHowl } from "rehowl"
import AudioContext from "./AudioContext"

const Title = styled(Heading)`
  text-shadow: 0px 1px 3px #000;
`
const Container = styled(Box)`
  position: relative;
`
const StyledHelmet = styled(Helmet)`
  z-index: 10;
`

const SoundboardSound = ({ handleClick, sound }) => {
  const { howl, state } = useHowl({
    src: sound.files,
    autoplay: false,
  })

  const { currentlyPlaying, progress } = useContext(AudioContext)
  const isPlaying = currentlyPlaying && currentlyPlaying.name === sound.name

  return (
    <Container
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
        <>
          <Box
            style={{
              zIndex: 1,
              position: "absolute",
              width: `${progress}%`,
              left: 0,
            }}
            align="center"
            alignSelf="start"
            height="100%"
            justify="center"
            background="accent-1"
          />
          <StyledHelmet />
        </>
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
    </Container>
  )
}

export default SoundboardSound
