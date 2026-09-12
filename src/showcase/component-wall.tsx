import { useState, type ReactNode } from 'react'
import { ApprovalCard } from '@/components/approval-card'
import { CostPanel } from '@/components/cost-panel'
import { StreamingText } from '@/components/streaming-text'
import { TaskMachine, TaskProgress } from '@/components/task-progress'
import { ThinkingTrace } from '@/components/thinking-trace'
import { ToolCallRow } from '@/components/tool-call'
import { APPROVAL, CITE_MARKS, CITATIONS, USAGE } from '@/data/script'
import { snapshotAt } from '@/lib/run-player'
import { CopyButton } from '@/showcase/copy-button'
import type { ApprovalDecision } from '@/types'

const WALL = snapshotAt(14200)

function Frame({
  index,
  title,
  children,
  snippet,
  className,
}: {
  index: string
  title: string
  children: ReactNode
  snippet: string
  className?: string
}) {
  return (
    <article
      className={`group relative flex flex-col border border-line bg-paper transition duration-300 hover:-translate-y-0.5 hover:shadow-panel ${className ?? ''}`}
    >
      <span className="ghost-num pointer-events-none absolute -left-1 -top-5 text-[42px] md:-left-3 md:text-[56px]">
        {index}
      </span>
      <header className="relative z-[1] flex items-center justify-between border-b border-line px-3 py-2">
        <p className="font-mono text-[10px] uppercase tracking-catalog text-dust">
          {title}
        </p>
        <CopyButton value={snippet} />
      </header>
      <div className="relative z-[1] flex-1 p-3">{children}</div>
    </article>
  )
}

export function ComponentWall() {
  const snapshot = WALL
  const [decision, setDecision] = useState<ApprovalDecision>('pending')
  const [thinkingOpen, setThinkingOpen] = useState(true)
  return (
    <section id="kit" className="relative mx-auto max-w-6xl scroll-mt-28 px-5 pb-24">
      <div className="mb-10 flex items-end justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-catalog text-copper-bright">
            Component wall
          </p>
          <h2 className="mt-1 font-display text-[48px] italic leading-[0.86] text-cream sm:text-[72px]">
            The six
            <span className="text-copper"> surfaces.</span>
          </h2>
        </div>
        <p className="hidden max-w-[14rem] text-right font-mono text-[11px] uppercase leading-5 tracking-wider text-dust md:block">
          The shareable plate.
          <br />
          Six instruments, one register.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-12">
        <Frame index="01" title="Thinking" snippet={USAGE.thinking} className="md:col-span-7">
          <ThinkingTrace
            steps={snapshot.thoughts}
            elapsedMs={2860}
            open={thinkingOpen}
            onOpenChange={setThinkingOpen}
          />
        </Frame>
        <Frame index="06" title="Cost" snippet={USAGE.cost} className="md:col-span-5">
          <CostPanel snapshot={snapshot.cost} live={snapshot.live} />
        </Frame>
        <Frame index="02" title="Tools" snippet={USAGE.tools} className="md:col-span-4">
          <ToolCallRow tools={snapshot.tools} />
          <p className="mt-4 font-mono text-[11px] leading-5 text-dust">
            Chips for the rail. Cards when a call needs a body.
          </p>
        </Frame>
        <Frame index="03" title="Stream" snippet={USAGE.stream} className="md:col-span-8">
          <StreamingText
            text={
              snapshot.streamText ||
              'Waiting for the first token — sources attach as numerals, not footnotes.'
            }
            citations={CITATIONS}
            marks={[...CITE_MARKS]}
            visibleCitationIds={snapshot.citationsVisible}
            streaming={Boolean(snapshot.streamText) && !snapshot.streamDone}
            className="[&_p]:font-display [&_p]:text-[18px] [&_p]:leading-8 [&_p]:text-cream"
          />
        </Frame>
        <Frame index="04" title="Approval" snippet={USAGE.approval} className="md:col-span-6">
          <ApprovalCard request={APPROVAL} decision={decision} onDecide={setDecision} />
        </Frame>
        <Frame index="05" title="Task" snippet={USAGE.task} className="md:col-span-6">
          <TaskProgress
            value={snapshot.progress}
            label={
              snapshot.nodes.find((node) => node.state === 'active' || node.state === 'waiting')
                ?.label ?? 'Done'
            }
          />
          <div className="mt-5">
            <TaskMachine nodes={snapshot.nodes} />
          </div>
        </Frame>
      </div>
    </section>
  )
}
