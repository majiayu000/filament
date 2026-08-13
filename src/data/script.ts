import type {
  ApprovalRequest,
  Citation,
  CostSnapshot,
  MachineNode,
  ThoughtStep,
  ToolCall,
} from '@/types'

export const RUN_ID = '1842'
export const AGENT_NAME = 'Atlas'
export const RUN_DURATION = 21000

export const THOUGHT_SCRIPT: Array<Omit<ThoughtStep, 'status'>> = [
  {
    id: 't1',
    text: 'Payment conversion fell 18.4% after 14:02 UTC. Landing and catalog are flat — the leak is isolated to checkout.pay.',
    ms: 820,
  },
  {
    id: 't2',
    text: 'Deploy 1842 shipped a new Stripe Elements mount. Timing matches the timeout spike, not a traffic mix shift.',
    ms: 1100,
  },
  {
    id: 't3',
    text: 'Need the error mix from /api/checkout and the PaymentForm diff before proposing a revert.',
    ms: 940,
  },
]

export const TOOL_SCRIPT: Array<Omit<ToolCall, 'status'>> = [
  {
    id: 'tool-1',
    name: 'query_analytics',
    args: { event: 'checkout.fail', since: '14:00 UTC' },
    result: 'timeout 11.8% · card_decline 3.1% · prior timeout 2.1%',
    ms: 640,
  },
  {
    id: 'tool-2',
    name: 'read_file',
    args: { path: 'src/checkout/PaymentForm.tsx' },
    result: 'Elements remounts when coupon draft changes.',
    ms: 180,
  },
  {
    id: 'tool-3',
    name: 'git_diff',
    args: { sha: '1842', path: 'src/checkout' },
    result: '+useEffect(() => mountElements(), [coupon])',
    ms: 210,
  },
]

export const STREAM_TEXT =
  'The drop is isolated to checkout.pay after deploy 1842. Stripe Elements remounts on every coupon keystroke, which aborts in-flight PaymentIntents. Timeout share moved 2.1% → 11.8%. Revert the remount and keep the coupon field uncontrolled — conversion should recover within an hour of ship.'

export const CITATIONS: Citation[] = [
  {
    id: 'c1',
    index: 1,
    title: 'PaymentForm.tsx · mountElements',
    source: 'src/checkout/PaymentForm.tsx:88',
    snippet:
      'useEffect(() => { mountElements(stripe) }, [coupon]) — remounts the iframe on each keystroke.',
  },
  {
    id: 'c2',
    index: 2,
    title: 'checkout.fail · 14:00–15:00 UTC',
    source: 'analytics.events',
    snippet:
      'timeout 2.1% → 11.8%. card_decline unchanged. Volume +4%.',
  },
]

export const CITE_MARKS = [
  { after: 72, id: 'c1' },
  { after: 188, id: 'c2' },
] as const

export const APPROVAL: ApprovalRequest = {
  id: 'appr-1842',
  title: 'Revert Elements remount',
  agent: AGENT_NAME,
  risk: 'medium',
  action: 'git revert 1842 on checkout · open follow-up PR',
  detail:
    'Memoize the Stripe mount and leave the coupon field uncontrolled. No schema or payment-provider change.',
  preview: {
    lang: 'tsx',
    code: 'useEffect(() => {\n  mountElements(stripe)\n}, [stripe]) // was [coupon]',
  },
}

export const TASK_NODES: MachineNode[] = [
  { id: 'queued', label: 'Queued', state: 'idle' },
  { id: 'planning', label: 'Planning', state: 'idle' },
  { id: 'acting', label: 'Acting', state: 'idle' },
  { id: 'waiting', label: 'Waiting', state: 'idle' },
  { id: 'done', label: 'Done', state: 'idle' },
]

export const COST_FINAL: CostSnapshot = {
  model: 'grok-4.6',
  inputTokens: 4120,
  outputTokens: 868,
  cachedTokens: 1904,
  usd: 0.0836,
  series: [4, 7, 6, 11, 9, 14, 18, 16, 22, 28, 31, 36],
}

export const USAGE = {
  thinking: `<ThinkingTrace
  title="Reasoning"
  steps={steps}
  elapsedMs={3400}
  defaultOpen
/>`,
  tools: `<ToolCallRow tools={tools} />
<ToolCallCard tool={tools[0]} />`,
  stream: `<StreamingText
  text={answer}
  citations={citations}
  streaming
/>`,
  approval: `<ApprovalCard
  request={approval}
  decision={decision}
  onDecide={setDecision}
/>`,
  task: `<TaskMachine nodes={nodes} />
<TaskProgress value={0.72} label="Waiting on human" />`,
  cost: `<CostPanel
  snapshot={cost}
  live
/>`,
} as const
