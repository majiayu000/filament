import { useState, type ReactNode } from 'react'
import { ApprovalCard } from '@/components/approval-card'
import { CostPanel } from '@/components/cost-panel'
import { StreamingText } from '@/components/streaming-text'
import { TaskMachine, TaskProgress } from '@/components/task-progress'
import { ThinkingTrace } from '@/components/thinking-trace'
import { ToolCallCard, ToolCallRow } from '@/components/tool-call'
import {
  APPROVAL,
  CITE_MARKS,
  CITATIONS,
  COST_FINAL,
  STREAM_TEXT,
  TASK_NODES,
  THOUGHT_SCRIPT,
  TOOL_SCRIPT,
  USAGE,
} from '@/data/script'
import { CopyButton } from '@/showcase/copy-button'
import type { ApprovalDecision, ThoughtStep, ToolCall } from '@/types'

function Section({
  id,
  index,
  title,
  lede,
  snippet,
  children,
}: {
  id: string
  index: string
  title: string
  lede: string
  snippet: string
  children: ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-28 border-t border-line py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-5 lg:grid-cols-[300px_1fr]">
        <div className="relative">
          <span className="ghost-num pointer-events-none absolute -left-3 -top-8 text-[96px]">
            {index}
          </span>
          <p className="relative font-mono text-[11px] uppercase tracking-catalog text-copper-bright">
            Plate {index}
          </p>
          <h3 className="relative mt-2 font-display text-[40px] italic leading-[0.9] text-cream">
            {title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-dust">{lede}</p>
          <div className="mt-4">
            <CopyButton value={snippet} label="Copy usage" />
          </div>
        </div>
        <div>{children}</div>
      </div>
    </section>
  )
}

const STATIC_THOUGHTS: ThoughtStep[] = THOUGHT_SCRIPT.map((step, index) => ({
  ...step,
  status: index === 2 ? 'active' : 'done',
}))

const STATIC_TOOLS: ToolCall[] = TOOL_SCRIPT.map((tool, index) => ({
  ...tool,
  status: index === 2 ? 'running' : 'success',
  result: index === 2 ? undefined : tool.result,
  ms: index === 2 ? undefined : tool.ms,
}))

const STATIC_NODES = TASK_NODES.map((node, index) => ({
  ...node,
  state:
    index < 3 ? ('done' as const) : index === 3 ? ('waiting' as const) : ('idle' as const),
}))

export function Catalog() {
  const [decision, setDecision] = useState<ApprovalDecision>('pending')

  return (
    <div>
      <Section
        id="thinking"
        index="01"
        title="Thinking trace"
        lede="A collapsible instrument for chain-of-thought. Active step breathes. Done steps keep their duration. Collapse to a single line when the answer starts."
        snippet={USAGE.thinking}
      >
        <ThinkingTrace steps={STATIC_THOUGHTS} elapsedMs={2860} defaultOpen />
      </Section>

      <Section
        id="tools"
        index="02"
        title="Tool call chips"
        lede="Tiny status chips for the rail. A card when you need arguments and a result. Running is copper. Success is sage. Denied is oxide."
        snippet={USAGE.tools}
      >
        <ToolCallRow tools={STATIC_TOOLS} />
        <div className="mt-3 grid gap-3 md:grid-cols-2">
          <ToolCallCard tool={STATIC_TOOLS[0]} />
          <ToolCallCard tool={STATIC_TOOLS[2]} />
        </div>
      </Section>

      <Section
        id="stream"
        index="03"
        title="Streaming + sources"
        lede="Tokens arrive with a copper caret. Citations are journal numerals — click to pin the source. No footnote graveyard."
        snippet={USAGE.stream}
      >
        <div className="border border-line bg-paper px-4 py-4">
          <StreamingText
            text={STREAM_TEXT}
            citations={CITATIONS}
            marks={[...CITE_MARKS]}
          />
        </div>
      </Section>

      <Section
        id="approval"
        index="04"
        title="Human in the loop"
        lede="A work order, not a modal. Risk stamp, action line, patch preview, two verbs. The agent stops until someone signs."
        snippet={USAGE.approval}
      >
        <ApprovalCard request={APPROVAL} decision={decision} onDecide={setDecision} />
      </Section>

      <Section
        id="task"
        index="05"
        title="Task machine"
        lede="A five-state instrument: queued, planning, acting, waiting, done. The bar is percentage. The nodes are the contract."
        snippet={USAGE.task}
      >
        <div className="border border-line bg-paper px-4 py-5">
          <TaskProgress value={0.72} label="Waiting" />
          <div className="mt-6">
            <TaskMachine nodes={STATIC_NODES} />
          </div>
        </div>
      </Section>

      <Section
        id="cost"
        index="06"
        title="Live cost"
        lede="In, out, cache, dollars. A sparkline so spend has a shape. Put it in the chrome so nobody is surprised at the invoice."
        snippet={USAGE.cost}
      >
        <CostPanel snapshot={COST_FINAL} live={false} />
      </Section>
    </div>
  )
}
