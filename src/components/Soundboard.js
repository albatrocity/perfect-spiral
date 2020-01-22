import React, { useEffect, useState } from "react"
import { Box } from "grommet"
import SoundboardRow from "./SoundboardRow"
import Spinner from "./Spinner"
import { useAudioPlayer } from "@rossbrown/react-use-audio-player"
import { useAudioPosition } from "@rossbrown/react-use-audio-player"
import sounds from "../lib/sounds"
import chunkArray from "../lib/chunkArray"

const SOUNDS_PER_ROW = 3

const allSprites = sounds.reduce((out, x) => {
  out[x.name] = x.sprite
  return out
}, {})

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

  const [currentlyPlaying, setCurrentlyPlaying] = useState(false)
  const [progress, setProgress] = useState(0)

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
      <Box fill pad="medium" justify="around">
        <Spinner />
      </Box>
    )

  return (
    <Box justify="between" fill>
      {chunkArray(sounds, 3).map((x, i) => (
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
    </Box>
  )
}

export default Soundboard
