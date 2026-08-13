import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

export function FilamentRail() {
  return (
    <svg
      className="pointer-events-none fixed left-[18px] top-0 z-[5] hidden h-full w-10 lg:block"
      viewBox="0 0 40 900"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        className="filament-draw"
        d="M20 0 C 32 70, 8 140, 20 210 S 34 340, 20 420 S 6 560, 20 640 S 32 780, 20 900"
        fill="none"
        stroke="#c56a2d"
        strokeWidth="1.15"
        opacity="0.55"
      />
    </svg>
  )
}

export function CropFrame({
  children,
  className,
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <div className={cn('relative', className)}>
      <span className="crop-tick tl" />
      <span className="crop-tick tr" />
      <span className="crop-tick bl" />
      <span className="crop-tick br" />
      {children}
    </div>
  )
}

export function SignalBars({ live }: { live: boolean }) {
  const delays = ['0ms', '120ms', '40ms', '200ms', '80ms', '160ms', '30ms']
  return (
    <span
      className={cn('inline-flex h-3 items-end gap-px', live ? '' : 'opacity-30')}
      aria-hidden="true"
    >
      {delays.map((delay, index) => (
        <span
          key={delay}
          className="signal-bar"
          style={{
            height: `${8 + ((index * 5) % 12)}px`,
            animationDelay: live ? delay : undefined,
            animationPlayState: live ? 'running' : 'paused',
          }}
        />
      ))}
    </span>
  )
}
