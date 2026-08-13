import { useState } from 'react'
import { cn } from '@/lib/cn'
import type { Citation } from '@/types'

export type CiteMark = {
  after: number
  id: string
}

type StreamingTextProps = {
  text: string
  citations: Citation[]
  marks?: CiteMark[]
  visibleCitationIds?: string[]
  streaming?: boolean
  className?: string
}

export function StreamingText({
  text,
  citations,
  marks = [],
  visibleCitationIds,
  streaming = false,
  className,
}: StreamingTextProps) {
  const [openId, setOpenId] = useState<string | null>(null)
  const citationMap = new Map(citations.map((item) => [item.id, item]))
  const visible = new Set(visibleCitationIds ?? citations.map((item) => item.id))

  const pieces: Array<{ type: 'text'; value: string } | { type: 'cite'; id: string }> = []
  let cursor = 0
  for (const mark of marks) {
    if (mark.after > text.length) break
    if (!visible.has(mark.id)) continue
    if (mark.after > cursor) {
      pieces.push({ type: 'text', value: text.slice(cursor, mark.after) })
    }
    pieces.push({ type: 'cite', id: mark.id })
    cursor = mark.after
  }
  if (cursor < text.length) {
    pieces.push({ type: 'text', value: text.slice(cursor) })
  }

  const active = openId ? citationMap.get(openId) : null

  return (
    <div className={cn('relative', className)}>
      <p className="text-[15px] leading-7 text-fog">
        {pieces.map((piece, index) => {
          if (piece.type === 'text') {
            return <span key={`t-${index}`}>{piece.value}</span>
          }
          const citation = citationMap.get(piece.id)
          if (!citation) return null
          return (
            <button
              key={piece.id}
              type="button"
              onClick={() =>
                setOpenId((current) => (current === piece.id ? null : piece.id))
              }
              className={cn(
                'relative -top-[0.55em] mx-0.5 inline-flex h-4 min-w-4 items-center justify-center border px-1 font-mono text-[10px]',
                openId === piece.id
                  ? 'border-copper bg-copper text-ink'
                  : 'border-line bg-raised text-copper-bright hover:border-copper',
              )}
              aria-label={`Source ${citation.index}: ${citation.title}`}
            >
              {citation.index}
            </button>
          )
        })}
        {streaming ? <span className="stream-caret" aria-hidden="true" /> : null}
      </p>

      {active ? (
        <aside className="mt-3 border border-copper/40 bg-raised px-3 py-2.5 shadow-inset">
          <p className="font-mono text-[10px] uppercase tracking-catalog text-copper-bright">
            {active.source}
          </p>
          <p className="mt-1 text-[13px] text-cream">{active.title}</p>
          <p className="mt-1 text-[12px] leading-5 text-fog">{active.snippet}</p>
        </aside>
      ) : null}
    </div>
  )
}
