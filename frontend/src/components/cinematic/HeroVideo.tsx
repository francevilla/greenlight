import { useCallback, useEffect, useRef, useState } from 'react'

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260328_115001_bcdaa3b4-03de-47e7-ad63-ae3e392c32d4.mp4'

const FADE_MS = 500
const FADE_OUT_AT = 0.55

/**
 * Sfondo video a tutto schermo con fade pilotato in JavaScript.
 *
 * Niente transizioni CSS: ogni fade è un requestAnimationFrame che parte
 * dall'opacità corrente (mai uno scatto da 0), e ogni nuovo fade annulla
 * quello in corso. `fadingOutRef` impedisce che i timeUpdate ripetuti
 * facciano ripartire il fade-out.
 *
 * Ripresa: il video è più alto della finestra e spostato verso l'alto, così
 * la parte alta del fotogramma resta fuori campo e la scena utile è in basso.
 */
export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const fadingOutRef = useRef(false)
  const startedRef = useRef(false)
  const restartRef = useRef<number | null>(null)
  const [failed, setFailed] = useState(false)

  const cancelFade = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current)
      rafRef.current = null
    }
  }, [])

  const fadeTo = useCallback(
    (target: number, duration = FADE_MS) => {
      const video = videoRef.current
      if (!video) return

      cancelFade()

      const from = Number.parseFloat(video.style.opacity || '0')
      const started = performance.now()

      const step = (now: number) => {
        const progress = Math.min((now - started) / duration, 1)
        video.style.opacity = String(from + (target - from) * progress)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(step)
        } else {
          rafRef.current = null
        }
      }

      rafRef.current = requestAnimationFrame(step)
    },
    [cancelFade],
  )

  const startPlayback = useCallback(() => {
    const video = videoRef.current
    if (!video || startedRef.current) return
    startedRef.current = true
    fadingOutRef.current = false
    const playback = video.play()
    if (playback && typeof playback.catch === 'function') {
      playback.catch(() => {
        // Autoplay bloccato (es. risparmio energetico): resta il primo frame.
        setFailed(true)
      })
    }
    fadeTo(1)
  }, [fadeTo])

  const handleTimeUpdate = useCallback(() => {
    const video = videoRef.current
    if (!video || !Number.isFinite(video.duration)) return
    const remaining = video.duration - video.currentTime
    if (remaining > FADE_OUT_AT || fadingOutRef.current) return
    fadingOutRef.current = true
    fadeTo(0)
  }, [fadeTo])

  const handleEnded = useCallback(() => {
    const video = videoRef.current
    if (!video) return
    cancelFade()
    video.style.opacity = '0'
    if (restartRef.current !== null) window.clearTimeout(restartRef.current)
    restartRef.current = window.setTimeout(() => {
      video.currentTime = 0
      const playback = video.play()
      if (playback && typeof playback.catch === 'function') playback.catch(() => undefined)
      fadingOutRef.current = false
      fadeTo(1)
    }, 100)
  }, [cancelFade, fadeTo])

  useEffect(() => {
    return () => {
      cancelFade()
      if (restartRef.current !== null) window.clearTimeout(restartRef.current)
    }
  }, [cancelFade])

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden bg-black"
      aria-hidden="true"
      style={
        failed
          ? {
              background:
                'radial-gradient(120% 80% at 50% 100%, #1c1f1b 0%, #050604 55%, #000 100%)',
            }
          : undefined
      }
    >
      <video
        ref={videoRef}
        className="absolute left-0 w-full object-cover"
        style={{ top: '-17%', height: '117%', opacity: 0 }}
        src={VIDEO_SRC}
        muted
        playsInline
        autoPlay
        preload="auto"
        tabIndex={-1}
        onLoadedData={startPlayback}
        onPlay={() => {
          if (!startedRef.current) startPlayback()
        }}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
        onError={() => setFailed(true)}
      />

      {/* Velo: tiene leggibile il testo bianco sul video. */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 35%, rgba(0,0,0,0.55) 100%)',
        }}
      />
    </div>
  )
}
