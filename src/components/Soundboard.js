import React, { useEffect, useState } from "react"
import { Box, Heading } from "grommet"
import SoundboardRow from "./SoundboardRow"
import Spinner from "./Spinner"
import { useAudioPlayer } from "@rossbrown/react-use-audio-player"
import sounds from "../lib/sounds"
import chunkArray from "../lib/chunkArray"
import { head, last } from "lodash/fp"
import { Howl, Howler } from "howler"

Howler.autoSuspend = false
Howler.autoUnlock = true

const SOUNDS_PER_ROW = 2

const allSprites = sounds.reduce((out, x) => {
  out[x.name] = x.sprite
  return out
}, {})

const mainSounds = sounds.slice(1, -1)

const Soundboard = () => {
  const {
    play,
    stop,
    pause,
    ready,
    loading,
    playing,
    stopped,
    seek,
  } = useAudioPlayer({
    src: "https://football-soundboard.s3.amazonaws.com/all.mp3",
    format: "mp3",
    autoplay: false,
    sprite: allSprites,
  })

  const [suspended, setSuspended] = useState(false)

  useEffect(() => {
    document.addEventListener(
      "visibilitychange",
      e => {
        const { ctx } = Howler
        if (document.visibilityState === "visible") {
          Howler._unlockAudio()
          ctx.resume()
        }
      },
      false
    )
  }, [])

  const [currentlyPlaying, setCurrentlyPlaying] = useState(false)

  const handlePlay = sprite => {
    if (sprite === currentlyPlaying) {
      stop()
    } else {
      pause()
      setCurrentlyPlaying(sprite)
      seek(0)
      play(sprite)
      setCurrentlyPlaying(sprite)
    }
  }

  useEffect(() => {
    if (stopped) {
      setCurrentlyPlaying(null)
    }
  }, [stopped])

  if (loading)
    return (
      <Box
        fill
        direction="column"
        pad="medium"
        justify="center"
        animation="pulse"
        gap="small"
      >
        <Spinner color="white" />
        <Heading
          level={1}
          color="white"
          margin={{ horizontal: "auto", vertical: "none" }}
          textAlign="center"
        >
          Loading songs. Turn off silent mode.
        </Heading>
      </Box>
    )

  return (
    <Box fill>
      <SoundboardRow
        key={`row-touchdown-1`}
        sounds={[head(sounds)]}
        sprite={allSprites}
        playing={playing}
        onPlay={handlePlay}
        onStop={stop}
        currentlyPlaying={currentlyPlaying}
      />
      {chunkArray(mainSounds, SOUNDS_PER_ROW).map((x, i) => (
        <SoundboardRow
          key={`row-${i}`}
          sounds={x}
          sprite={allSprites}
          playing={playing}
          onPlay={handlePlay}
          onStop={stop}
          currentlyPlaying={currentlyPlaying}
        />
      ))}
      <SoundboardRow
        key={`row-touchdown-2`}
        sounds={[last(sounds)]}
        sprite={allSprites}
        playing={playing}
        onPlay={handlePlay}
        onStop={stop}
        currentlyPlaying={currentlyPlaying}
      />
    </Box>
  )
}

export default Soundboard
