import { cn } from '@/lib/cn'
import { formatTokens, formatUsd } from '@/lib/format'
import type { CostSnapshot } from '@/types'

function Sparkline({ values }: { values: number[] }) {
  const width = 120
  const height = 36
  const max = Math.max(...values, 1)
  const points = values.map((value, index) => {
    const x = values.length === 1 ? 0 : (index / (values.length - 1)) * width
    const y = height - (value / max) * (height - 4) - 2
    return `${x},${y}`
  })

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="overflow-visible"
      aria-hidden="true"
    >
      <polyline
        fill="none"
        stroke="#c56a2d"
        strokeWidth="1.4"
        points={points.join(' ')}
      />
      <circle
        cx={points.at(-1)?.split(',')[0]}
        cy={points.at(-1)?.split(',')[1]}
        r="2.2"
        fill="#a24e16"
      />
    </svg>
  )
}

export function CostPanel({
  snapshot,
  live = false,
  compact = false,
  className,
}: {
  snapshot: CostSnapshot
  live?: boolean
  compact?: boolean
  className?: string
}) {
  const cells = [
    { label: 'In', value: formatTokens(snapshot.inputTokens) },
    { label: 'Out', value: formatTokens(snapshot.outputTokens) },
    { label: 'Cache', value: formatTokens(snapshot.cachedTokens) },
  ]

  return (
    <section className={cn('border border-line bg-paper shadow-inset', className)}>
      <header className="flex items-center justify-between border-b border-line px-3 py-2">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[10px] uppercase tracking-catalog text-dust">
            Cost
          </span>
          <span className="font-mono text-[11px] text-fog">{snapshot.model}</span>
        </div>
        <span
          className={cn(
            'font-mono text-[10px] uppercase tracking-wider',
            live ? 'text-copper-bright' : 'text-dust',
          )}
        >
          {live ? 'live' : 'settled'}
        </span>
      </header>

      <div className={cn('grid gap-3 px-3 py-3', compact ? 'grid-cols-1' : 'grid-cols-[1fr_auto]')}>
        <div>
          <p className="font-display text-[40px] leading-none tracking-[-0.03em] text-cream tabular">
            {formatUsd(snapshot.usd)}
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2">
            {cells.map((cell) => (
              <div key={cell.label}>
                <p className="font-mono text-[9px] uppercase tracking-catalog text-dust">
                  {cell.label}
                </p>
                <p className="mt-0.5 font-mono text-[12px] text-fog tabular">{cell.value}</p>
              </div>
            ))}
          </div>
        </div>
        {!compact ? (
          <div className="flex items-end">
            <Sparkline values={snapshot.series} />
          </div>
        ) : null}
      </div>
    </section>
  )
}
