import React, { useEffect, useState, createContext, useRef } from "react"
import { Box, Heading } from "grommet"
import SoundboardRow from "./SoundboardRow"
import Spinner from "./Spinner"
import { useHowl, Play } from "rehowl"
import sounds from "../lib/sounds"
import chunkArray from "../lib/chunkArray"
import { head, last } from "lodash/fp"
import { Howler } from "howler"
import AudioContext from "./AudioContext"

Howler.autoSuspend = false
Howler.autoUnlock = true
const { ctx } = Howler

const SOUNDS_PER_ROW = 2

const mainSounds = sounds.slice(1, -1)

const Soundboard = () => {
  const [audioFile, setAudioFile] = useState()
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false)
  const [activeHowl, setActiveHowl] = useState(null)

  Howler.ctx && Howler.ctx.resume()

  const handlePlay = async (howl, sound) => {
    if (currentlyPlaying && currentlyPlaying.name === sound.name) {
      setCurrentlyPlaying(null)
    } else {
      if (Howler.ctx && Howler.ctx.state === "interrupted") {
        await ctx.resume()
      }
      setActiveHowl(howl)
      setCurrentlyPlaying(sound)
    }
  }

  return (
    <AudioContext.Provider value={{ currentlyPlaying }}>
      <Box fill>
        <SoundboardRow
          key={`row-touchdown-1`}
          sounds={[head(sounds)]}
          onPlay={handlePlay}
        />
        {chunkArray(mainSounds, SOUNDS_PER_ROW).map((x, i) => (
          <SoundboardRow key={`row-${i}`} sounds={x} onPlay={handlePlay} />
        ))}
        <SoundboardRow
          key={`row-touchdown-2`}
          sounds={[last(sounds)]}
          onPlay={handlePlay}
        />
        <Play stop={!currentlyPlaying} howl={activeHowl} />
      </Box>
    </AudioContext.Provider>
  )
}

export default Soundboard
