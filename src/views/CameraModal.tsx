import { useEffect, useRef, useState } from 'react'

interface CameraModalProps {
  onCapture: (file: File) => void
  onPickGallery: () => void
  onClose: () => void
}

type CameraStatus = 'starting' | 'ready' | 'denied' | 'unavailable'

function stopStream(stream: MediaStream | null) {
  stream?.getTracks().forEach((track) => track.stop())
}

async function openCameraStream(): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia({
      video: { facingMode: 'environment' },
      audio: false,
    })
  } catch {
    return navigator.mediaDevices.getUserMedia({ video: true, audio: false })
  }
}

export function CameraModal({
  onCapture,
  onPickGallery,
  onClose,
}: CameraModalProps) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<CameraStatus>('starting')
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [capturing, setCapturing] = useState(false)

  useEffect(() => {
    let cancelled = false

    async function start() {
      if (!navigator.mediaDevices?.getUserMedia) {
        if (cancelled) return
        setStatus('unavailable')
        setErrorMessage(
          'Je browser ondersteunt geen cameratoegang. Kies een foto uit je galerij.',
        )
        return
      }

      try {
        const stream = await openCameraStream()
        if (cancelled) {
          stopStream(stream)
          return
        }

        streamRef.current = stream
        const video = videoRef.current
        if (video) {
          video.srcObject = stream
          await video.play()
        }
        setStatus('ready')
      } catch (error) {
        if (cancelled) return
        const name =
          error instanceof DOMException ? error.name : 'UnknownError'
        if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
          setStatus('denied')
          setErrorMessage(
            'Geen toegang tot de camera. Sta cameratoegang toe in je browser, of kies een foto uit je galerij.',
          )
        } else if (
          name === 'NotFoundError' ||
          name === 'DevicesNotFoundError' ||
          name === 'OverconstrainedError'
        ) {
          setStatus('unavailable')
          setErrorMessage(
            'Geen camera gevonden. Kies een foto uit je galerij om verder te gaan.',
          )
        } else {
          setStatus('unavailable')
          setErrorMessage(
            'De camera kon niet worden geopend. Kies een foto uit je galerij.',
          )
        }
      }
    }

    void start()

    return () => {
      cancelled = true
      stopStream(streamRef.current)
      streamRef.current = null
      const video = videoRef.current
      if (video) video.srcObject = null
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  function handleClose() {
    stopStream(streamRef.current)
    streamRef.current = null
    onClose()
  }

  function handlePickGallery() {
    stopStream(streamRef.current)
    streamRef.current = null
    onPickGallery()
  }

  async function handleShutter() {
    const video = videoRef.current
    if (!video || status !== 'ready' || capturing) return
    if (!video.videoWidth || !video.videoHeight) return

    setCapturing(true)
    try {
      const canvas = document.createElement('canvas')
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight
      const ctx = canvas.getContext('2d')
      if (!ctx) throw new Error('canvas')

      ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

      const blob = await new Promise<Blob | null>((resolve) => {
        canvas.toBlob(resolve, 'image/jpeg', 0.92)
      })
      if (!blob) throw new Error('blob')

      const file = new File([blob], `mystaile-${Date.now()}.jpg`, {
        type: 'image/jpeg',
      })

      stopStream(streamRef.current)
      streamRef.current = null
      onCapture(file)
    } catch {
      setErrorMessage(
        'De foto kon niet worden gemaakt. Probeer opnieuw of kies uit je galerij.',
      )
      setCapturing(false)
    }
  }

  const showFallback = status === 'denied' || status === 'unavailable'

  return (
    <div className="tips-overlay camera-overlay" role="presentation" onClick={handleClose}>
      <div
        className="tips-sheet camera-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby="camera-title"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          className="tips-close"
          onClick={handleClose}
          aria-label="Sluiten"
        >
          <span aria-hidden="true">×</span>
        </button>

        <p className="eyebrow tips-eyebrow">Camera</p>
        <h2 id="camera-title" className="tips-title">
          Maak je foto
        </h2>
        <p className="tips-lede">
          Full-body in beeld, helder licht. Op de computer gebruik je je webcam.
        </p>

        <div className="camera-stage">
          {status === 'starting' && (
            <p className="camera-status">Camera wordt geopend…</p>
          )}

          {showFallback && (
            <div className="camera-fallback" role="alert">
              <p>{errorMessage}</p>
            </div>
          )}

          <video
            ref={videoRef}
            className={`camera-video${status === 'ready' ? ' is-ready' : ''}`}
            playsInline
            muted
            autoPlay
          />
        </div>

        {errorMessage && status === 'ready' && (
          <p className="camera-inline-error" role="alert">
            {errorMessage}
          </p>
        )}

        <div className="tips-actions camera-actions">
          {status === 'ready' && (
            <button
              type="button"
              className="btn btn-dark camera-shutter"
              onClick={() => void handleShutter()}
              disabled={capturing}
            >
              {capturing ? 'Bezig…' : 'Maak foto'}
            </button>
          )}
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handlePickGallery}
          >
            Kies uit galerij
          </button>
        </div>
      </div>
    </div>
  )
}
