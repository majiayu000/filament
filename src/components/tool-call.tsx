import { IconBolt, IconCheck, IconClock, IconX } from '@/components/icons'
import { cn } from '@/lib/cn'
import { formatMs } from '@/lib/format'
import type { ToolCall, ToolStatus } from '@/types'

const STATUS_LABEL: Record<ToolStatus, string> = {
  queued: 'queued',
  running: 'running',
  success: 'ok',
  error: 'error',
  denied: 'denied',
}

function StatusMark({ status }: { status: ToolStatus }) {
  if (status === 'success') return <IconCheck className="h-3 w-3" />
  if (status === 'error' || status === 'denied') return <IconX className="h-3 w-3" />
  if (status === 'running') return <IconBolt className="h-3 w-3" />
  return <span className="h-1.5 w-1.5 rounded-full bg-current" />
}

function tone(status: ToolStatus) {
  if (status === 'success') return 'border-sage/40 bg-sage/10 text-sage'
  if (status === 'error' || status === 'denied')
    return 'border-oxide/40 bg-oxide/10 text-oxide'
  if (status === 'running') return 'border-copper/50 bg-copper/10 text-copper-bright'
  return 'border-line bg-raised text-dust'
}

export function ToolCallChip({ tool, className }: { tool: ToolCall; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 border px-2 py-1 font-mono text-[11px]',
        tone(tool.status),
        className,
      )}
    >
      <StatusMark status={tool.status} />
      <span>{tool.name}</span>
      <span className="text-current/70">
        {tool.status === 'running'
          ? '…'
          : tool.ms
            ? formatMs(tool.ms)
            : STATUS_LABEL[tool.status]}
      </span>
    </span>
  )
}

export function ToolCallRow({
  tools,
  className,
}: {
  tools: ToolCall[]
  className?: string
}) {
  return (
    <div className={cn('flex flex-wrap gap-1.5', className)}>
      {tools.map((tool) => (
        <ToolCallChip key={tool.id} tool={tool} />
      ))}
    </div>
  )
}

export function ToolCallCard({
  tool,
  className,
}: {
  tool: ToolCall
  className?: string
}) {
  const entries = Object.entries(tool.args ?? {})

  return (
    <article className={cn('border border-line bg-paper shadow-inset', className)}>
      <header className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className={cn('inline-flex items-center gap-1.5 font-mono text-[11px]', tone(tool.status), 'border px-1.5 py-0.5')}>
          <StatusMark status={tool.status} />
          {STATUS_LABEL[tool.status]}
        </span>
        <h3 className="font-mono text-[12px] text-cream">{tool.name}</h3>
        <span className="ml-auto inline-flex items-center gap-1 font-mono text-[10px] text-dust">
          <IconClock className="h-3 w-3" />
          {tool.ms ? formatMs(tool.ms) : tool.status === 'running' ? 'live' : '—'}
        </span>
      </header>

      {entries.length > 0 ? (
        <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 px-3 py-2.5 font-mono text-[11px]">
          {entries.map(([key, value]) => (
            <div key={key} className="contents">
              <dt className="text-dust">{key}</dt>
              <dd className="truncate text-fog">{value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {tool.result ? (
        <p className="border-t border-line bg-raised/70 px-3 py-2 font-mono text-[11px] leading-5 text-sage">
          {tool.result}
        </p>
      ) : tool.status === 'running' ? (
        <div className="h-8 border-t border-line">
          <div className="h-full w-2/3 shimmer-bar" />
        </div>
      ) : null}
    </article>
  )
}
