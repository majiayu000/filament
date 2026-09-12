import { useState } from 'react'
import { IconChevron, IconClock } from '@/components/icons'
import { cn } from '@/lib/cn'
import { formatMs } from '@/lib/format'
import type { ThoughtStep } from '@/types'

type ThinkingTraceProps = {
  title?: string
  steps: ThoughtStep[]
  elapsedMs?: number
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  className?: string
}

export function ThinkingTrace({
  title = 'Reasoning',
  steps,
  elapsedMs,
  defaultOpen = true,
  open,
  onOpenChange,
  className,
}: ThinkingTraceProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen)
  const controlled = open !== undefined
  const expanded = controlled ? open : internalOpen
  const doneCount = steps.filter((step) => step.status === 'done').length
  const active = steps.find((step) => step.status === 'active')
  const total = elapsedMs ?? steps.reduce((sum, step) => sum + (step.ms ?? 0), 0)
  const progress =
    (doneCount + (active ? 0.55 : 0)) / Math.max(steps.length, 1)

  const toggleOpen = () => {
    const next = !expanded
    if (!controlled) setInternalOpen(next)
    onOpenChange?.(next)
  }

  return (
    <section
      className={cn(
        'overflow-hidden border border-line bg-paper shadow-inset',
        className,
      )}
    >
      <button
        type="button"
        onClick={toggleOpen}
        className="flex w-full items-center gap-3 px-3.5 py-2.5 text-left"
        aria-expanded={expanded}
      >
        <span className="relative flex h-4 w-4 items-center justify-center">
          <span className="absolute inset-0 rounded-full bg-copper/20" />
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full bg-copper',
              active ? 'animate-filament-pulse' : '',
            )}
          />
        </span>
        <span className="font-mono text-[11px] uppercase tracking-catalog text-copper-bright">
          {title}
        </span>
        <span className="ml-auto flex items-center gap-3 font-mono text-[11px] text-dust">
          <span className="inline-flex items-center gap-1">
            <IconClock className="h-3.5 w-3.5" />
            {formatMs(total)}
          </span>
          <span>
            {doneCount}/{steps.length}
          </span>
          <IconChevron
            className={cn(
              'h-3.5 w-3.5 transition-transform',
              expanded ? 'rotate-180' : '',
            )}
          />
        </span>
      </button>

      {expanded ? (
        <ol className="relative border-t border-line/80 px-3.5 py-3">
          <svg
            className="pointer-events-none absolute left-[19px] top-3 h-[calc(100%-24px)] w-4"
            viewBox="0 0 16 200"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <path
              d="M8 0 C 14 30, 2 60, 8 100 S 14 160, 8 200"
              fill="none"
              stroke="#e0d2bd"
              strokeWidth="1.2"
            />
            <path
              d="M8 0 C 14 30, 2 60, 8 100 S 14 160, 8 200"
              fill="none"
              stroke="#c56a2d"
              strokeWidth="1.4"
              strokeDasharray="320"
              strokeDashoffset={320 * (1 - progress)}
              style={{ transition: 'stroke-dashoffset 400ms ease' }}
            />
          </svg>
          {steps.map((step) => (
            <li key={step.id} className="relative flex gap-3 pb-3 last:pb-0">
              <span
                className={cn(
                  'relative z-[1] mt-1 h-2 w-2 shrink-0 rounded-full border',
                  step.status === 'done' && 'border-sage bg-sage',
                  step.status === 'active' &&
                    'border-copper bg-copper animate-filament-pulse',
                  step.status === 'queued' && 'border-line bg-raised',
                )}
              />
              <div className="min-w-0 flex-1">
                <p
                  className={cn(
                    'text-[13px] leading-5',
                    step.status === 'queued' ? 'text-dust/70' : 'text-fog',
                    step.status === 'active' ? 'text-cream' : '',
                  )}
                >
                  {step.text}
                </p>
                {step.status !== 'queued' && step.ms ? (
                  <p className="mt-1 font-mono text-[10px] uppercase tracking-wider text-dust">
                    {step.status === 'active' ? 'now' : formatMs(step.ms)}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      ) : (
        <p className="border-t border-line/80 px-3.5 py-2 font-mono text-[11px] text-dust">
          {active?.text ?? steps.at(-1)?.text}
        </p>
      )}
    </section>
  )
}
