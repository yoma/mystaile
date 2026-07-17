import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { filterLooks } from './data/looks'
import type { Audience, Budget, Intent, Occasion, View } from './types'
import { CameraModal } from './views/CameraModal'
import { DetailView } from './views/DetailView'
import { IntentView } from './views/IntentView'
import { LooksView } from './views/LooksView'
import { PhotoView } from './views/PhotoView'
import { StartView } from './views/StartView'
import './App.css'

export default function App() {
  const galleryInputRef = useRef<HTMLInputElement>(null)
  const [view, setView] = useState<View>('start')
  const [cameraOpen, setCameraOpen] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [intent, setIntent] = useState<Intent>({
    audience: null,
    occasion: null,
    budget: null,
  })
  const [lookIndex, setLookIndex] = useState(0)
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [activeLookId, setActiveLookId] = useState<string | null>(null)

  const looks = useMemo(() => {
    if (!intent.audience || !intent.occasion || !intent.budget) return []
    return filterLooks(intent.audience, intent.occasion, intent.budget)
  }, [intent])

  const activeLook = looks.find((look) => look.id === activeLookId) ?? null

  function openCamera() {
    setCameraOpen(true)
  }

  function openGallery() {
    setCameraOpen(false)
    galleryInputRef.current?.click()
  }

  function applyPhotoFile(file: File) {
    if (previewUrl) URL.revokeObjectURL(previewUrl)

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setFileName(file.name)
    setCameraOpen(false)
    setView('photo')
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    applyPhotoFile(file)
  }

  function resetToStart() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName(null)
    setIntent({ audience: null, occasion: null, budget: null })
    setLookIndex(0)
    setLikedIds([])
    setActiveLookId(null)
    setCameraOpen(false)
    setView('start')
    if (galleryInputRef.current) galleryInputRef.current.value = ''
  }

  function goLooks() {
    setLookIndex(0)
    setLikedIds([])
    setView('looks')
  }

  function nextLook() {
    setLookIndex((current) => current + 1)
  }

  function likeLook() {
    const look = looks[lookIndex]
    if (look && !likedIds.includes(look.id)) {
      setLikedIds((ids) => [...ids, look.id])
    }
    nextLook()
  }

  return (
    <>
      <input
        ref={galleryInputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onFileChange}
      />

      {view === 'start' && (
        <StartView onTakePhoto={openCamera} onPickPhoto={openGallery} />
      )}

      {cameraOpen && (
        <CameraModal
          onCapture={applyPhotoFile}
          onPickGallery={openGallery}
          onClose={() => setCameraOpen(false)}
        />
      )}

      {view === 'photo' && previewUrl && (
        <PhotoView
          previewUrl={previewUrl}
          fileName={fileName}
          onChangePhoto={openGallery}
          onContinue={() => setView('intent')}
          onBack={resetToStart}
        />
      )}

      {view === 'intent' && (
        <IntentView
          intent={intent}
          onAudience={(audience: Audience) =>
            setIntent((prev) => ({ ...prev, audience }))
          }
          onOccasion={(occasion: Occasion) =>
            setIntent((prev) => ({ ...prev, occasion }))
          }
          onBudget={(budget: Budget) =>
            setIntent((prev) => ({ ...prev, budget }))
          }
          onContinue={goLooks}
          onBack={() => setView(previewUrl ? 'photo' : 'start')}
        />
      )}

      {view === 'looks' && (
        <LooksView
          looks={looks}
          index={lookIndex}
          likedCount={likedIds.length}
          userPhoto={previewUrl}
          onSkip={nextLook}
          onLike={likeLook}
          onOpen={() => {
            const look = looks[lookIndex]
            if (!look) return
            setActiveLookId(look.id)
            setView('detail')
          }}
          onBack={() => setView('intent')}
        />
      )}

      {view === 'detail' && activeLook && (
        <DetailView look={activeLook} onBack={() => setView('looks')} />
      )}
    </>
  )
}
