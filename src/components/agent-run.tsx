import { ApprovalCard } from '@/components/approval-card'
import { CostPanel } from '@/components/cost-panel'
import { IconPause, IconPlay } from '@/components/icons'
import { ReplayButton } from '@/components/replay-button'
import { StreamingText } from '@/components/streaming-text'
import { TaskMachine, TaskProgress } from '@/components/task-progress'
import { ThinkingTrace } from '@/components/thinking-trace'
import { ToolCallCard, ToolCallRow } from '@/components/tool-call'
import { AGENT_NAME, APPROVAL, CITE_MARKS, CITATIONS, RUN_ID } from '@/data/script'
import { cn } from '@/lib/cn'
import { formatClock } from '@/lib/format'
import { SignalBars } from '@/showcase/marks'
import type { RunSnapshot } from '@/lib/run-player'
import type { ApprovalDecision } from '@/types'

type AgentRunProps = {
  snapshot: RunSnapshot
  playing: boolean
  onReplay: () => void
  onPause: () => void
  onResume: () => void
  onDecide?: (decision: ApprovalDecision) => void
  className?: string
}

export function AgentRun({
  snapshot,
  playing,
  onReplay,
  onPause,
  onResume,
  onDecide,
  className,
}: AgentRunProps) {
  const visibleTools = snapshot.tools.filter((tool) => tool.status !== 'queued')
  const featured = [...visibleTools].reverse().find(Boolean)

  return (
    <section className={cn('border border-line bg-paper shadow-panel', className)}>
      <div className="h-[3px] bg-gradient-to-r from-copper via-copper-dim to-transparent" />
      <header className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-line px-3.5 py-2.5 hairline">
        <SignalBars live={snapshot.live} />
        <span className="font-mono text-[10px] uppercase tracking-catalog text-copper-bright">
          Plate {RUN_ID}
        </span>
        <span className="text-line">/</span>
        <span className="font-mono text-[10px] uppercase tracking-wider text-dust">
          {AGENT_NAME}
        </span>
        <span className="ml-auto flex items-center gap-2 font-mono text-[11px] text-dust sm:gap-3">
          <span className="tabular">{formatClock(snapshot.elapsedMs)}</span>
          <span className={snapshot.live ? 'text-copper-bright' : 'text-sage'}>
            {snapshot.live ? 'live' : 'settled'}
          </span>
          <button
            type="button"
            onClick={playing ? onPause : onResume}
            className="inline-flex items-center gap-1 border border-line px-2 py-1 text-[10px] uppercase tracking-wider text-fog hover:border-copper hover:text-copper-bright"
          >
            {playing ? <IconPause className="h-3 w-3" /> : <IconPlay className="h-3 w-3" />}
            {playing ? 'Pause' : 'Resume'}
          </button>
          <ReplayButton onClick={onReplay} size="sm" />
        </span>
      </header>

      <div className="grid gap-3 overflow-hidden p-3.5 lg:grid-cols-[1.15fr_0.85fr]">
        <div className="space-y-3">
          <ThinkingTrace
            steps={snapshot.thoughts}
            elapsedMs={Math.min(snapshot.elapsedMs, 4200)}
            open={snapshot.thinkingOpen || snapshot.elapsedMs < 5000}
          />
          {visibleTools.length > 0 ? <ToolCallRow tools={visibleTools} /> : null}
          {featured ? <ToolCallCard tool={featured} /> : null}
          {snapshot.streamText ? (
            <div className="border border-line bg-raised/70 px-3.5 py-3">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-catalog text-dust">
                Answer
              </p>
              <StreamingText
                text={snapshot.streamText}
                citations={CITATIONS}
                marks={[...CITE_MARKS]}
                visibleCitationIds={snapshot.citationsVisible}
                streaming={!snapshot.streamDone}
              />
            </div>
          ) : null}
        </div>

        <div className="space-y-3">
          <TaskProgress
            value={snapshot.progress}
            label={
              snapshot.nodes.find((node) => node.state === 'active' || node.state === 'waiting')
                ?.label ?? 'Done'
            }
          />
          <TaskMachine nodes={snapshot.nodes} />
          {snapshot.approvalVisible ? (
            <ApprovalCard
              request={APPROVAL}
              decision={snapshot.approvalDecision}
              onDecide={onDecide}
            />
          ) : (
            <div className="border border-dashed border-line px-3 py-6 text-center font-mono text-[11px] text-dust">
              Approval dock waits for a privileged action.
            </div>
          )}
          <CostPanel snapshot={snapshot.cost} live={snapshot.live} />
        </div>
      </div>
    </section>
  )
}
