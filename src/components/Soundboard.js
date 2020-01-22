import React, { useEffect, useState } from "react"
import { Box } from "grommet"
import SoundboardRow from "./SoundboardRow"
import { useAudioPlayer } from "@rossbrown/react-use-audio-player"
import { useAudioPosition } from "@rossbrown/react-use-audio-player"
import sounds from "../lib/sounds"
import chunkArray from "../lib/chunkArray"

const SOUNDS_PER_ROW = 3

const sprite = sounds.reduce((out, x) => {
  out[x.name] = x.sprite
  return out
}, {})

const Soundboard = () => {
  const { play, stop, ready, loading, playing } = useAudioPlayer({
    src: "https://football-soundboard.s3.amazonaws.com/Touchdown.mp3",
    format: "mp3",
    autoplay: false,
    sprite,
  })

  const { position, duration } = useAudioPosition()
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false)

  const handlePlay = sprite => {
    setCurrentlyPlaying(sprite)
    play(sprite)
  }

  useEffect(() => {
    if (!playing) {
      setCurrentlyPlaying(null)
    }
  }, [playing])

  if (loading) return <div>Loading audio</div>

  return (
    <Box justify="between" fill>
      {chunkArray(sounds, 3).map((x, i) => (
        <SoundboardRow
          key={`row-${i}`}
          sounds={x}
          sprite={sprite}
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
