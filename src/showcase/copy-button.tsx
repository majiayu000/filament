import { useState } from 'react'
import { IconCheck, IconCopy } from '@/components/icons'
import { cn } from '@/lib/cn'

export function CopyButton({
  value,
  label = 'Copy',
  className,
}: {
  value: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  return (
    <button
      type="button"
      className={cn(
        'inline-flex items-center gap-1.5 border border-line px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-fog hover:border-copper hover:text-copper-bright',
        className,
      )}
      onClick={async () => {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1400)
      }}
    >
      {copied ? <IconCheck className="h-3 w-3" /> : <IconCopy className="h-3 w-3" />}
      {copied ? 'Copied' : label}
    </button>
  )
}
