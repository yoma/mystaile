import { useMemo, useRef, useState, type ChangeEvent } from 'react'
import { filterLooks } from './data/looks'
import type { Budget, Intent, Occasion, View } from './types'
import { DetailView } from './views/DetailView'
import { IntentView } from './views/IntentView'
import { LooksView } from './views/LooksView'
import { PhotoView } from './views/PhotoView'
import { StartView } from './views/StartView'
import './App.css'

export default function App() {
  const inputRef = useRef<HTMLInputElement>(null)
  const [view, setView] = useState<View>('start')
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [intent, setIntent] = useState<Intent>({
    occasion: null,
    budget: null,
  })
  const [lookIndex, setLookIndex] = useState(0)
  const [likedIds, setLikedIds] = useState<string[]>([])
  const [activeLookId, setActiveLookId] = useState<string | null>(null)

  const looks = useMemo(() => {
    if (!intent.occasion || !intent.budget) return []
    return filterLooks(intent.occasion, intent.budget)
  }, [intent])

  const activeLook = looks.find((look) => look.id === activeLookId) ?? null

  function openPicker() {
    inputRef.current?.click()
  }

  function onFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    if (previewUrl) URL.revokeObjectURL(previewUrl)

    const url = URL.createObjectURL(file)
    setPreviewUrl(url)
    setFileName(file.name)
    setView('photo')
  }

  function resetToStart() {
    if (previewUrl) URL.revokeObjectURL(previewUrl)
    setPreviewUrl(null)
    setFileName(null)
    setIntent({ occasion: null, budget: null })
    setLookIndex(0)
    setLikedIds([])
    setActiveLookId(null)
    setView('start')
    if (inputRef.current) inputRef.current.value = ''
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
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={onFileChange}
      />

      {view === 'start' && <StartView onStart={openPicker} />}

      {view === 'photo' && previewUrl && (
        <PhotoView
          previewUrl={previewUrl}
          fileName={fileName}
          onChangePhoto={openPicker}
          onContinue={() => setView('intent')}
          onBack={resetToStart}
        />
      )}

      {view === 'intent' && (
        <IntentView
          intent={intent}
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
