export type ThoughtStatus = 'queued' | 'active' | 'done'

export type ThoughtStep = {
  id: string
  text: string
  status: ThoughtStatus
  ms?: number
}

export type ToolStatus = 'queued' | 'running' | 'success' | 'error' | 'denied'

export type ToolCall = {
  id: string
  name: string
  status: ToolStatus
  args?: Record<string, string>
  result?: string
  ms?: number
}

export type Citation = {
  id: string
  index: number
  title: string
  source: string
  snippet: string
}

export type Risk = 'low' | 'medium' | 'high'

export type ApprovalDecision = 'pending' | 'approved' | 'rejected'

export type ApprovalRequest = {
  id: string
  title: string
  agent: string
  risk: Risk
  action: string
  detail: string
  preview?: {
    lang: string
    code: string
  }
}

export type MachineNodeState = 'idle' | 'active' | 'done' | 'waiting' | 'failed'

export type MachineNode = {
  id: string
  label: string
  state: MachineNodeState
}

export type CostSnapshot = {
  model: string
  inputTokens: number
  outputTokens: number
  cachedTokens: number
  usd: number
  series: number[]
}
