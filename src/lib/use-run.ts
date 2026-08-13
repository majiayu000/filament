import { useEffect, useMemo, useRef, useState } from 'react'
import { RUN_DURATION } from '@/data/script'
import { snapshotAt, type RunSnapshot } from '@/lib/run-player'

type Options = {
  auto?: boolean
}

export function useRun(options: Options = {}) {
  const auto = options.auto ?? true
  const [elapsed, setElapsed] = useState(0)
  const [playing, setPlaying] = useState(auto)
  const [epoch, setEpoch] = useState(0)
  const elapsedRef = useRef(0)
  elapsedRef.current = elapsed

  useEffect(() => {
    if (!playing) return undefined
    const origin = performance.now() - elapsedRef.current
    const id = window.setInterval(() => {
      const next = performance.now() - origin
      if (next >= RUN_DURATION) {
        setElapsed(RUN_DURATION)
        setPlaying(false)
        return
      }
      setElapsed(next)
    }, 50)
    return () => window.clearInterval(id)
  }, [playing, epoch])

  const snapshot: RunSnapshot = useMemo(() => snapshotAt(elapsed), [elapsed])

  return {
    snapshot,
    playing,
    replay() {
      setElapsed(0)
      setEpoch((value) => value + 1)
      setPlaying(true)
    },
    pause() {
      setPlaying(false)
    },
    resume() {
      if (elapsedRef.current >= RUN_DURATION) {
        setElapsed(0)
        setEpoch((value) => value + 1)
      }
      setPlaying(true)
    },
  }
}
