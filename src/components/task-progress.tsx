import { cn } from '@/lib/cn'
import type { MachineNode, MachineNodeState } from '@/types'

function nodeTone(state: MachineNodeState) {
  if (state === 'done') return 'border-sage bg-sage text-paper'
  if (state === 'active') return 'border-copper bg-copper text-paper'
  if (state === 'waiting')
    return 'border-dashed border-copper bg-copper/10 text-copper-bright'
  if (state === 'failed') return 'border-oxide bg-oxide text-paper'
  return 'border-line bg-raised text-dust'
}

function connectorTone(from: MachineNodeState) {
  if (from === 'done') return 'bg-sage/70'
  if (from === 'active' || from === 'waiting') return 'bg-copper/60'
  return 'bg-line'
}

export function TaskProgress({
  value,
  label,
  className,
}: {
  value: number
  label?: string
  className?: string
}) {
  const clamped = Math.min(1, Math.max(0, value))
  return (
    <div className={cn('space-y-1.5', className)}>
      <div className="flex items-center justify-between font-mono text-[10px] uppercase tracking-catalog text-dust">
        <span>{label ?? 'Progress'}</span>
        <span className="tabular text-copper-bright">{Math.round(clamped * 100)}%</span>
      </div>
      <div className="h-[3px] w-full bg-line">
        <div
          className="h-full bg-copper transition-[width] duration-300 ease-out"
          style={{ width: `${clamped * 100}%` }}
        />
      </div>
    </div>
  )
}

export function TaskMachine({
  nodes,
  className,
}: {
  nodes: MachineNode[]
  className?: string
}) {
  return (
    <ol className={cn('flex items-center gap-0 overflow-x-auto pb-1', className)}>
      {nodes.map((node, index) => (
        <li key={node.id} className="flex min-w-0 flex-1 items-center last:flex-none last:pr-1">
          <div className="flex flex-col items-center gap-1.5">
            <span
              className={cn(
                'flex h-6 w-6 items-center justify-center border font-mono text-[10px]',
                nodeTone(node.state),
                node.state === 'waiting' || node.state === 'active'
                  ? 'animate-filament-pulse'
                  : '',
              )}
            >
              {index + 1}
            </span>
            <span
              className={cn(
                'font-mono text-[9px] uppercase tracking-wider',
                node.state === 'idle' ? 'text-dust/70' : 'text-fog',
              )}
            >
              {node.label}
            </span>
          </div>
          {index < nodes.length - 1 ? (
            <span
              className={cn(
                'mb-5 h-px min-w-3 flex-1',
                connectorTone(node.state),
              )}
            />
          ) : null}
        </li>
      ))}
    </ol>
  )
}
