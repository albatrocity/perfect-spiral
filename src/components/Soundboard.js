import React, { useEffect, useState, useRef, useCallback } from "react"
import { Box } from "grommet"
import { trackCustomEvent } from "gatsby-plugin-google-analytics"
import SoundboardRow from "./SoundboardRow"
import { Play } from "rehowl"
import sounds from "../lib/sounds"
import chunkArray from "../lib/chunkArray"
import { head, last } from "lodash/fp"
import { Howler } from "howler"
import AudioContext from "./AudioContext"

Howler.autoSuspend = false
Howler.autoUnlock = true

const SOUNDS_PER_ROW = 2

const mainSounds = sounds.slice(1, -1)

const Soundboard = () => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false)
  const [activeHowl, setActiveHowl] = useState(null)
  const [progress, setProgress] = useState(0)
  const animationRef = useRef()

  // Recover from interrupted audio context on visibilitychange
  Howler.ctx && Howler.ctx.resume()

  const handlePlay = async (howl, sound) => {
    if (currentlyPlaying && currentlyPlaying.name === sound.name) {
      setCurrentlyPlaying(null)
    } else {
      if (Howler.ctx && Howler.ctx.state === "interrupted") {
        await Howler.ctx.resume()
      }
      trackCustomEvent({
        category: "Soundboard",
        action: "play",
        label: sound.title,
      })
      setActiveHowl(howl)
      setCurrentlyPlaying(sound)
    }
  }

  const setPosition = useCallback(() => {
    if (activeHowl.playing()) {
      setProgress((activeHowl.seek() / activeHowl.duration()) * 100)
    }
    if (currentlyPlaying) {
      getPosition()
    } else {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [activeHowl, setProgress, currentlyPlaying])

  const getPosition = useCallback(() => {
    animationRef.current = requestAnimationFrame(setPosition)
  }, [setPosition])

  useEffect(() => {
    if (activeHowl) {
      getPosition()
    }
  }, [activeHowl, getPosition])

  return (
    <AudioContext.Provider value={{ currentlyPlaying, progress }}>
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
        <Play
          onEnd={() => setCurrentlyPlaying(null)}
          stop={!currentlyPlaying}
          howl={activeHowl}
        />
      </Box>
    </AudioContext.Provider>
  )
}

export default Soundboard
