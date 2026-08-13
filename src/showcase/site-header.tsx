import { FilamentMark } from '@/components/icons'
import { ReplayButton } from '@/components/replay-button'
import { SignalBars } from '@/showcase/marks'
import { formatUsd } from '@/lib/format'
import type { CostSnapshot } from '@/types'

const NAV = [
  { href: '#thinking', label: '01 Thinking' },
  { href: '#tools', label: '02 Tools' },
  { href: '#stream', label: '03 Stream' },
  { href: '#approval', label: '04 Approval' },
  { href: '#task', label: '05 Task' },
  { href: '#cost', label: '06 Cost' },
]

export function SiteHeader({
  cost,
  live,
  progress,
  onReplay,
}: {
  cost: CostSnapshot
  live: boolean
  progress: number
  onReplay: () => void
}) {
  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-[#f3ece1]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-3">
        <a href="#top" className="flex shrink-0 items-center gap-2 text-cream">
          <FilamentMark />
          <span className="font-display text-[22px] italic leading-none">Filament</span>
        </a>
        <nav className="hidden items-center gap-4 xl:flex">
          {NAV.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="font-mono text-[10px] uppercase tracking-wider text-dust hover:text-copper-bright"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex min-w-0 items-center gap-3 font-mono text-[11px]">
          <SignalBars live={live} />
          <span className={live ? 'text-copper-bright' : 'text-dust'}>
            {live ? 'LIVE' : 'IDLE'}
          </span>
          <span className="tabular text-fog">{formatUsd(cost.usd)}</span>
          <ReplayButton onClick={onReplay} size="sm" />
          <a
            href="#kit"
            className="hidden border border-copper/60 px-2.5 py-1 text-[10px] uppercase tracking-wider text-copper-bright hover:bg-copper hover:text-paper sm:inline-flex"
          >
            Steal the kit
          </a>
        </div>
      </div>
      <div className="h-[2px] bg-line/70">
        <div
          className="h-full bg-copper transition-[width] duration-200 ease-out"
          style={{ width: `${Math.min(100, Math.max(0, progress * 100))}%` }}
        />
      </div>
    </header>
  )
}
