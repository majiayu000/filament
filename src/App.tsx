import { useMemo, useState } from 'react'
import { useRun } from '@/lib/use-run'
import { Catalog } from '@/showcase/catalog'
import { ComponentWall } from '@/showcase/component-wall'
import { Hero } from '@/showcase/hero'
import { FilamentRail } from '@/showcase/marks'
import { SiteFooter } from '@/showcase/site-footer'
import { SiteHeader } from '@/showcase/site-header'
import type { ApprovalDecision } from '@/types'

export default function App() {
  const { snapshot, playing, replay, pause, resume } = useRun({ auto: true })
  const [override, setOverride] = useState<ApprovalDecision | null>(null)

  const view = useMemo(() => {
    if (!override) return snapshot
    return { ...snapshot, approvalDecision: override, approvalVisible: true }
  }, [override, snapshot])

  return (
    <div id="top" className="site-bg min-h-screen">
      <div className="grain" />
      <FilamentRail />
      <SiteHeader
        cost={view.cost}
        live={view.live}
        progress={view.progress}
        onReplay={() => {
          setOverride(null)
          replay()
        }}
      />
      <main>
        <Hero
          snapshot={view}
          playing={playing}
          onReplay={() => {
            setOverride(null)
            replay()
          }}
          onPause={pause}
          onResume={resume}
          onDecide={setOverride}
        />
        <ComponentWall />
        <Catalog />
      </main>
      <SiteFooter />
    </div>
  )
}
