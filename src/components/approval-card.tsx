import { IconAlert, IconCheck, IconX } from '@/components/icons'
import { cn } from '@/lib/cn'
import type { ApprovalDecision, ApprovalRequest, Risk } from '@/types'

const RISK_TONE: Record<Risk, string> = {
  low: 'border-sage/40 bg-sage/10 text-sage',
  medium: 'border-copper/50 bg-copper/10 text-copper-bright',
  high: 'border-oxide/50 bg-oxide/10 text-oxide',
}

type ApprovalCardProps = {
  request: ApprovalRequest
  decision: ApprovalDecision
  onDecide?: (decision: ApprovalDecision) => void
  className?: string
}

export function ApprovalCard({
  request,
  decision,
  onDecide,
  className,
}: ApprovalCardProps) {
  const locked = decision !== 'pending'

  return (
    <article className={cn('border border-line bg-paper shadow-panel', className)}>
      <header className="flex items-start gap-3 border-b border-line px-3.5 py-3">
        <span className="mt-0.5 text-copper">
          <IconAlert />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-mono text-[10px] uppercase tracking-catalog text-dust">
              Human in the loop
            </p>
            <span
              className={cn(
                'border px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider',
                RISK_TONE[request.risk],
              )}
            >
              {request.risk} risk
            </span>
          </div>
          <h3 className="mt-1 font-display text-[20px] leading-none text-cream">
            {request.title}
          </h3>
        </div>
        <span className="font-mono text-[10px] text-dust">{request.agent}</span>
      </header>

      <div className="space-y-3 px-3.5 py-3">
        <p className="text-[13px] leading-5 text-fog">
          <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-dust">
            Action
          </span>
          {request.action}
        </p>
        <p className="text-[13px] leading-5 text-fog">{request.detail}</p>
        {request.preview ? (
          <pre className="overflow-x-auto border border-line bg-raised px-3 py-2 font-mono text-[11px] leading-5 text-copper-bright">
            <code>{request.preview.code}</code>
          </pre>
        ) : null}
      </div>

      <footer className="flex items-center gap-2 border-t border-line bg-raised/70 px-3.5 py-2.5">
        {locked ? (
          <p
            className={cn(
              'inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider',
              decision === 'approved' ? 'text-sage' : 'text-oxide',
            )}
          >
            {decision === 'approved' ? <IconCheck /> : <IconX />}
            {decision}
          </p>
        ) : (
          <>
            <button
              type="button"
              data-action="approve"
              onClick={() => onDecide?.('approved')}
              className="inline-flex items-center gap-1.5 bg-sage px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-paper hover:bg-sage/90"
            >
              <IconCheck className="h-3.5 w-3.5" />
              Approve
            </button>
            <button
              type="button"
              data-action="reject"
              onClick={() => onDecide?.('rejected')}
              className="inline-flex items-center gap-1.5 border border-line px-3 py-1.5 font-mono text-[11px] uppercase tracking-wider text-fog hover:border-oxide hover:text-oxide"
            >
              <IconX className="h-3.5 w-3.5" />
              Reject
            </button>
          </>
        )}
        <span className="ml-auto font-mono text-[10px] text-dust">
          {request.id}
        </span>
      </footer>
    </article>
  )
}
