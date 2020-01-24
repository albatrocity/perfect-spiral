import React, { useEffect, useState } from "react"
import { Box, Heading } from "grommet"
import SoundboardRow from "./SoundboardRow"
import Spinner from "./Spinner"
import { useAudioPlayer } from "@rossbrown/react-use-audio-player"
import sounds from "../lib/sounds"
import chunkArray from "../lib/chunkArray"
import { head, last } from "lodash/fp"
import { Howler } from "howler"

Howler.autoSuspend = false
Howler.autoUnlock = true

const SOUNDS_PER_ROW = 2
const AUDIO_URL = "https://football-soundboard.s3.amazonaws.com/all.mp3"
const BLANK_URL = "https://football-soundboard.s3.amazonaws.com/blank.mp3"

const mainSounds = sounds.slice(1, -1)

const Soundboard = () => {
  const [audioFile, setAudioFile] = useState(head(sounds).files || BLANK_URL)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(false)

  const {
    play,
    stop,
    pause,
    load,
    ready,
    loading,
    playing,
    stopped,
    seek,
    muted,
    volume,
  } = useAudioPlayer()

  const handlePlay = song => {
    console.log(song)
    // stop()
    // setCurrentlyPlaying(song)
    // load({ src: song.files })
    if (playing) {
      console.log("is playing, stop")
      stop()
    } else {
      console.log("not playing")
      load({ src: song.files, autoplay: true })
    }
    // if (sprite === currentlyPlaying) {
    //   stop()
    // } else {
    //   pause()
    //   setCurrentlyPlaying(sprite)
    //   seek(0)
    //   play(sprite)
    //   setCurrentlyPlaying(sprite)
    // }
  }
  console.log("ready", ready)
  //
  // useEffect(() => {
  //   console.log("loading", loading)
  //   console.log("ready", ready)
  //   // if (!loading && ready) {
  //   //   play()
  //   // }
  // }, [loading, ready])

  // if (loading)
  //   return (
  //     <Box
  //       fill
  //       direction="column"
  //       pad="medium"
  //       justify="center"
  //       animation="pulse"
  //       gap="small"
  //     >
  //       <Spinner color="white" />
  //       <Heading
  //         level={1}
  //         color="white"
  //         margin={{ horizontal: "auto", vertical: "none" }}
  //         textAlign="center"
  //       >
  //         Loading songs. Turn off silent mode.
  //       </Heading>
  //     </Box>
  //   )

  return (
    <Box fill>
      <SoundboardRow
        key={`row-touchdown-1`}
        sounds={[head(sounds)]}
        playing={playing}
        onPlay={handlePlay}
        onStop={stop}
        currentlyPlaying={currentlyPlaying}
      />
      {chunkArray(mainSounds, SOUNDS_PER_ROW).map((x, i) => (
        <SoundboardRow
          key={`row-${i}`}
          sounds={x}
          playing={playing}
          onPlay={handlePlay}
          onStop={stop}
          currentlyPlaying={currentlyPlaying}
        />
      ))}
      <SoundboardRow
        key={`row-touchdown-2`}
        sounds={[last(sounds)]}
        playing={playing}
        onPlay={handlePlay}
        onStop={stop}
        currentlyPlaying={currentlyPlaying}
      />
    </Box>
  )
}

export default Soundboard
