import { useEffect, useRef, useState, useCallback } from 'react'

export function useAudio() {
  const audioCtxRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [hasInteracted, setHasInteracted] = useState(false)
  const oscillatorsRef = useRef([])
  const gainNodeRef = useRef(null)

  // Synthesize a simple synthwave chord pad using Web Audio API
  const startSynth = useCallback(() => {
    if (isPlaying) return
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)()
      audioCtxRef.current = ctx

      const masterGain = ctx.createGain()
      masterGain.gain.setValueAtTime(0, ctx.currentTime)
      masterGain.gain.linearRampToValueAtTime(0.06, ctx.currentTime + 2)
      masterGain.connect(ctx.destination)
      gainNodeRef.current = masterGain

      // Synthwave chord: Am7 spread across octaves
      const frequencies = [110, 138.59, 164.81, 220, 261.63, 329.63]
      const oscs = frequencies.map((freq) => {
        const osc = ctx.createOscillator()
        const oscGain = ctx.createGain()
        osc.type = 'sine'
        osc.frequency.value = freq
        oscGain.gain.value = 0.3
        osc.connect(oscGain)
        oscGain.connect(masterGain)
        osc.start()
        return osc
      })

      // Add a slow LFO pulse
      const lfo = ctx.createOscillator()
      const lfoGain = ctx.createGain()
      lfo.frequency.value = 0.2
      lfoGain.gain.value = 0.02
      lfo.connect(lfoGain)
      lfoGain.connect(masterGain.gain)
      lfo.start()

      oscillatorsRef.current = oscs
      setIsPlaying(true)
    } catch (e) {
      console.log('Audio not available:', e)
    }
  }, [isPlaying])

  const stopSynth = useCallback(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(
        0,
        audioCtxRef.current.currentTime + 1
      )
      setTimeout(() => {
        oscillatorsRef.current.forEach((osc) => {
          try {
            osc.stop()
          } catch (e) {}
        })
        setIsPlaying(false)
      }, 1000)
    }
  }, [])

  const toggleAudio = useCallback(() => {
    setHasInteracted(true)
    if (isPlaying) {
      stopSynth()
    } else {
      startSynth()
    }
  }, [isPlaying, startSynth, stopSynth])

  useEffect(() => {
    return () => {
      oscillatorsRef.current.forEach((osc) => {
        try {
          osc.stop()
        } catch (e) {}
      })
    }
  }, [])

  return { isPlaying, toggleAudio, hasInteracted }
}
