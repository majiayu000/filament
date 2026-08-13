import {
  CITE_MARKS,
  COST_FINAL,
  RUN_DURATION,
  STREAM_TEXT,
  TASK_NODES,
  THOUGHT_SCRIPT,
  TOOL_SCRIPT,
} from '@/data/script'
import type {
  ApprovalDecision,
  CostSnapshot,
  MachineNode,
  MachineNodeState,
  ThoughtStep,
  ToolCall,
  ToolStatus,
} from '@/types'

export type RunSnapshot = {
  elapsedMs: number
  thoughts: ThoughtStep[]
  thinkingOpen: boolean
  tools: ToolCall[]
  streamText: string
  streamDone: boolean
  citationsVisible: string[]
  approvalVisible: boolean
  approvalDecision: ApprovalDecision
  nodes: MachineNode[]
  progress: number
  cost: CostSnapshot
  live: boolean
}

function lerp(from: number, to: number, t: number) {
  return from + (to - from) * Math.min(1, Math.max(0, t))
}

function thoughtWindow(elapsedMs: number): ThoughtStep[] {
  const starts = [400, 1600, 3100]
  return THOUGHT_SCRIPT.map((step, index) => {
    const start = starts[index] ?? 0
    const end = start + (step.ms ?? 900)
    let status: ThoughtStep['status'] = 'queued'
    if (elapsedMs >= end) status = 'done'
    else if (elapsedMs >= start) status = 'active'
    return { ...step, status }
  })
}

function toolWindow(elapsedMs: number): ToolCall[] {
  const starts = [4300, 5300, 6100]
  return TOOL_SCRIPT.map((tool, index) => {
    const start = starts[index] ?? 0
    const end = start + (tool.ms ?? 400)
    let status: ToolStatus = 'queued'
    if (elapsedMs < 4000) return { ...tool, status: 'queued', result: undefined }
    if (elapsedMs >= end) status = 'success'
    else if (elapsedMs >= start) status = 'running'
    return {
      ...tool,
      status,
      result: status === 'success' ? tool.result : undefined,
      ms: status === 'success' ? tool.ms : undefined,
    }
  })
}

function streamWindow(elapsedMs: number) {
  const start = 6400
  if (elapsedMs < start) {
    return { text: '', done: false, citations: [] as string[] }
  }
  const typed = Math.floor((elapsedMs - start) / 16)
  const text = STREAM_TEXT.slice(0, typed)
  const citations = CITE_MARKS.filter((mark) => text.length >= mark.after).map(
    (mark) => mark.id,
  )
  return {
    text,
    done: text.length >= STREAM_TEXT.length,
    citations,
  }
}

function nodeStates(elapsedMs: number): MachineNode[] {
  const timeline: Array<{ at: number; id: string; state: MachineNodeState }> = [
    { at: 0, id: 'queued', state: 'active' },
    { at: 400, id: 'queued', state: 'done' },
    { at: 400, id: 'planning', state: 'active' },
    { at: 4200, id: 'planning', state: 'done' },
    { at: 4200, id: 'acting', state: 'active' },
    { at: 11800, id: 'acting', state: 'done' },
    { at: 11800, id: 'waiting', state: 'waiting' },
    { at: 19000, id: 'waiting', state: 'done' },
    { at: 19000, id: 'done', state: 'done' },
  ]

  const states = new Map<string, MachineNodeState>(
    TASK_NODES.map((node) => [node.id, 'idle' as MachineNodeState]),
  )

  for (const event of timeline) {
    if (elapsedMs >= event.at) states.set(event.id, event.state)
  }

  return TASK_NODES.map((node) => ({
    ...node,
    state: states.get(node.id) ?? 'idle',
  }))
}

function progressAt(elapsedMs: number) {
  if (elapsedMs < 400) return lerp(0, 0.08, elapsedMs / 400)
  if (elapsedMs < 4200) return lerp(0.08, 0.28, (elapsedMs - 400) / 3800)
  if (elapsedMs < 11800) return lerp(0.28, 0.72, (elapsedMs - 4200) / 7600)
  if (elapsedMs < 19000) return lerp(0.72, 0.86, (elapsedMs - 11800) / 7200)
  return lerp(0.86, 1, (elapsedMs - 19000) / 2000)
}

function costAt(elapsedMs: number): CostSnapshot {
  const t = Math.min(1, elapsedMs / RUN_DURATION)
  const seriesCount = Math.max(2, Math.round(lerp(2, COST_FINAL.series.length, t)))
  return {
    model: COST_FINAL.model,
    inputTokens: lerp(180, COST_FINAL.inputTokens, Math.min(1, t * 1.1)),
    outputTokens: lerp(0, COST_FINAL.outputTokens, Math.max(0, (t - 0.28) / 0.72)),
    cachedTokens: lerp(0, COST_FINAL.cachedTokens, Math.min(1, t * 0.9)),
    usd: lerp(0.0012, COST_FINAL.usd, t),
    series: COST_FINAL.series.slice(0, seriesCount),
  }
}

export function snapshotAt(ms: number): RunSnapshot {
  const elapsedMs = Math.max(0, Math.min(ms, RUN_DURATION))
  const stream = streamWindow(elapsedMs)
  const approvalVisible = elapsedMs >= 11800
  let approvalDecision: ApprovalDecision = 'pending'
  if (elapsedMs >= 19000) approvalDecision = 'approved'

  return {
    elapsedMs,
    thoughts: thoughtWindow(elapsedMs),
    thinkingOpen: elapsedMs < 12000,
    tools: toolWindow(elapsedMs),
    streamText: stream.text,
    streamDone: stream.done,
    citationsVisible: stream.citations,
    approvalVisible,
    approvalDecision,
    nodes: nodeStates(elapsedMs),
    progress: progressAt(elapsedMs),
    cost: costAt(elapsedMs),
    live: elapsedMs < RUN_DURATION,
  }
}
